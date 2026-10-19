# For MrDoob

A standalone interactive tribute gallery for MrDoob, creator of Three.js, and Robot 2.0.

Live gallery: https://hard2forgetme.github.io/mrdoob-statue/

Direct Robot link: https://hard2forgetme.github.io/mrdoob-statue/#robot

Open the GitHub Pages URL to rotate/zoom the statue, read its corrected plaque, or download the full-detail GLB. It runs as a static page without a build step. To preview locally: `python3 -m http.server 5368 --bind 127.0.0.1`.

## Asset and credits

- The full-detail corrected statue is `assets/mrdoob.glb` (6,594,336 bytes), SHA-256 `1e457be0cd73083534939a4890ffaec74776fc9a58db6252ceb8b0c2f961fcd6`.
- Robot 2.0 is `assets/robot.glb` (7,001,088 bytes), SHA-256 `0bc492084ea4a662c71989b78d8ac702d7b8d290215a553478a8fa605f69c09f`. Its corrected plaque reads **Robot 2.0 / THREE.JS CHAMPION**. This is a separate share derivative; the game asset is unchanged.
- Sculpture generated with Tripo; refined in Blender with plaque text **MrDoob / CREATOR OF THREE.JS**. Community tribute; no endorsement implied.
- Plaque lettering uses Libre Baskerville. The model contains converted letter geometry rather than an embedded font file.
- The viewer uses Google's `@google/model-viewer` **4.4.0**, vendored from the official npm package. Its Apache-2.0 license is in `vendor/MODEL-VIEWER-LICENSE.txt`. Page typography uses Google Fonts with system-font fallbacks.
- Exporter metadata was stripped from embedded texture containers without changing geometry or compressed pixel data.
- No additional reuse license for the sculpture is granted by this repository. No third-party rights are waived. This repository does not assert that MrDoob or the Three.js project created or endorsed this asset.

## Deployment

GitHub Pages publishes the root of `main`. No game source, private evidence, original high-resolution source models, credentials, or local filesystem paths are included.
