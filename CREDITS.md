# Image & media credits

## Real landmark photography (Lake Van & Akhtamar)

These are **real, commercially-licensed** photographs of the actual landmarks,
sourced from Wikimedia Commons. Each requires attribution under its license.

| File | Subject | Author | License | Source |
| --- | --- | --- | --- | --- |
| `public/images/lake-van.jpg` | Lake Van shoreline (turquoise water) | EvgenyGenkin | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5/) | [File:Lake Van (East) 01.jpg](https://commons.wikimedia.org/wiki/File:Lake_Van_(East)_01.jpg) |
| `public/images/akhtamar-church.jpg` | Akhtamar Island — Armenian Church of the Holy Cross, with Mount Artos | Bryce Edwards | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [File:Akdamar Island on Lake Van with the Armenian Church of the Holy Cross and Mount Artos in the background.jpg](https://commons.wikimedia.org/wiki/File:Akdamar_Island_on_Lake_Van_with_the_Armenian_Church_of_the_Holy_Cross_and_Mount_Artos_in_the_background.jpg) |
| `public/images/lake-island.jpg` | Rocky island shore on Lake Van (Akhtamar) | Armenak Margarian | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [File:Akhtamar12.JPG](https://commons.wikimedia.org/wiki/File:Akhtamar12.JPG) |

> Images were resized/recompressed for the web; no other modifications.
> CC BY / CC BY-SA permit commercial use **with attribution** (BY-SA additionally
> requires that adaptations of the photo be shared under the same license — this
> site displays the photos, it does not relicense them).

## Scroll-scrubbed intro descent (SpaceX-style hero)

- `_source-frames/earth-hero.png`, `_source-frames/zoom-strato.png`,
  `_source-frames/zoom-aerial.png` — **AI-generated (Higgsfield, Nano Banana
  model)**, commissioned for this site (earth-from-space, stratosphere over
  Lake Van, aerial over the lake). Commercial-ready per Higgsfield's terms.
  These are the *source frames* for the descent video; they live in
  `_source-frames/` (tracked, but **kept out of `public/` so they aren't
  deployed**) — only the rendered mp4 + its first/last JPG frames ship.
- `public/frames/descent/frame_0001..0130.jpg` — the descent **canvas frame
  sequence** (scroll-cinematic technique): the master clip sliced to 130
  numbered JPGs at 1440px (~15MB) and scrubbed on a `<canvas>` by scroll
  progress. Master clips live OUT of the deploy at
  `_source-frames/descent-1080-v3.mp4` (+`-720`) — rendered locally with
  ffmpeg as a Ken-Burns dissolve chain (earth → stratosphere → golden aerial)
  from **4K Higgsfield upscales** (`_source-frames/zoom-*-4k.png`).
  `descent-poster-v3.jpg` / `descent-arrival-v3.jpg` are the first/last frames
  (poster + arrival crossfade). To re-cut: replace the master mp4 and re-run
  the ffmpeg slice (see `~/.claude/skills/scroll-cinematic`).
- `public/images/map-strato.jpg` — **derived from the 4K Higgsfield
  stratosphere upscale** (`_source-frames/zoom-strato-4k.png`), downscaled to a
  1600px-wide JPEG with `sharp` (Lanczos). It is the "Lake Van from space"
  reveal target for the Chapter-4 world-map scroll-scrub (`ScrollyMap`, the
  no-Mapbox-token fallback). Commercial-ready per Higgsfield's terms.

## Earth-from-space globe (Phase B)

- `public/images/earth.jpg` — **NASA Visible Earth, "Blue Marble" (eastern
  hemisphere)**, a **public-domain** NASA image. Used as the globe poster and as
  the static fallback when no Mapbox token / no WebGL / reduced motion.
  Source: [NASA Visible Earth — Blue Marble](https://visibleearth.nasa.gov/images/57723/the-blue-marble) (`globe_east_2048.jpg`). NASA imagery is generally not copyrighted.
- The live globe (when `NEXT_PUBLIC_MAPBOX_TOKEN` is set) is **Mapbox GL** with
  Mapbox satellite tiles — © Mapbox © Maxar, attributed in-canvas by Mapbox.

## Hero spread + hero video

- `public/images/hero-spread.jpg`, `public/images/hero-poster.jpg`,
  `public/images/og.jpg` are derived from an **Unsplash** breakfast photo
  (`photo-1504754524776-8f4f37790ca0`), licensed under the
  [Unsplash License](https://unsplash.com/license) (free commercial use).
  **TODO:** swap for the client's real photos / Higgsfield-generated hero.
- `public/video/hero.mp4` is a **cinematic Ken-Burns push-in rendered locally
  with ffmpeg** from `hero-poster.jpg` (no external footage). It is a stand-in
  for the Higgsfield-generated hero clip and is drop-in replaceable: overwrite
  `public/video/hero.mp4` (keep the same path) and the poster.

## Food & product photography (Unsplash — self-hosted)

The priority food/product slots now use **real photos downloaded from Unsplash**
and self-hosted under `public/images/`. The [Unsplash License](https://unsplash.com/license)
permits free commercial use (attribution appreciated, not required). They remain
**placeholders** — swap for the client's own shoot when available.

| File | Subject | Unsplash photo |
| --- | --- | --- |
| `jar-honey.jpg` | honey jar + dipper | `photo-1587049352851-8d4e89133924` |
| `plate-otlu-peynir.jpg` | white cheese | `photo-1486297678162-eb2a19b0a32d` |
| `bowl-bal-kaymak.jpg` | honey & clotted cream | `photo-1645696675973-969ee925a156` |
| `jar-murtuga.jpg` | toasted-flour paste jar | `photo-1571856515282-e2080f63b04e` |
| `box-breakfast.jpg` | Turkish breakfast spread | `photo-1580069491658-8220b0e8722d` |
| `macro-honey.jpg` | honey close-up | `photo-1558642452-9d2a7deb7f62` |
| `pomegranate.jpg` | split pomegranate | `photo-1541344999736-83eca272f6fc` |
| `samovar-tea.jpg` | brass samovar + teapot | `photo-1754215938460-e28a5f9ec2f5` |
| `tandir-bread.jpg` | rustic bread + wheat | `photo-1509440159596-0249088772ff` |
| `eggs-sucuk.jpg` | eggs with sucuk, skillet | `photo-1520218576172-c1a2df3fa5fc` |
| `menemen.jpg` | eggs, tomato & pepper | `photo-1682622110419-b671026a4536` |
| `herbs.jpg` | fresh herbs on a board | `photo-1604543631489-4c03c8cc6ded` |

The few remaining slots still hot-link Unsplash (butter, walnut, çökelek,
tereyağı, kavut, çörek, cacık, the gallery table/spread crops, and the 5
testimonial avatars) — see the inline notes in `src/content/images.ts`.
