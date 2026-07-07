# Ukonnect / Hubtown Scroll-Driven Animation — Full Documentation

Source file: `index.html` (2532 lines). All line numbers below are current as of this document's creation, reflecting the mountain/river 3D redesign with the restored original Hubtown chapter names and copy.

---

## 1. All Text Content

### 1.1 Narrative Chapters (`storyChapters` array — [index.html:1123-1180](index.html#L1123))

| # | progress (trigger %) | chapter (label) | title | content (body copy) | actionText | actionUrl |
|---|---|---|---|---|---|---|
| 1 | 0 | FUTURE | WE BUILD THE FUTURE OF REAL ESTATE | "For over 40 years, Hubtown has created some of India's most innovative real estate developments, spanning across Residential, Commercial and Industrial projects. From the drawing board to reality, across all facets of society." | ⁙ EXPLORE OUR PROJECTS | #projects |
| 2 | 15 | INNOVATION | WE LEAD THE WAY IN DEVELOPMENT | "At Hubtown we look at the world through a different lens; instead of seeing what is, we see what could be. Each day we seek better ways to design, build and create communities." | ⁙ WORK WITH US | #contact |
| 3 | 36 | COLLABORATION | WE WORK WITH A NETWORK OF EXPERTS | "We are not just real estate developers. We are inventors, architects, engineers, designers, city planners, safety experts, artists... All coming together to shape the future, for you." | *(none — button hidden)* | — |
| 4 | 52 | EXCELLENCE | TO BUILD WHAT OTHERS CAN ONLY IMAGINE | "We work with experts from all over the world, because there is always something to learn. We aim higher, dream bigger and create better. Always." | ⁙ DISCOVER OUR VISION | #vision |
| 5 | 72 | PURPOSE | SHAPE THE LAND WITH PURPOSE | "In an ever changing world with increasingly limited resources, we believe it essential to not only build well, but with vision, intention – and purpose. We build to last." | *(none — button hidden)* | — |
| 6 | 88 | LEGACY | AND DEFINE TOMORROW'S LANDSCAPE | "Join us as we continue to shape tomorrow, creating formidable communities, enduring experiences, and places of exceptional value." | ⁙ EXPLORE OUR PROJECTS | #projects |

This is the original Hubtown copy, unchanged in wording from the very first version of the site — only the underlying 3D visuals (mountains/river) have been replaced; the narrative and chapter names were restored to match. Every chapter also has empty `stat: ""` and `detail: ""` fields (unused legacy fields).

### 1.2 Static Hero Placeholder (before JS overwrites it) — [index.html:1070-1079](index.html#L1070)

| Element ID | Text |
|---|---|
| `#storyTitle` (h2) | USA Staffing & Workforce Solutions |
| `#storyContent` | "We connect exceptional talent with America's most ambitious companies — through smart sourcing, seamless compliance, and people-first hiring at every stage." |
| `#storyActionContainer` (a) | Let's Ukonnect! → `#contact` |
| `#storyStat` | PEOPLE. POSITIONS. |
| `#storyDetail` | PERFECTLY UKONNECTED |

