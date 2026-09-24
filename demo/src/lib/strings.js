// Textos de la interfaz en inglés (idioma principal) y español. Las entradas
// que dependen de datos son funciones; el resto, cadenas.
export const STRINGS = {
  en: {
    docTitle: 'Melanoma detection — EfficientNetV2S + TensorFlow.js',
    skipLink: 'Skip to main content',
    codeLinks: 'Links to the code',
    navCode: 'Code',
    switchTo: 'ES',
    switchToLabel: 'Ver en español',

    heroEyebrow: 'Dermoscopic lesion classification · 100 % local inference',
    heroTitleBefore: '',
    heroTitleEm: 'Melanoma',
    heroTitleAfter: ' detection',
    heroSub1: (model) =>
      `Upload a dermoscopic photo and it is classified on the spot as benign or malignant. Inside is a ${model} —a neural network pre-trained on over a million photos— that we`,
    heroSubEm: 'fine-tuned',
    heroSub2: 'on thousands of skin lesion images, reaching an AUC of',
    heroSub3: 'on the test set. It runs entirely in your browser: the image never leaves your device.',
    heroWarn: 'Not a medical device. False-negative rate: ~12 %. If a lesion worries you, see a dermatologist.',

    panelCapture: 'Image',
    panelInstrument: 'Instrument',
    disclaimerTop:
      'Academic research project. It is not a medical device and does not replace assessment by a healthcare professional. The model has a false-negative rate of ~12%; always see a dermatologist. Designed only for dermoscopic images.',
    analyzing: 'Analysing…',
    retryAnalysis: 'Retry analysis',
    analyzeAgain: 'Analyse again',
    techNoteLabel: 'Technical note:',
    techNote: (threshold) =>
      `The models use temperature scaling to calibrate their output probabilities. The decision threshold is ${threshold}. EfficientNetV2S offers the best balance between accuracy and size.`,

    statusPreparing: 'Preparing the model… The first time can take a while.',
    statusLoading: (pct) => `Loading model weights · ${pct}%`,
    statusReady: 'Model loaded · backend',
    statusError: 'Could not load the model',
    retry: 'Retry',

    gpuTitle: 'Graphics acceleration is turned off or unavailable in this browser.',
    gpuText:
      'The page will work, but each analysis may take minutes instead of seconds. In Chrome/Edge: Settings → System → “Use graphics acceleration when available”, then reload.',

    dropAria: 'Choose a lesion image to analyse',
    dropRole: 'image upload area',
    previewAlt: 'Dermoscopic lesion to analyse',
    clearImage: 'Remove image',
    imgErrTitle: 'Could not open the image',
    imgErrSub: 'Try another file',
    dropTitle: 'Drag a dermoscopic image here',
    dropSub: 'or click to choose a file',
    dropFormats: 'JPEG · PNG · WebP · Max. 10 MB',

    examplesLabel: 'Examples from the test set',
    rotateTitle: 'Swap for 6 other random samples',
    rotateBtn: 'Other examples',
    examplesAnnounce: (n, mal, ben) => `${n} examples loaded: ${mal} malignant, ${ben} benign`,
    examplesGroup: 'Example images from the dataset',
    tryWith: (isMal) => `Try with a ${isMal ? 'malignant' : 'benign'} lesion`,
    exampleLabel: (isMal) => `Label: ${isMal ? 'malignant' : 'benign'}`,
    badge: (isMal) => (isMal ? 'M' : 'B'),

    modelLegend: 'Classification model',
    noWeights: 'Model without published weights yet',
    pendingTraining: 'Not trained yet',
    sensSpec: (sens, spec) => `Sens ${sens} · Spec ${spec}`,
    loadingModel: 'loading…',

    resultRegion: 'Analysis result',
    resultEyebrow: 'Instrument reading',
    malignant: 'Malignant',
    benign: 'Benign',
    latencyTitle: 'Inference time in the browser',
    calibratedProb: 'Calibrated probability',
    threshold: 'Threshold',
    reminderMal: 'This is not a diagnosis. See a dermatologist for a full clinical assessment.',
    reminderBen:
      'This is not a diagnosis. The model has ~12% false negatives. If a lesion worries you, see a dermatologist.',
    resultDisclaimer:
      'Confidence reflects the model’s decision, not the actual risk. In clinical practice melanoma prevalence is very low (~1–5%). It does not take into account medical history, sun exposure or family history.',
    gaugeAria: (pct) => `Confidence: ${pct}%`,
    gaugeLabel: 'confidence',

    ebTitle: 'Something went wrong while rendering this section',
    ebUnknown: 'Unknown error',

    sourceCode: 'Source code',
    trainingDataset: 'Training dataset',
    dataset: 'Dataset',
    datasetName: 'Melanoma Skin Cancer Dataset (10,000 images)',
    examplesAlso: 'Examples also from:',

    errFormat: 'Unsupported format. Use JPEG, PNG or WebP.',
    errTooBigMB: (mb) => `Image too large (${mb} MB). Maximum 10 MB.`,
    errTooSmallPx: (w, h) => `Image too small (${w}×${h}). Minimum 16×16 pixels.`,
    errTooBigPx: (w, h) => `Image too large (${w}×${h}). Maximum 4096×4096 pixels.`,
    errDecode: 'Could not decode the image.',
    errDecodeRetry: 'Could not decode the image. Try another file.',
    errTimeout: 'The analysis is taking too long (possibly a problem with the browser’s GPU). Try again.',
    errAnalyze: 'Error analysing the image. Try again.',
  },

  es: {
    docTitle: 'Detección de melanoma — EfficientNetV2S + TensorFlow.js',
    skipLink: 'Saltar al contenido principal',
    codeLinks: 'Enlaces al código',
    navCode: 'Código',
    switchTo: 'EN',
    switchToLabel: 'Read in English',

    heroEyebrow: 'Clasificación de lesiones dermatoscópicas · Inferencia 100 % local',
    heroTitleBefore: 'Detección de ',
    heroTitleEm: 'melanoma',
    heroTitleAfter: '',
    heroSub1: (model) =>
      `Sube una foto dermatoscópica y la clasifica sola, sin pasos intermedios, como benigna o maligna. Por dentro hay una ${model} —una red neuronal ya entrenada de fábrica con más de un millón de fotos— a la que le hemos hecho`,
    heroSubEm: 'fine-tuning',
    heroSub2: 'con miles de imágenes de lesiones de piel, hasta un AUC de',
    heroSub3: 'en test. Corre entera en tu navegador: la imagen nunca sale de tu dispositivo.',
    heroWarn: 'No es un dispositivo médico. Tasa de falsos negativos: ~12 %. Si te preocupa una lesión, consulta a un dermatólogo.',

    panelCapture: 'Captura',
    panelInstrument: 'Instrumento',
    disclaimerTop:
      'Proyecto académico de investigación. No constituye un dispositivo médico ni sustituye la valoración de un profesional sanitario. El modelo tiene una tasa de falsos negativos del ~12%; consulta siempre a un dermatólogo. Diseñado exclusivamente para imágenes dermatoscópicas.',
    analyzing: 'Analizando…',
    retryAnalysis: 'Reintentar análisis',
    analyzeAgain: 'Analizar de nuevo',
    techNoteLabel: 'Nota técnica:',
    techNote: (threshold) =>
      `Los modelos usan calibración de temperatura para ajustar las probabilidades de salida. El umbral de decisión es ${threshold}. EfficientNetV2S ofrece el mejor equilibrio entre precisión y tamaño.`,

    statusPreparing: 'Preparando el modelo… La primera vez puede tardar un poco.',
    statusLoading: (pct) => `Cargando pesos del modelo · ${pct}%`,
    statusReady: 'Modelo cargado · backend',
    statusError: 'No se pudo cargar el modelo',
    retry: 'Reintentar',

    gpuTitle: 'La aceleración gráfica del navegador está desactivada o no disponible.',
    gpuText:
      'La página funcionará, pero cada análisis puede tardar minutos en vez de segundos. En Chrome/Edge: Configuración → Sistema → «Usar aceleración por hardware cuando esté disponible», y recarga.',

    dropAria: 'Seleccionar imagen de lesión a analizar',
    dropRole: 'zona de carga de imagen',
    previewAlt: 'Lesión dermatoscópica a analizar',
    clearImage: 'Quitar imagen',
    imgErrTitle: 'No se pudo abrir la imagen',
    imgErrSub: 'Prueba con otro archivo',
    dropTitle: 'Arrastra una imagen dermatoscópica',
    dropSub: 'o haz clic para seleccionar un archivo',
    dropFormats: 'JPEG · PNG · WebP · Máx. 10 MB',

    examplesLabel: 'Ejemplos del conjunto de test',
    rotateTitle: 'Cambiar por otras 6 muestras al azar',
    rotateBtn: 'Otros ejemplos',
    examplesAnnounce: (n, mal, ben) => `${n} ejemplos cargados: ${mal} malignos, ${ben} benignos`,
    examplesGroup: 'Imágenes de ejemplo del dataset',
    tryWith: (isMal) => `Probar con lesión ${isMal ? 'maligna' : 'benigna'}`,
    exampleLabel: (isMal) => `Etiqueta: ${isMal ? 'maligno' : 'benigno'}`,
    badge: (isMal) => (isMal ? 'M' : 'B'),

    modelLegend: 'Modelo de clasificación',
    noWeights: 'Modelo aún sin pesos publicados',
    pendingTraining: 'Pendiente de entrenamiento',
    sensSpec: (sens, spec) => `Sens ${sens} · Esp ${spec}`,
    loadingModel: 'cargando…',

    resultRegion: 'Resultado del análisis',
    resultEyebrow: 'Lectura del instrumento',
    malignant: 'Maligno',
    benign: 'Benigno',
    latencyTitle: 'Tiempo de inferencia en el navegador',
    calibratedProb: 'Probabilidad calibrada',
    threshold: 'Umbral',
    reminderMal: 'Esto no es un diagnóstico. Consulta a un dermatólogo para una evaluación clínica completa.',
    reminderBen:
      'Esto no es un diagnóstico. El modelo tiene ~12% de falsos negativos. Si tienes una lesión que te preocupa, consulta a un dermatólogo.',
    resultDisclaimer:
      'La confianza refleja la decisión del modelo, no el riesgo real. En clínica, la prevalencia de melanoma es muy baja (~1-5%). No considera historia clínica, exposición solar ni antecedentes familiares.',
    gaugeAria: (pct) => `Confianza: ${pct}%`,
    gaugeLabel: 'confianza',

    ebTitle: 'Algo falló al renderizar esta sección',
    ebUnknown: 'Error desconocido',

    sourceCode: 'Código fuente',
    trainingDataset: 'Dataset de entrenamiento',
    dataset: 'Dataset',
    datasetName: 'Melanoma Skin Cancer Dataset (10 000 imágenes)',
    examplesAlso: 'Ejemplos también de:',

    errFormat: 'Formato no soportado. Usa JPEG, PNG o WebP.',
    errTooBigMB: (mb) => `Imagen demasiado grande (${mb} MB). Máximo 10 MB.`,
    errTooSmallPx: (w, h) => `Imagen demasiado pequeña (${w}×${h}). Mínimo 16×16 píxeles.`,
    errTooBigPx: (w, h) => `Imagen demasiado grande (${w}×${h}). Máximo 4096×4096 píxeles.`,
    errDecode: 'No se pudo decodificar la imagen.',
    errDecodeRetry: 'No se pudo decodificar la imagen. Prueba con otro archivo.',
    errTimeout: 'El análisis está tardando demasiado (posible problema con la GPU del navegador). Inténtalo de nuevo.',
    errAnalyze: 'Error al analizar la imagen. Inténtalo de nuevo.',
  },
};
