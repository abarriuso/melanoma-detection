import { useState, useCallback, useRef, useEffect } from 'react';
import { UMBRAL } from '../lib/constants';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function useImageAnalysis(predictFn) {
  const [imageURL, setImageURL] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const runTokenRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const clearImage = useCallback(() => {
    runTokenRef.current++;
    if (imageURL?.startsWith('blob:')) URL.revokeObjectURL(imageURL);
    setImageURL(null);
    setImageError(false);
    setFileError(null);
    setResult(null);
    setPredicting(false);
    setPredictionError(null);
  }, [imageURL]);

  const setImage = useCallback((url, { auto = false } = {}) => {
    setResult(null);
    setImageError(false);
    setFileError(null);
    setPredictionError(null);
    setImageURL((prev) => {
      if (prev && prev.startsWith('blob:') && prev !== url) {
        URL.revokeObjectURL(prev);
      }
      return url;
    });
    setAutoRun(auto);
  }, []);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError({ key: 'errFormat' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      setFileError({ key: 'errTooBigMB', args: [mb] });
      return;
    }
    const img = new Image();
    const objectURL = URL.createObjectURL(file);
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      if (w < 16 || h < 16) {
        URL.revokeObjectURL(objectURL);
        setFileError({ key: 'errTooSmallPx', args: [w, h] });
        return;
      }
      if (w > 4096 || h > 4096) {
        URL.revokeObjectURL(objectURL);
        setFileError({ key: 'errTooBigPx', args: [w, h] });
        return;
      }
      setFileError(null);
      setImage(objectURL, { auto: true });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      setFileError({ key: 'errDecode' });
    };
    img.src = objectURL;
  }, [setImage]);

  const analyze = useCallback(async (imgElement, modelId, modelStatus) => {
    if (!imgElement || modelStatus !== 'ready') return;
    // Validar dimensiones ANTES de cualquier decodificación a tensor
    // (fromPixelsAsync materializa el bitmap completo en memoria): una
    // imagen con dimensiones extremas no debe llegar a TF.js, y una imagen
    // que el navegador no pudo decodificar (naturalWidth = 0) tampoco.
    const w = imgElement.naturalWidth;
    const h = imgElement.naturalHeight;
    if (!w || !h) {
      setPredictionError({ key: 'errDecodeRetry' });
      return;
    }
    if (w > 4096 || h > 4096) {
      setPredictionError({ key: 'errTooBigPx', args: [w, h] });
      return;
    }
    const myToken = ++runTokenRef.current;
    setPredicting(true);
    setPredictionError(null);
    try {
      const t0 = performance.now();
      const { raw, calibrated } = await predictFn(imgElement, modelId);
      const ms = Math.round(performance.now() - t0);
      if (myToken !== runTokenRef.current || !mountedRef.current) return;
      const esMaligno = calibrated >= UMBRAL;
      const logit = Math.log(raw / (1 - raw));
      setResult({
        score: calibrated,
        logit,
        ms,
        confidence: esMaligno ? calibrated : 1 - calibrated,
        esMaligno,
      });
    } catch (err) {
      console.error('Error en la predicción:', err);
      if (mountedRef.current) {
        setPredictionError({ key: err?.message === 'timeout' ? 'errTimeout' : 'errAnalyze' });
      }
    } finally {
      if (mountedRef.current && myToken === runTokenRef.current) setPredicting(false);
    }
  }, [predictFn]);

  return {
    imageURL,
    imageError,
    fileError,
    predicting,
    predictionError,
    result,
    dragActive,
    setDragActive,
    autoRun,
    setAutoRun,
    setImage,
    setImageError,
    clearImage,
    handleFile,
    analyze,
    runTokenRef,
    mountedRef,
  };
}
