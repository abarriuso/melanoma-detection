# Web demo — Development

Quick reference for local development. The full project documentation
(architecture, security, model conversion, deployment) is in the
[main README](../README.md).

## Local development

```bash
cd demo
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # production → demo/dist/
pnpm lint     # ESLint
pnpm test     # Vitest
```

The converted model must be in `public/model/` — see the conversion steps in the
[main README](../README.md#converting-the-weights-to-tfjs).

The interface text lives in `src/lib/strings.js` (English and Spanish, with the
same keys; a test checks they match). The language follows `?lang=`, then the
visitor's saved choice, then the browser language, and can be switched from the
header.

## Header limitations on GitHub Pages

GitHub Pages **cannot send custom HTTP headers**; it only serves static files.
The security headers we cannot deploy and their residual risk:

| Header not available | Residual risk | Mitigation in place |
|---|---|---|
| `Content-Security-Policy` (header) | A CSP in `<meta http-equiv>` does not support `frame-ancestors` | Full CSP in a `<meta>` (injected by `vite.config.js` as the first element of `<head>`) |
| `frame-ancestors` / `X-Frame-Options` | Clickjacking: the page could be embedded in an iframe | `public/frame-guard.js` hides the document and breaks out of the iframe; without JS the app does not work at all |
| `X-Content-Type-Options: nosniff` | MIME sniffing in old browsers | Low risk: Pages serves every file with the right type |
| `Referrer-Policy` | The URL (no sensitive data) may travel in `Referer` to third parties | No outgoing links carry data; external links use `rel="noreferrer"` |
| `Permissions-Policy` | Browser APIs (camera, geolocation…) are not restricted by header | The app does not use them; the CSP limits what can be loaded |

If the project grows and these headers are really needed, the hosting would have
to move to a service that allows them (Cloudflare Pages, Netlify).

## Example images (`public/samples/`)

The 120 thumbnails in `public/samples/{benign,malignant}/` are real dermoscopic
images from two Kaggle datasets published under a **CC0** licence (public
domain), as their dataset pages state:

- [Melanoma Skin Cancer Dataset of 10000 Images](https://www.kaggle.com/datasets/hasnainjaved/melanoma-skin-cancer-dataset-of-10000-images) (Hasnain Javed)
- [Skin Lesion Analysis Toward Melanoma Detection (ISIC 2017)](https://www.kaggle.com/datasets/wanderdust/skin-lesion-analysis-toward-melanoma-detection) (wanderdust)

They are only used as test examples in the demo; the model is not trained on the
second dataset (see `scripts/download_examples_dataset.ps1` and
`scripts/refresh-samples.mjs`). Dermoscopic images show no identifiable facial
features.

**Removal policy:** if a rights holder, a patient or a dataset author asks for an
image to be removed —or if the declared CC0 licence turns out to be wrong— it
will be deleted straight away. To ask, open an *issue* in the
[repository](https://github.com/abarriuso/melanoma-detection/issues) with the
file name; no reason is needed.
