export const GITHUB_USER = import.meta.env.VITE_GITHUB_USER ?? 'abarriuso';
export const REPO_NAME = import.meta.env.VITE_REPO_NAME ?? 'melanoma-detection';

export const DATASET_NAME = 'Melanoma Skin Cancer Dataset (10 000 imágenes)';
export const DATASET_URL =
  'https://www.kaggle.com/datasets/hasnainjaved/melanoma-skin-cancer-dataset-of-10000-images';

// Segundo dataset (CC0), solo para variar las miniaturas de ejemplo del
// panel 1 — el modelo no se entrena con él. Ver scripts/download_examples_dataset.ps1.
export const EXAMPLES_DATASET2_NAME = 'Melanoma Detection Dataset (ISIC 2017)';
export const EXAMPLES_DATASET2_URL =
  'https://www.kaggle.com/datasets/wanderdust/skin-lesion-analysis-toward-melanoma-detection';

export const UMBRAL = 0.5;

// Métricas sobre el conjunto de test limpio (774 imágenes, tras excluir 226
// duplicadas o cuasi-duplicadas detectadas en train). Las cifras corresponden
// a la evaluación documentada en README.md; no implican que un modelo sea
// categóricamente mejor que los demás.
export const MODELS = [
  {
    id: 'efficientnetv2s',
    name: 'EfficientNetV2S',
    label: 'EfficientNetV2S',
    path: 'model/efficientnetv2s/model.json',
    temperature: 1.1836,
    version: '2.0.0',
    sizeMB: 21,
    auc: 0.971,
    accuracy: 0.871,
    sens: 0.9,
    spec: 0.844,
  },
  {
    id: 'resnet50v2',
    name: 'ResNet50V2',
    label: 'ResNet50V2',
    path: 'model/resnet50v2/model.json',
    temperature: 1.0221,
    version: '2.0.0',
    sizeMB: 25,
    auc: 0.969,
    accuracy: 0.891,
    sens: 0.846,
    spec: 0.933,
  },
  {
    id: 'vgg16',
    name: 'VGG16',
    label: 'VGG16',
    path: 'model/vgg16/model.json',
    temperature: 1.3359,
    version: '2.0.0',
    sizeMB: 15,
    auc: 0.957,
    accuracy: 0.885,
    sens: 0.825,
    spec: 0.94,
  },
];

export function getModel(id) {
  return MODELS.find((m) => m.id === id) || MODELS[0];
}
