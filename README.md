# AgroMap3D · WACV 2027

**AgroMap3D: Reliability-Aware Dense Mapping from Agricultural UAV Video**

Javed Ahmad¹, Shafiq Ahmad¹, Dario Amiri¹, Fiora Pirri¹˒²<br>
¹ DeepPlants, Rome, Italy<br>
² DIAG, Sapienza University of Rome, Italy

This repository contains the standalone research project website. The implementation and dataset will be linked when released.

Project website: **https://deepplants.github.io/agromap3d/**

## Publish with GitHub Pages

The website is at the repository root. In this repository's **Settings → Pages → Build and deployment**, select:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Click **Save**. GitHub Pages serves `index.html`; `.nojekyll` enables direct static-file publishing. No dependencies, installation, or build step are required.

## Preview locally

From this repository:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. The site also supports being served beneath its `/agromap3d/` GitHub Pages path. Fonts load from Google Fonts when available, with local system fallbacks.

## Add the paper, code, and dataset links

Edit `site-config.js`:

- `arxivUrl`: the public arXiv abstract-page URL; this also activates every Paper link.
- `paperUrl`: an optional preferred paper URL, overriding `arxivUrl` for Paper buttons.
- `paperLabel`: an optional resource-card label.
- `codeUrl`: the public implementation repository.
- `datasetUrl`: the public dataset landing page.
- `siteUrl`: the final website address, including the trailing slash.

Empty resource URLs remain explicitly marked as forthcoming. The anonymous review manuscript is not included in this website release. Update the citation with the DOI and proceedings details once available.

## Media

All page imagery and the playable video are stored inside this repository. There are no references to the original research workspace or its local paths.

- `media/demo.mp4`: the web video, encoded as H.264 at the original 1280 × 720 resolution, with fast-start metadata for browser playback. The clip has no audio track.
- `media/main_video.mp4`: the larger original is preserved locally and ignored by Git. It is not needed to run the page.
- `media/teaser_img.png`, `media/argomap_dense_green.png`, `media/argomap_dense_dry.png`: supplied original figures.
- `assets/images/`: optimized WebP figures, additional RGB field views and the social preview image.
- `assets/logos/`: the original institution logos, linked to the institutions' websites.

The paper's pipeline diagram is intentionally omitted. The controlled-evaluation section contains two labeled placeholders for the future matched global-cue-only and AgroMap3D views; no comparison images are currently displayed there. The existing demo and field examples remain qualitative visualizations.

The abstract and research descriptions follow the camera-ready manuscript supplied on 27 October 2026. Its abstract's project-URL placeholder is adapted to refer to this page's resources. Results distinguish synthetic-cue anchoring, visual refinement with provider confidence, and dual-rate reliability. Trajectory metrics use per-sequence Sim(3) alignment and do not establish absolute georeferencing, recovered scale accuracy, or independent onboard-cue performance. The page also preserves the keyframe-rate versus dual-rate tradeoff in relative translation and rotation errors.

## Institution logos

The original artwork, colors, and proportions are preserved. The DeepPlants logo uses a dark background to keep its white lettering readable.

Sources:

- DeepPlants: https://deepplants.com/wp-content/uploads/2021/10/DeePPlants-1.png
- Sapienza: https://www.uniroma1.it/sites/default/files/images/logo/sapienza-big.png
- Sapienza visual identity: https://www.uniroma1.it/it/pagina/marchio-identita-visiva-e-sistema-grafico

## Licensing

No blanket license is assigned in this website release. The code and dataset licenses will be specified with their respective releases. Institution logos and third-party materials remain subject to their owners' terms.
