import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Dropzone({
  imageURL,
  imageError,
  dragActive,
  predicting,
  onFile,
  onDrop,
  onDragOver,
  onDragLeave,
  onClear,
  onImageLoad,
  onImageError,
  imgRef,
  inputRef,
  disabled,
}) {
  const { t } = useI18n();
  const onDropzoneKey = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      // stopPropagation: Enter no debe burbujear al atajo global de App,
      // que dispararía el análisis además de abrir el selector de archivos.
      e.stopPropagation();
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const onPickFile = (e) => {
    onFile(e.target.files?.[0]);
    e.target.value = '';
  };

  return (
    <div className="dropzone-wrapper">
      <div
        className={`dropzone ${dragActive ? 'drag-active' : ''} ${imageURL ? 'has-image' : ''} ${predicting ? 'is-scanning' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={t('dropAria')}
        aria-describedby="dropzone-hint"
        aria-roledescription={t('dropRole')}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={onDropzoneKey}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={onPickFile}
        />
        <AnimatePresence mode="wait">
          {imageURL && !imageError ? (
            <motion.div
              key="preview"
              className="preview-stage"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Retícula de registro: anillo fino + marcas cardinales,
                  como una preparación de microscopio. */}
              <svg className="preview-reticle" viewBox="-6 -6 112 112" aria-hidden="true">
                <circle cx="50" cy="50" r="52.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path
                  d="M50 -5v6M50 99v6M-5 50h6M99 50h6"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
              </svg>
              <div className="preview-wrap">
                <img
                  ref={imgRef}
                  src={imageURL}
                  alt={t('previewAlt')}
                  className="preview"
                  onLoad={onImageLoad}
                  onError={onImageError}
                />
                {predicting && (
                  <>
                    <div className="scan-veil" aria-hidden="true" />
                    <span className="scan-ring" aria-hidden="true" />
                  </>
                )}
              </div>
              <motion.button
                type="button"
                className="preview-clear"
                onClick={(e) => { e.stopPropagation(); onClear(); }}
                aria-label={t('clearImage')}
                title={t('clearImage')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              className="dropzone-hint"
              id="dropzone-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="dropzone-field">
                <svg className="dropzone-icon" width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 4v16m0 0l-6-6m6 6l6-6M4 24h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {imageError ? (
                  <>
                    <p className="dropzone-title">{t('imgErrTitle')}</p>
                    <p className="dropzone-sub">{t('imgErrSub')}</p>
                  </>
                ) : (
                  <>
                    <p className="dropzone-title">{t('dropTitle')}</p>
                    <p className="dropzone-sub">{t('dropSub')}</p>
                    <p className="dropzone-formats">{t('dropFormats')}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
