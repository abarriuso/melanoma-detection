# models/

Trained models (.keras) and their TF.js conversions (uint8 quantised).

| Model | Folder | Status (Kaggle / clean test set) |
|-------|--------|----------------------------------|
| EfficientNetV2S | `efficientnetv2s/` | AUC 0.971 · acc 87.1 % · sens 90.0 % · spec 84.4 % · T 1.184 — **served by default** (original: 0.9742 / 91.6 % / 88.2 % / 95.0 %) |
| ResNet50V2 | `resnet50v2/` | AUC 0.969 · acc 89.1 % · sens 84.6 % · spec 93.3 % · T 1.022 (original: 0.9727 / 90.9 % / 87.8 % / 94.0 %) |
| VGG16 | `vgg16/` | AUC 0.957 · acc 88.5 % · sens 82.5 % · spec 94.0 % · T 1.336 · ~15 MB (original: 0.9712 / 90.3 % / 86.2 % / 94.4 %) |

*Clean* metrics were evaluated with the served TF.js model (weights stored as
uint8, run in float32) on the subset of the test set with no near-duplicates in
train (774/1,000 images), except the AUC of EfficientNetV2S and ResNet50V2,
which comes from the original `.keras` model.
The *original* metrics come from the joint Kaggle training
(`notebooks/entrenamiento_conjunto_kaggle.ipynb`, full 1,000-image test set).
The deduplication audit is in `scripts/dedup_test.py`.

Each model is trained from its notebook in `notebooks/` and saves both the
original `.keras` and the TF.js version (in `tfjs/` inside each folder). If the
training environment did not have `tensorflowjs` (Kaggle), convert the `.keras`
files with `scripts/convert_kaggle_output.py` before deploying the demo.
