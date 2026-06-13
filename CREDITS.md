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
- `public/frames/descent/frame_0001..0130.webp` (1440px, ~13MB) and
  `public/frames/descent-sm/frame_0001..0130.webp` (960px, ~7MB) — the descent
  **canvas frame sequence** (scroll-cinematic technique): the master clip sliced
  to 130 numbered frames and scrubbed on a `<canvas>` by scroll progress. Stored
  as WebP (q70); the small / low-DPI viewport loads the `-sm` set. Master clips
  live OUT of the deploy at
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

### Self-hosted (final localization pass)

The last hot-linked Unsplash slots were **downloaded, cropped, and recompressed
with `sharp` (mozjpeg q72, metadata stripped)** into `public/images/`, so the
site now has **zero external image dependencies**. [Unsplash License](https://unsplash.com/license)
(free commercial use). All remain **placeholders** — swap for the client's shoot.

| File | Subject | Unsplash photo |
| --- | --- | --- |
| `gallery-spread.jpg` | overhead mixed-meze spread | `photo-1498837167922-ddd27525d352` |
| `gallery-dawn.jpg` | laid breakfast table | `photo-1504754524776-8f4f37790ca0` |
| `gallery-table.jpg` | set dining table | `photo-1414235077428-338989a2e8c0` |
| `walnut.jpg` | bowl of nuts (used for the walnut/nuts slots) | `photo-1508061253366-f7da158b6d46` |
| `menu-cokelek.jpg` | aged cheese w/ figs (çökelek stand-in) | `photo-1452195100486-9cc805987862` |
| `menu-corek.jpg` | sliced rustic loaf (çörek) | `photo-1549931319-a545dcf3bc73` |
| `avatar-1.jpg` … `avatar-5.jpg` | testimonial portraits (200×200) | `photo-1494790108377-…`, `-1500648767791-…`, `-1438761681033-…`, `-1507003211169-…`, `-1544005313-…` |

A few menu slots whose old stock photo was off-subject were repointed to the
**closest accurate existing local asset** instead (some image reuse across cards,
flagged TODO for the client's own dish photography):
`ingredientButter` → `menu-tereyaginda-bal.jpg` (butter & honey) ·
`menuTereyagi` → `bowl-bal-kaymak.jpg` (village dairy) ·
`menuKavut` → `jar-murtuga.jpg` (roasted-flour paste, ≈ kavut) ·
`menuCacik` → `menu-ayran.jpg` (yoghurt).

## Expanded menu — dish photography (Wikimedia / fallbacks)

Real, license-safe dish photos for the 16-item expanded breakfast menu,
self-hosted under `public/images/menu-<id>.jpg`. Each was downloaded from
Wikipedia/Wikimedia Commons (lead photo for the named dish), resized to ≤1200px
wide and recompressed to progressive mozjpeg (q80) with `sharp` (this strips
metadata; no other edits), then **vision-verified** to confirm it depicts the
dish. Where no faithful free image exists, the slot falls back to an existing
local placeholder (noted **FALLBACK** + **TODO**). All Wikimedia images here are
CC BY / CC BY-SA (free commercial use **with attribution**, recorded below);
displaying them does not relicense them.

| file | dish | source (Commons file page URL or FALLBACK) | license |
| --- | --- | --- | --- |
| `menu-kasar-peyniri.jpg` | aged yellow kaşar / kashkaval cheese | [File:Kaschkawal Kashkaval … Sofia IMG 7649.JPG](https://commons.wikimedia.org/wiki/File:Kaschkawal_Kashkaval_%D0%BA%D0%B0%D1%88%D0%BA%D0%B0%D0%B2%D0%B0%D0%BB_Balkank%C3%A4se_Sofia_IMG_7649.JPG) — Apostoloff | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-tereyaginda-bal.jpg` | village butter next to honey | **FALLBACK:** `public/images/bowl-bal-kaymak.jpg` (honey w/ dipper) — **TODO:** Wikipedia "Tereyağı"/"Butter" lead is a wrong image (a Swedish cake); "Kaymak" shows clotted cream with no honey. No faithful free butter+honey photo found; using the honey-bowl placeholder. | Unsplash (`photo-1645696675973-…`) |
| `menu-tahin-pekmez.jpg` | tahini swirled with grape molasses | **FALLBACK:** `public/images/jar-murtuga.jpg` (pale tahini-style paste in jar) — **TODO:** no faithful free *tahin-pekmez swirl* exists; Wikipedia "Pekmez" shows only dark molasses (not the tahini blend), so the tahini-paste placeholder is used instead. | Unsplash (`photo-1571856515282-…`) |
| `menu-acuka.jpg` | red pepper + walnut spread (acuka / muhammara) | [File:Tanoreen muhammara.jpg](https://commons.wikimedia.org/wiki/File:Tanoreen_muhammara.jpg) — Krista | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `menu-pastirmali-yumurta.jpg` | fried eggs with cured pastırma | [File:Pastirma with three eggs.jpg](https://commons.wikimedia.org/wiki/File:Pastirma_with_three_eggs.jpg) — E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `menu-kavurmali-yumurta.jpg` | eggs with lamb kavurma (sahanda) | [File:Sahanda kavurmalı yumurta.jpg](https://commons.wikimedia.org/wiki/File:Sahanda_kavurmal%C4%B1_yumurta.jpg) — E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `menu-cilbir.jpg` | poached eggs over garlic yogurt, chili butter | [File:Çılbır with duck-fat sautéed Ramps (14826584557).jpg](https://commons.wikimedia.org/wiki/File:%C3%87%C4%B1lb%C4%B1r_with_duck-fat_saut%C3%A9ed_Ramps_(14826584557).jpg) — Premshree Pillai | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| `menu-sigara-boregi.jpg` | fried filo cheese cigar rolls | [File:Sigara Böreği.JPG](https://commons.wikimedia.org/wiki/File:Sigara_B%C3%B6re%C4%9Fi.JPG) — CMoi | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-su-boregi.jpg` | layered boiled-dough cheese börek | [File:Su Böreği.JPG](https://commons.wikimedia.org/wiki/File:Su_B%C3%B6re%C4%9Fi.JPG) — Maderibeyza | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-gozleme.jpg` | griddle flatbread with filling | [File:Gözleme.JPG](https://commons.wikimedia.org/wiki/File:G%C3%B6zleme.JPG) — Maderibeyza | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-kaymakli-kayisi.jpg` | dried apricots (stuffed w/ kaymak) | [File:Ab food 04.jpg](https://commons.wikimedia.org/wiki/File:Ab_food_04.jpg) — Andrey Butko. **TODO:** real photo of *dried apricots* (faithful fruit) but it does **not** show the clotted-cream stuffing; no free "kaymaklı kayısı" photo exists on Commons. Preferred over the honey-bowl fallback as the more faithful subject. | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-katmer.jpg` | thin pastry with kaymak + pistachio | [File:Katmer (Antep).jpg](https://commons.wikimedia.org/wiki/File:Katmer_(Antep).jpg) — E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `menu-kunefe.jpg` | shredded kadayıf cheese pastry in syrup | [File:Künefe 20230904.jpg](https://commons.wikimedia.org/wiki/File:K%C3%BCnefe_20230904.jpg) — Basak | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `menu-turk-kahvesi.jpg` | Turkish coffee, small cup + copper cezve | [File:Türk Kahvesi - Bakir Cezve.jpg](https://commons.wikimedia.org/wiki/File:T%C3%BCrk_Kahvesi_-_Bakir_Cezve.jpg) — Eaeeae | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-ayran.jpg` | frothy yogurt drink in a glass | [File:Fresh ayran.jpg](https://commons.wikimedia.org/wiki/File:Fresh_ayran.jpg) — Mavigogun | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `menu-salep.jpg` | warm milky cinnamon-dusted salep | [File:Salep drink.jpg](https://commons.wikimedia.org/wiki/File:Salep_drink.jpg) — DesignbyNur | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |

**Summary: 13 REAL Wikimedia photos, 3 FALLBACK placeholders** (tereyaginda-bal,
tahin-pekmez → existing local Unsplash files; kaymakli-kayisi uses a real but
ingredient-only dried-apricots photo, flagged TODO for a true stuffed-apricot
shot). Swap the three TODO slots for the client's own photography when available.