This is what renders on first paint (leftover from the site's "Ukonnect" branding); `updateStoryContent(0)` ([index.html:2217](index.html#L2217)) immediately replaces it with Chapter 1 (FUTURE) content on load.

### 1.3 Progress Bar Text — [index.html:1082-1088](index.html#L1082), updated at [index.html:2138-2140](index.html#L2138)

| Element ID | Content | Update logic |
|---|---|---|
| `#progressText` | `"{0-100}%"` | `Math.round(scrollProgress * 100) + '%'` |
| `#progressFill` (div width) | `0%` → `100%` | `style.width = progressPercent + '%'` |

### 1.4 Left-Hand Vertical Navigation Menu — [index.html:1026-1031](index.html#L1026)

| data-stop | Label |
|---|---|
| 0 | FUTURE |
| 1 | INNOVATION |
| 2 | COLLABORATION |
| 3 | EXCELLENCE |
| 4 | PURPOSE |
| 5 | LEGACY |

(These are the original Hubtown labels, restored after a brief experiment with SOURCE/DESCENT/TURBULENCE/PASSAGE/CONVERGENCE/DESTINATION naming that has since been reverted.)

### 1.5 Other UI Text

| Text | Location | Purpose |
|---|---|---|
| "UKONNECT" | header logo, `.logo` | Site logo |
| "■ CLICK TO ENABLE AUDIO" | `.hud-audio-trigger`, header | Audio prompt |
| "⁚ LOGIN" | `.btn-signin` | Header nav button |
| "⁙ MENU" | `.btn-cta` | Header nav button |
| "START" | `#chapterMarker` default text, [index.html:1091](index.html#L1091) | Replaced by chapter name once scrolling begins |
| "LOADING CONTENT" | `.hud-preloader-label`, [index.html:1009](index.html#L1009) | Preloader caption |
| "SOUND ON" (toggled at runtime) | `.hud-mute-btn`, [index.html:1097](index.html#L1097) | Audio mute toggle button |
| "SCROLL TO EXPLORE" | `.footer-center`, [index.html:1101](index.html#L1101) | Footer hint |
| "CHAT WITH US" | `.footer-chat-btn`, [index.html:1104](index.html#L1104) | Footer CTA → `#contact` |
| "[ CLICK TO ENABLE AUDIO ]" | cursor tooltip | Follows mouse until audio enabled |
| "WWW.UKONNECTSTAFFING.COM" | `.hud-left-url` | Fixed left-edge HUD label |

---

## 2. All Animations

### 2.1 Camera Animation

| Property | Value | Location |
|---|---|---|
| Path control points (10 points, converted to `Vector3`) | `[10,140,55] [-60,138,57] [65,136,56] [100,125,45] [126,141,12] [150,112,8] [157,73,0] [180,44,5] [207,35,10] [232,36,0]` — raw tuples are `[x, z, y]`, converted to `Vector3(x, y, z)` | [index.html:1278-1289](index.html#L1278) |
| Front section (points 1-5) | An elevated (`y≈125-140`), wide, side-to-side "hero pan" — the camera stays back and high, drifting left then right, before descending. This replaces what used to be a direct, steep descent. | [index.html:1272-1277](index.html#L1272) (comment), [1278-1289](index.html#L1278) |
| Back section (points 5-10) | Reconnects exactly onto the original canyon/rapids/forest/delta/destination path (unchanged coordinates), so all later stages keep their original shape and placement | same block |
| Curve type | `THREE.CatmullRomCurve3`, `tension = 0.5` | [index.html:1302](index.html#L1302) |
| Camera FOV / near / far | `PerspectiveCamera(45, aspect, 0.001, 200)` | [index.html:1249](index.html#L1249) |
| Position update | `updateCameraPercentage(percentage)`: camera group positioned at `path.getPointAt(percentage)`, looks at `path.getPointAt(percentage + 0.03)` (look-ahead of 3%) | [index.html:1832-1839](index.html#L1832) |
| Rotation smoothing | `camera.rotation.y += (cameraRotationProxyX - camera.rotation.y) / 15` (damped approach, divisor 15) — same for `.rotation.x` | [index.html:1876-1877](index.html#L1876) |
| Scroll → percentage driver | `tubePerc.percent` tweened 0 → 0.96 via GSAP, feeding `cameraTargetPercentage` | [index.html:1864-1871](index.html#L1864) |
| Interpolation/ease | `Linear.easeNone` (`gsap.defaultEase`), duration `10` (nominal — actual pacing controlled by ScrollTrigger `scrub`) | [index.html:1844](index.html#L1844), [1866](index.html#L1866) |
| Point light follow | Scene point light tracks `p2` (look-ahead point) | [index.html:1837](index.html#L1837) |

### 2.2 3D Object Animations Per Stage

All stage groups are built once in `initCustomStages()` ([index.html:1469-1822](index.html#L1469)) and toggled/animated every frame inside `render()` ([index.html:1873-2015](index.html#L1873)).

#### Stage 1 — FUTURE (twin glowing peaks)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `currentCameraPercentage < 0.22` (fully visible < 0.15, fading 0.15–0.22) | [index.html:1904-1927](index.html#L1904) |
| Geometry | 2× `ConeGeometry(16, 48, 7)` body + 2× `ConeGeometry(6, 14, 7)` snow-cap, positioned far apart (`±90` units) and elevated relative to the path's start point — a distant, symmetrical flanking composition, not something the camera flies through | [index.html:1562-1577](index.html#L1562) |
| Scale | Fixed at `(1, 1, 1)` every frame — no longer grows as the camera approaches (this was changed from an earlier version that scaled 1×→1.6×) | [index.html:1914](index.html#L1914) |
| Fade | `0.15 → 0.22`: opacity fades `0.9 → 0` using a smoothstep curve (`t*t*(3-2t)`) | [index.html:1916-1926](index.html#L1916) |
| Continuous animation | `emissiveIntensity` pulses `1.2 ± 0.3` via `sin(Date.now()*0.0006 + idx)` (per-peak phase offset) | [index.html:1907-1912](index.html#L1907) |
| Mist particles (`mistParticles`, 40 spheres) | Visible while `pct < 0.22`; rise `+0.2`/frame, reset to `y=-10` once `y>35` | [index.html:1929-1937](index.html#L1929) |

#### Primary River (spans entire journey)
| Aspect | Detail | Location |
|---|---|---|
| Geometry | `CatmullRomCurve3` sampled 61 points across `0 → 0.96` of the main path, offset `y - 9.8`; `TubeGeometry(riverCurve, 240, 3.2, 8, false)` — widened from an earlier `2.4` radius so it reads clearly from the pulled-back hero shot | [index.html:1598-1618](index.html#L1598) |
| Material | `MeshPhongMaterial`, color `0x00a8ff`, emissive `0x00f5d4` @ 0.45, wireframe, opacity `0.55` (brightened from earlier 0.25/0.35 values) | [index.html:1608-1617](index.html#L1608) |
| Traveling light | `riverLight` (PointLight `0x00f5d4`, intensity 2, distance 45) follows `riverCurve.getPointAt(journeyRatio)` where `journeyRatio = map(pct, 0, 0.96, 0, 1)` — always visible | [index.html:1940-1945](index.html#L1940) |
| Flow-speed pulse | `emissiveIntensity = 0.35 + sin(Date.now()*flowSpeed)*0.15`; `flowSpeed = 0.003` during Innovation/Collaboration (`0.15≤pct<0.52`), else `0.0012` (calmer) | [index.html:1946-1949](index.html#L1946) |

#### Stage 2 — INNOVATION (canyon walls)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `0.15 ≤ pct < 0.36` | [index.html:1951-1961](index.html#L1951) |
| Geometry | 34 jagged `ConeGeometry` rock-wall formations (17 pairs, one per side) lining the river descent along path ratio `0.15 → 0.36`, each randomly sized/rotated for a jagged, irregular canyon look | [index.html:1624-1648](index.html#L1624) |
| Continuous animation | Wall glow pulses per-piece: `emissiveIntensity = 0.25 + sin(idx + Date.now()*0.001)*0.1` | [index.html:1951-1961](index.html#L1951) |
| Note | This is new geometry — earlier versions of this stage had no dedicated visuals of its own and relied only on the always-visible background mountains | — |

#### Stage 3 — COLLABORATION (rapids)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `0.15 ≤ pct < 0.52` | [index.html:1963-1971](index.html#L1963) |
| Geometry | 26× `IcosahedronGeometry(1.5–4, 0)` jagged rocks scattered along path ratio `0.36 + random()*0.16`, each with a small white spray sphere above it | [index.html:1650-1679](index.html#L1650) |
| Continuous animation | Each rock/spray bobs: `position.y += sin(idx + Date.now()*0.004) * 0.03` | [index.html:1964-1970](index.html#L1964) |

#### Stage 4 — EXCELLENCE (forest treeline)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `0.50 ≤ pct < 0.72` | [index.html:1973-1981](index.html#L1973) |
| Geometry | 34 trees (`CylinderGeometry` trunk + `ConeGeometry` canopy) placed along path ratio `0.52 + (i/34)*0.20`, alternating left/right sides | [index.html:1682-1707](index.html#L1682) |
| Continuous animation | Gentle sway: `rotation.z = sin(idx + Date.now()*0.0008) * 0.02` | [index.html:1974-1980](index.html#L1974) |

#### Stage 5 — PURPOSE (tributary convergence)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `0.70 ≤ pct < 0.90` | [index.html:1983-1991](index.html#L1983) |
| Geometry | 5 branching `TubeGeometry` tributary streams radiating outward from `path.getPointAt(0.80)` and converging inward as they approach the main river | [index.html:1709-1734](index.html#L1709) |
| Continuous animation | Opacity pulses per-branch: `0.3 + sin(Date.now()*0.0015 + idx) * 0.1` | [index.html:1984-1990](index.html#L1984) |

#### Stage 6 — LEGACY (river mouth / horizon + network nodes)
| Aspect | Detail | Location |
|---|---|---|
| Appears | `pct ≥ 0.85` | [index.html:1993-2007](index.html#L1993) |
| Geometry | Wide `PlaneGeometry(600,600)` ocean plane + `PlaneGeometry(500,120)` horizon glow panel + 30 drifting haze spheres (`userData.isHaze = true`) + **14 glowing "network nodes"** (`userData.isNode = true`), each connected to its nearest neighbor by a thin glowing line — representing Hubtown's interconnected legacy of built communities | [index.html:1736-1821](index.html#L1736) |
| Continuous animation | Haze spheres drift (`position.y += sin(...)*0.01`); nodes pulse brightness (`emissiveIntensity = 0.5 + sin(idx + Date.now()*0.0012)*0.3`) | [index.html:1995-2006](index.html#L1995) |

#### Background elements (visible for the entire scroll, not stage-gated)
| Element | Detail | Location |
|---|---|---|
| Mountain silhouettes (`stageMountains`) | 20 stretched `SphereGeometry(30,24,24)` meshes (2 per path point × 10 points), scale `(1.8, 3.8, 1.2)`, dark navy `0x020813` | [index.html:1499-1522](index.html#L1499) |
| Sparkle/mist group (`sparkleGroup`) | 65 small cyan spheres drifting near water level | [index.html:1524-1538](index.html#L1524) |
| Continuous drift | `position.y += sin(idx + Date.now()*0.0012)*0.012`; `position.x += cos(idx + Date.now()*0.001)*0.008` | [index.html:1896-1902](index.html#L1896) |
| Water surface (`customWater`) | `PlaneGeometry(1000,1000,48,48)`, dark navy w/ cyan specular | [index.html:1470-1482](index.html#L1470) |
| Water bob | `position.y = -10 + sin(Date.now()*0.001)*0.35`; `rotation.z = -π/2 + cos(Date.now()*0.0006)*0.018` | [index.html:1883-1884](index.html#L1883) |
| Water ripple (vertex displacement) | Per-vertex: `v.z = baseZ + sin(v.x*0.08+t)*0.6 + cos(v.y*0.1+t*0.8)*0.4`, `t = Date.now()*0.0012`, flagged via `verticesNeedUpdate` (legacy Three r100 `Geometry` API, not `BufferGeometry.attributes`) | [index.html:1886-1893](index.html#L1886) |
| Background particle fields (3 systems, unrelated to the river theme — original template decoration) | 6,800 points each, `ParticleSystem`/`ParticleBasicMaterial` (deprecated Three r100 API), additive blending | [index.html:2119-2121](index.html#L2119) |
| Continuous rotation | `particleSystem1.rotation.y += 0.00002`; `particleSystem2.rotation.x += 0.00005`; `particleSystem3.rotation.z += 0.00001` | [index.html:2009-2011](index.html#L2009) |

### 2.3 Text Overlay Animations (`.story-container`) — [index.html:279-298](index.html#L279)

| Property | Value |
|---|---|
| Base state | `opacity: 0`, `transform: translateY(20px)` |
| Active state (`.active`) | `opacity: 1`, `transform: translateY(0)` |
| Transition | `all 0.7s cubic-bezier(0.16, 1, 0.3, 1)` (custom ease-out curve) |
| Trigger logic | In `updateStoryContent()`: when the chapter's title differs from the DOM, `.active` is removed (fade+slide out), text is swapped after a **300ms `setTimeout`**, then `.active` is re-added (fade+slide in) — [index.html:2166-2185](index.html#L2166) |
| Chapter marker fade | `.chapter-marker` transitions `all 0.3s ease`; becomes `.active` once `progressPercent > 15` — [index.html:407](index.html#L407), [index.html:2192-2196](index.html#L2192) |
| CTA button hover | `.story-action` transitions `all 0.2s` (background/color/border/glow) — [index.html:352-360](index.html#L352) |

### 2.4 Particle/Effect Animations

| Effect | Detail | Location |
|---|---|---|
| Bloom post-processing | `UnrealBloomPass(resolution, strength=1.5, radius=0.4, threshold=0.85)`; runtime overrides `threshold=params.bloomThreshold(0)`, `strength=params.bloomStrength(0.9)`, `radius=params.bloomRadius(0)` | [index.html:1261-1264](index.html#L1261) |
| Sparkle/mist drift | See §2.2 background elements | [index.html:1896-1902](index.html#L1896) |
| Water waves | See §2.2 water ripple | [index.html:1886-1893](index.html#L1886) |
| Rapids spray bob | See §2.2 Stage 3 | [index.html:1964-1970](index.html#L1964) |
| Network node pulse | See §2.2 Stage 6 | [index.html:2002-2004](index.html#L2002) |

### 2.5 Progress Bar Animation

| Property | Value | Location |
|---|---|---|
| Fill transition | `.progress-fill { transition: width 0.3s ease; }` | [index.html:385-390](index.html#L385) |
| Update driver | `progressFill.style.width = progressPercent + '%'` inside `updateStoryContent`, called every `ScrollTrigger` `onUpdate` tick | [index.html:2138](index.html#L2138) |

---

## 3. Timing & Thresholds

All thresholds are evaluated against `currentCameraPercentage` (0–1 scale) inside `render()`, updated every animation frame from the scroll-driven `cameraTargetPercentage`.

| Threshold | Triggers |
|---|---|
| **0** | Journey start (elevated, pulled-back hero view); FUTURE peaks at full opacity; river light at path start; chapter = FUTURE |
| **0.15** (15%) | Peaks begin fading (finish by 0.22); canyon walls (`canyonGroup`) become visible; rapids (`rapidsGroup`) become visible; river flow-speed pulse switches to fast (0.003); chapter marker becomes visible (`.active`); chapter → INNOVATION |
| **0.22** | Peaks and mist fully hidden (fade complete) |
| **0.36** (36%) | Canyon walls hidden; chapter → COLLABORATION (rapids remain visible until 0.52) |
| **0.50** | Forest group (`forestGroup`) becomes visible |
| **0.52** (52%) | River flow-speed pulse reverts to calm (0.0012); rapids group hidden; chapter → EXCELLENCE |
| **0.70** | Tributary/convergence group (`deltaGroup`) becomes visible |
| **0.72** (72%) | Chapter → PURPOSE (tributary visuals already active since 0.70) |
| **0.85** | Ocean/legacy group (`oceanGroup`, incl. network nodes) becomes visible; forest fully hidden by now |
| **0.88** (88%) | Chapter → LEGACY (visual stage already active since 0.85) |
| **0.90** | Tributary/convergence group hides |
| **0.96** | GSAP tween end value for `tubePerc.percent` — camera's furthest point along the path |

### Easing Functions Used

| Context | Easing |
|---|---|
| GSAP global default (`gsap.defaultEase`) | `Linear.easeNone` — [index.html:1844](index.html#L1844) |
| Camera tween (`tl.to(tubePerc, ...)`) | `Linear.easeNone` explicit override — [index.html:1866](index.html#L1866) |
| Camera rotation damping | Not a named ease — exponential-approach smoothing via `/15` divisor each frame — [index.html:1876-1877](index.html#L1876) |
| Peak fade-out | Manual smoothstep: `t*t*(3-2t)` — [index.html:1919-1920](index.html#L1919) |
| `.story-container` transition | `cubic-bezier(0.16, 1, 0.3, 1)` (custom "expo-out"-style ease) — [index.html:291](index.html#L291) |
| `.chapter-marker`, `.progress-fill`, header/buttons | Standard CSS `ease` — [index.html:389](index.html#L389), [index.html:407](index.html#L407) |
| `.hud-preloader` fade | `cubic-bezier(0.16, 1, 0.3, 1)` — [index.html:671](index.html#L671) |

---

## 4. Configuration Values

### 4.1 GSAP ScrollTrigger — [index.html:1850-1863](index.html#L1850)

| Setting | Value |
|---|---|
| `trigger` | `.scrollTarget` (an absolutely-positioned `1000vh` tall spacer div — [index.html:231-237](index.html#L231), defines total scrollable distance) |
| `start` | `"top top"` |
| `end` | `"bottom 100%"` |
| `scrub` | `5` (5-second smoothing lag between scroll input and animation value) |
| `onUpdate` | Calls `updateStoryContent(self.progress)` on every tick |

### 4.2 Animation Durations (`duration:` values)

| Location | Duration | Purpose |
|---|---|---|
| [index.html:1867](index.html#L1867) | `10` | GSAP tween duration for `tubePerc.percent` (0→0.96); nominal — actual playback is tied to scroll position via `scrub`, not wall-clock time |

### 4.3 Delays

| Location | Delay | Purpose |
|---|---|---|
| [index.html:2168-2184](index.html#L2168) | `300ms` (`setTimeout`) | Gap between story text fade-out and fade-in during a chapter change |

### 4.4 Light Colors, Intensities, Positions

| Light | Type | Color | Intensity | Distance | Position | Location |
|---|---|---|---|---|---|---|
| Ambient | `AmbientLight` | `0x081630` | 1.5 | — | — | [index.html:1485](index.html#L1485) |
| Directional | `DirectionalLight` | `0x00a8ff` | 0.8 | — | `(120, 100, 90)` | [index.html:1489-1490](index.html#L1489) |
| Water reflect | `PointLight` | `0x00f5d4` | 4 | 75 | at path-start point + `(5,-8,5)` offset | [index.html:1495-1496](index.html#L1495) |
| River light (traveling) | `PointLight` | `0x00f5d4` | 2 | 45 | animated along `riverCurve` | [index.html:1621](index.html#L1621) |
| Camera-follow light | `PointLight` | `0xfff4e0` | 0.35 | 4 | follows look-ahead point `p2` | [index.html:1828](index.html#L1828) |

### 4.5 Material Colors & Bloom Settings

| Material | Color | Emissive | Opacity | Notes | Location |
|---|---|---|---|---|---|
| Peak body (`peakMat`) | `0x00d4ff` | `0x00f5d4` @ 1.5 | 0.9 | roughness 0.2, metalness 0.3 — strengthened from an earlier, dimmer 0.55 intensity | [index.html:1545-1553](index.html#L1545) |
| Snow cap (`snowCapMat`) | `0xe8fbff` | `0x00f5d4` @ 0.5 | 0.95 | roughness 0.4 | [index.html:1554-1561](index.html#L1554) |
| River tube (`riverTubeMat`) | `0x00a8ff` | `0x00f5d4` @ 0.45 | 0.55 | wireframe, specular `0x00f5d4`, shininess 80 — brightened/widened for hero-shot visibility | [index.html:1608-1617](index.html#L1608) |
| Canyon walls (`canyonWallMat`) | `0x061826` | `0x00a8ff` @ 0.25 | 1 (opaque) | flatShading, roughness 0.8 | [index.html:1626-1632](index.html#L1626) |
| Rapids rocks (`rockMat`) | `0x0d1f33` | `0x00a8ff` @ 0.15 | 1 (opaque) | flatShading, roughness 0.9 | [index.html:1656-1662](index.html#L1656) |
| Spray (`sprayMesh` mat) | `0xffffff` | — | 0.75 | — | [index.html:1675](index.html#L1675) |
| Tree trunk (`trunkMat`) | `0x142418` | — | 1 (opaque) | roughness 1 | [index.html:1689](index.html#L1689) |
| Tree canopy (`canopyMat`) | `0x0a2a1e` | `0x00302a` @ 0.4 | 1 (opaque) | roughness 0.85 | [index.html:1692-1697](index.html#L1692) |
| Delta/tributary branches (`branchMat`) | `0x00f5d4` | — | 0.4 (pulses ~0.2–0.4) | wireframe | [index.html:1726-1731](index.html#L1726) |
| Ocean plane (`oceanPlaneMat`) | `0x03182b` | — | 0.85 | specular `0x00f5d4`, shininess 100, flatShading | [index.html:1740-1747](index.html#L1740) |
| Horizon glow (`horizonGlowMat`) | `0x00f5d4` | — | 0.12 | DoubleSide | [index.html:1755-1760](index.html#L1755) |
| Haze spheres | `0x00f5d4` | — | 0.35 | `userData.isHaze = true` | [index.html:1770-1772](index.html#L1770) |
| Network nodes (`nodeMat`) | `0x00f5d4` | `0x00f5d4` @ 0.6 | 0.95 | `userData.isNode = true` | [index.html:1783-1789](index.html#L1783) |
| Node connector lines (`nodeLineMat`) | `0x00f5d4` | — | 0.3 | `LineBasicMaterial`, connects each node to its nearest neighbor | [index.html:1804](index.html#L1804) |
| Water (`waterMat`) | `0x020d21` | — | 1 (opaque) | specular `0x00f5d4`, shininess 90, flatShading | [index.html:1472-1477](index.html#L1472) |
| Mountains (`mountainMat`) | `0x020813` | — | 1 (opaque) | specular `0x00a8ff`, shininess 35 | [index.html:1501-1505](index.html#L1501) |
| Sparkle/mist spheres | `0x00f5d4` | — | 0.85 (sparkle) / 0.8 (mist) | — | [index.html:1529](index.html#L1529), [index.html:1586](index.html#L1586) |

**Bloom (`UnrealBloomPass`)** — [index.html:1261-1264](index.html#L1261):
- Base construction: `strength=1.5, radius=0.4, threshold=0.85`
- Runtime overrides applied immediately after: `threshold=0`, `strength=0.9`, `radius=0`
- `exposure: 1.3` defined in `params` but not applied anywhere (dead config value)

---

## 5. Quick Line-Number Reference

| Item | Line(s) |
|---|---|
| `storyChapters` array definition | [1123-1180](index.html#L1123) |
| `updateStoryContent` function | [2134-2210](index.html#L2134) |
| `updateCameraPercentage` function | [1832-1839](index.html#L1832) |
| `initCustomStages` function | [1469-1822](index.html#L1469) |
| `render` function (main animation loop) | [1873-2015](index.html#L1873) |
| `requestAnimationFrame(render)` calls | recursive call at end of `render()`; initial kickoff immediately after |
| GSAP `gsap.registerPlugin(ScrollTrigger)` | [1850](index.html#L1850) |
| GSAP `gsap.timeline({ scrollTrigger: {...} })` | [1852-1863](index.html#L1852) |
| GSAP `tl.to(tubePerc, {...})` | [1864-1871](index.html#L1864) |
| Camera path waypoints (`var points = [...]`) | [1278-1289](index.html#L1278) |
| Scroll-percentage conditionals (`if (currentCameraPercentage ...)`) | [1916](index.html#L1916), [1929-1930](index.html#L1929), [1940-1948](index.html#L1940), [1953](index.html#L1953), [1965](index.html#L1965), [1975](index.html#L1975), [1985](index.html#L1985), [1996](index.html#L1996) |
| `new THREE.Mesh(...)` / object creation (custom stages) | [1478](index.html#L1478) (water), [1510](index.html#L1510)/[1517](index.html#L1517) (mountains), [1527](index.html#L1527) (sparkles), [1565](index.html#L1565)/[1572](index.html#L1572) (peaks), [1568](index.html#L1568)/[1575](index.html#L1575) (snow caps), [1584](index.html#L1584) (mist), [1618](index.html#L1618) (river), [1638](index.html#L1638) (canyon walls, new), [1663](index.html#L1663)/[1673](index.html#L1673) (rapids/spray), [1690](index.html#L1690)/[1698](index.html#L1698) (trees), [1732](index.html#L1732) (tributary branches), [1748](index.html#L1748)/[1761](index.html#L1761)/[1768](index.html#L1768)/[1798](index.html#L1798) (ocean/horizon/haze/network nodes, new) |
| Material definitions (with colors/emissives) | See §4.5 table above for full list with line numbers |
| CSS transitions on `.story-container` / text elements | [291](index.html#L291) (`.story-container`), [352](index.html#L352) (`.story-action`), [389](index.html#L389) (`.progress-fill`), [407](index.html#L407) (`.chapter-marker`) |

---

## 6. Change Log (relative to the original single-cube-per-stage Hubtown template)

1. **Camera path**: original 9-waypoint steep descent replaced with a 10-waypoint path — 5 new points at the front create an elevated, wide, side-to-side "hero pan" (~0–20% of arc length) before reconnecting exactly onto the original canyon-descent trajectory, so every later stage's geometry (placed via curve ratio, not absolute coordinates) is unaffected.
2. **Stage visuals**: the original glowing cube per stage was replaced with a coherent mountain/river landscape — twin glowing peaks (Stage 1), a continuous glowing river spanning the whole journey, jagged canyon walls (Stage 2, new), rapids rocks with spray (Stage 3), a forest treeline (Stage 4), branching tributary streams (Stage 5), and an ocean/horizon plane with glowing "network nodes" and connector lines (Stage 6, new).
3. **Text/labels**: after a brief experiment with river-themed chapter names (SOURCE/DESCENT/TURBULENCE/PASSAGE/CONVERGENCE/DESTINATION), the original Hubtown chapter names and copy (FUTURE/INNOVATION/COLLABORATION/EXCELLENCE/PURPOSE/LEGACY) were restored, now paired with the new 3D visuals rather than the original cubes.
4. **Water rendering**: fixed a bug where per-vertex ripple displacement assumed a modern `BufferGeometry.attributes.position` API; this Three.js build (r100) uses the legacy `Geometry.vertices` + `verticesNeedUpdate` API instead.
