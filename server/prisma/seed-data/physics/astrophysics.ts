import type { LessonSeed } from "../types.js";

/**
 * The Milky Way (undergraduate): astrophysics — reading the stars. Luminosity &
 * blackbody radiation, and stellar life cycles with the HR diagram.
 * NUMERIC/SYMBOLIC led. All original content.
 */
export const astrophysicsLessons: LessonSeed[] = [
  // ───────────────────────── 1. Stars: Light & Luminosity ─────────────────────────
  {
    slug: "stars-light-and-luminosity",
    title: "Stars: Light & Luminosity",
    tagline: "Reading a star from its glow",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Color Is Temperature", sub: "A star's color, brightness, and size are locked together by the physics of glowing objects." } },
      { kind: "CONTEXT", title: "Decoding starlight", content: { markdown: "We can't visit a star, yet we know its temperature, size, and power output — all from its light. The key is **blackbody radiation**: any hot object glows with a spectrum set purely by its temperature, and stars are nearly perfect blackbodies." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A hot object emits **blackbody radiation** governed by two laws:\n\n- **Wien's law:** hotter means bluer. The peak wavelength satisfies $\\lambda_{\\text{peak}} \\propto \\dfrac{1}{T}$. So red stars are cool, blue stars are hot.\n- **Stefan–Boltzmann law:** the power radiated per unit area grows as the fourth power of temperature, $\\propto T^4$. For a whole star of radius $R$,\n\n$$L = 4\\pi R^2 \\sigma T^4.$$\n\n**Luminosity** $L$ is the star's total power output. Because of the $T^4$, a small rise in temperature hugely boosts luminosity; because of $R^2$, a bigger star is far brighter at the same temperature.\n\n**Apparent brightness** (how bright it *looks*) also falls off with distance by the inverse-square law, so a star's distance must be known to turn its apparent brightness into true luminosity." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Color and temperature", problem: "Which is hotter, a red star or a blue star?", steps: ["Wien: hotter peaks bluer.", "Blue → higher T."], answer: "The blue star." },
        { title: "Temperature scaling", problem: "If a star's temperature doubles (same size), how does luminosity change?", steps: ["$L \\propto T^4$.", "$2^4 = 16$."], answer: "16 times brighter." },
        { title: "Size scaling", problem: "Two stars at the same T; one has twice the radius. Luminosity ratio?", steps: ["$L \\propto R^2$.", "$2^2 = 4$."], answer: "4 times brighter." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Hotter = bluer; $L \\propto R^2 T^4$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use Wien's law and $L \\propto R^2 T^4$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: spectral lines and composition", content: { markdown: "Beyond the smooth blackbody glow, a star's spectrum carries dark **absorption lines** where atoms in its atmosphere soak up specific wavelengths. Reading those lines reveals composition, and their **Doppler shifts** reveal motion — rotation, orbital wobble from unseen planets, and the recession of distant galaxies. A single spectrum thus encodes temperature, size, chemistry, and velocity: astrophysics is, in large part, the art of decoding light." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Stars radiate nearly as blackbodies.", "Wien's law: hotter stars peak at bluer (shorter) wavelengths.", "Stefan–Boltzmann: $L = 4\\pi R^2\\sigma T^4$.", "Luminosity is hugely sensitive to temperature ($T^4$) and size ($R^2$).", "Apparent brightness also falls off with distance (inverse-square)."], formulas: [{ label: "Luminosity", tex: "L = 4\\pi R^2 \\sigma T^4" }, { label: "Wien's law", tex: "\\lambda_{\\text{peak}} \\propto \\dfrac{1}{T}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A blue star compared with a red star is:", options: ["cooler", "hotter", "the same temperature", "always smaller"], answer: 1, explanation: "Wien's law: bluer means hotter." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Stefan–Boltzmann says radiated power per area scales as:", options: ["$T$", "$T^2$", "$T^4$", "$1/T$"], answer: 2, explanation: "Power per area $\\propto T^4$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "If a star's temperature doubles at fixed size, luminosity increases by what factor ($L\\propto T^4$)?", answer: { value: 16, tolerance: 0 }, explanation: "$2^4 = 16$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "With $4\\pi\\sigma = k$ constant and fixed radius $R$, write luminosity $L$ in terms of $k$, $R$, and temperature $T$. (Type like `k*R^2*T^4`.)", answer: { expr: "k*R^2*T^4", vars: ["k", "R", "T"] }, difficulty: 5, hint: "$L = 4\\pi R^2\\sigma T^4$.", explanation: "$L = kR^2T^4$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two stars share a temperature; one has 3× the radius. How many times brighter is it ($L\\propto R^2$)?", answer: { value: 9, tolerance: 0 }, hint: "$3^2$.", explanation: "$R^2$ scaling: 9 times." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A cooler star peaks at a longer (redder) wavelength.", answer: true, hint: "Wien's law.", explanation: "$\\lambda_{\\text{peak}} \\propto 1/T$, so cooler → redder." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "At fixed radius (constants set to 1), luminosity vs temperature is $L = T^4$. Graph it (enter $L$ as a function of $T$, use $x$ for $T$).", answer: { expr: "x^4", domain: [0, 3], variable: "x" }, difficulty: 4, hint: "Fourth power — rises very steeply.", explanation: "$L = T^4$ climbs dramatically with temperature." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A star's apparent brightness also depends on its:", options: ["color only", "distance", "name", "age only"], answer: 1, hint: "Inverse-square with distance.", explanation: "Apparent brightness falls off with distance." },
    ],
  },

  // ───────────────────────── 2. Stellar Life Cycles ─────────────────────────
  {
    slug: "stellar-life-cycles",
    title: "Stellar Life Cycles",
    tagline: "From nebula to remnant",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Lives of Stars", sub: "Born in gas clouds, stars burn for billions of years, then end as dwarfs, neutron stars, or black holes." } },
      { kind: "CONTEXT", title: "A galaxy of life stories", content: { markdown: "The Milky Way's hundreds of billions of stars are at every stage of life. By plotting them on the **Hertzsprung–Russell diagram** — luminosity versus temperature — astronomers turned a scatter of points into the biography of stars." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A star is a balance: **gravity** pulling in, **fusion pressure** pushing out. As long as it fuses hydrogen in its core, it sits on the **main sequence** — the diagonal band on the **HR diagram** where most stars (including the Sun) spend ~90% of their lives.\n\nThe decisive factor is **mass**:\n\n- **Low-mass stars** (like the Sun) swell into **red giants**, shed their outer layers, and leave a hot, dense **white dwarf** held up by electron degeneracy.\n- **High-mass stars** fuse heavier elements, then collapse and explode as a **supernova**, leaving a **neutron star** or, if massive enough, a **black hole**.\n\nMore massive stars are hotter and vastly more luminous — but burn out far faster, living millions of years rather than billions. The heavy elements they forge and scatter become the raw material for planets and life." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "The balance", problem: "What holds a stable star up against gravity?", steps: ["Fusion in the core.", "Its outward pressure."], answer: "Outward pressure from fusion." },
        { title: "Sun's fate", problem: "How will the Sun end?", steps: ["Low mass → red giant.", "Then white dwarf."], answer: "As a white dwarf." },
        { title: "Massive star's fate", problem: "What can a very massive star leave behind?", steps: ["Supernova.", "Neutron star or black hole."], answer: "A neutron star or black hole." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity vs fusion; mass decides the fate." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Trace stellar fates by mass." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: we are made of stardust", content: { markdown: "The Big Bang made essentially only hydrogen and helium. Every heavier element — the carbon in your cells, the oxygen you breathe, the iron in your blood, the calcium in your bones — was forged inside stars and flung into space by stellar winds and supernovae. The Sun and its planets condensed from gas already enriched by earlier stellar generations. In a precise, literal sense, you are made of stardust." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A star balances gravity against fusion pressure.", "Hydrogen-fusing stars lie on the main sequence of the HR diagram.", "Mass decides the fate.", "Low-mass: red giant → white dwarf.", "High-mass: supernova → neutron star or black hole; heavy elements are forged in stars."], formulas: [{ label: "Stellar balance", tex: "P_{\\text{fusion}} \\leftrightarrow F_{\\text{gravity}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A stable star balances gravity against:", options: ["magnetism", "outward fusion pressure", "rotation", "starlight"], answer: 1, explanation: "Fusion pressure pushes out against gravity's pull." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Most stars spend the majority of their lives on the:", options: ["red giant branch", "main sequence", "white dwarf stage", "supernova"], answer: 1, explanation: "About 90% of a star's life is on the main sequence." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The Sun will most likely end as a:", options: ["black hole", "white dwarf", "neutron star", "supernova remnant"], answer: 1, explanation: "Low-mass stars end as white dwarfs." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A very massive star may end its life as a:", options: ["white dwarf", "planet", "neutron star or black hole", "brown dwarf"], answer: 2, hint: "After a supernova.", explanation: "High-mass stars leave neutron stars or black holes." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "More massive stars live longer than low-mass stars.", answer: false, hint: "They burn fuel much faster.", explanation: "Massive stars are far more luminous and burn out faster." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The HR diagram plots luminosity against:", options: ["distance", "temperature", "age", "mass only"], answer: 1, hint: "Brightness vs color/temperature.", explanation: "Luminosity versus temperature." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Elements heavier than helium are forged inside stars.", answer: true, hint: "Stellar nucleosynthesis.", explanation: "Stars and supernovae create the heavy elements." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The single property that most determines a star's fate is its:", options: ["color", "mass", "name", "position"], answer: 1, hint: "Low vs high mass paths.", explanation: "Mass decides the evolutionary path and endpoint." },
    ],
  },

  // ───────────────────────── 3. The Hertzsprung–Russell Diagram ─────────────────────────
  {
    slug: "the-hr-diagram",
    title: "The Hertzsprung–Russell Diagram",
    tagline: "The single chart that organizes the stars",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "A Map of Every Star's Life", sub: "Plot stars by brightness and temperature and they fall into clear families — the periodic table of the cosmos." } },
      { kind: "CONTEXT", title: "Sorting a galaxy of stars", content: { markdown: "The Milky Way holds hundreds of billions of stars. Two astronomers, Hertzsprung and Russell, found that plotting **luminosity against temperature** reveals a hidden order — and, with it, a star's mass, age, and fate. It is the most important diagram in all of astrophysics." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **Hertzsprung–Russell (HR) diagram** plots **luminosity** (true brightness) on the vertical axis against **surface temperature** on the horizontal (running hot-to-cool, left-to-right). Stars are not scattered randomly — they cluster into groups:\n\n- **The main sequence** — a diagonal band from hot-bright (top-left) to cool-dim (bottom-right) where stars spend most of their lives fusing hydrogen. The Sun sits here, mid-band. A star's **position on the main sequence is set by its mass**: massive stars are hot, bright, blue, and short-lived; small stars are cool, dim, red, and long-lived.\n- **Red giants** — cool but luminous (top-right): huge, swollen, late-life stars.\n- **White dwarfs** — hot but faint (bottom-left): tiny, dense stellar corpses.\n\nA star **traces a path** across the diagram as it ages: born onto the main sequence, swelling into a red giant when its core hydrogen runs low, then ending as a white dwarf (or, if massive, exploding). Reading a star's spot on the HR diagram tells you what it is and where it is in its life." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "What the axes are", problem: "What two quantities does the HR diagram plot?", steps: ["Vertical: luminosity (true brightness).", "Horizontal: surface temperature."], answer: "Luminosity versus temperature." },
        { title: "Placing the Sun", problem: "Where does the Sun lie on the HR diagram?", steps: ["It fuses hydrogen in its core.", "It sits in the middle of the main sequence."], answer: "On the main sequence, mid-band." },
        { title: "Cool yet bright", problem: "A star is cool but very luminous. What is it?", steps: ["Low temperature, high luminosity is top-right.", "That region is the red giants."], answer: "A red giant." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Luminosity vs temperature; main sequence set by mass." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Read the families on the HR diagram." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: dating star clusters", content: { markdown: "Stars in a cluster all formed together, so an HR diagram of a cluster is a snapshot of one age. The most massive stars burn out first, peeling off the top of the main sequence. The point where the main sequence 'turns off' acts as a clock: the lower the turn-off, the older the cluster. This **main-sequence turn-off** method dates the oldest globular clusters at over 12 billion years — a check on the age of the universe itself." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The HR diagram plots luminosity versus surface temperature.", "Most stars lie on the main sequence (hydrogen fusion); position there is set by mass.", "Red giants are cool but luminous; white dwarfs are hot but faint.", "Stars trace paths across the diagram as they age.", "A cluster's main-sequence turn-off reveals its age."], formulas: [{ label: "HR axes", tex: "\\text{luminosity vs. temperature}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The HR diagram plots luminosity against:", options: ["distance", "surface temperature", "age", "spin"], answer: 1, difficulty: 2, explanation: "Luminosity versus surface temperature." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Most stars, including the Sun, lie on the main sequence.", answer: true, difficulty: 2, explanation: "The main sequence is where stars fuse hydrogen, which is most of their lives." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A star's position along the main sequence is determined mainly by its:", options: ["color name", "mass", "distance", "spin rate"], answer: 1, difficulty: 3, explanation: "Mass sets temperature, luminosity, and lifetime on the main sequence." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A hot but very faint star in the bottom-left of the HR diagram is a:", options: ["red giant", "white dwarf", "main-sequence star", "supergiant"], answer: 1, difficulty: 3, hint: "Tiny and dense.", explanation: "White dwarfs are hot but faint — small, dense stellar remnants." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Massive main-sequence stars are hotter, brighter, and shorter-lived than low-mass ones.", answer: true, difficulty: 3, hint: "They burn fuel fast.", explanation: "Greater mass means hotter, more luminous, and a much shorter life." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "As a Sun-like star runs low on core hydrogen, it moves on the HR diagram toward the:", options: ["white dwarf region first", "red giant region", "blue supergiant region", "center"], answer: 1, difficulty: 3, hint: "It swells and cools.", explanation: "It expands into a red giant before later becoming a white dwarf." },
    ],
  },

  // ───────────────────────── 4. The Cosmic Distance Ladder ─────────────────────────
  {
    slug: "cosmic-distance-ladder",
    title: "The Cosmic Distance Ladder",
    tagline: "How we measure the unreachable",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Surveying the Universe", sub: "No tape measure reaches a star — so astronomers built a ladder of clever methods, each calibrating the next." } },
      { kind: "CONTEXT", title: "How far is far?", content: { markdown: "Knowing a star's brightness or a galaxy's speed is useless without its **distance**. But distances in space are unimaginable. Astronomers solved it with a **distance ladder**: a sequence of techniques, each reaching farther and calibrated by the rung below." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Three key rungs:\n\n**1. Parallax (nearby stars).** As Earth orbits the Sun, nearby stars appear to shift slightly against distant ones — like a finger held up and viewed with each eye in turn. The bigger the shift, the closer the star. This is direct geometry, the ladder's foundation.\n\n**2. Standard candles (distant stars and galaxies).** Some objects have a known true **luminosity** $L$. Compare it to how bright they *appear*, $b$, and the distance follows from the **inverse-square law**:\n\n$$b = \\frac{L}{4\\pi d^2}.$$\n\nBrightness falls off as $1/d^2$, so a known $L$ plus a measured $b$ gives $d$. **Cepheid variable** stars (whose pulse period reveals their luminosity) and **Type Ia supernovae** (which all explode with nearly the same luminosity) are the great standard candles, reaching across billions of light-years.\n\n**3. Redshift (the farthest galaxies).** The expansion of the universe stretches light from distant galaxies toward longer (redder) wavelengths. Via **Hubble's law**, redshift gives recession speed and hence distance for the most remote objects.\n\nEach rung calibrates the next: parallax pins down nearby Cepheids, Cepheids calibrate supernovae, supernovae anchor the redshift scale. The whole ladder lets us map the universe out to its edge." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Why parallax shows distance", problem: "Why do nearer stars shift more over a year?", steps: ["Parallax is the apparent shift from Earth's orbit.", "Closer objects shift more."], answer: "A larger parallax means a nearer star." },
        { title: "Brightness and distance", problem: "If a standard candle is moved twice as far, how bright does it look?", steps: ["Brightness $\\propto 1/d^2$.", "Double $d$ gives $1/4$."], answer: "One quarter as bright." },
        { title: "Reaching the farthest", problem: "How are the most distant galaxies' distances found?", steps: ["Their light is redshifted by expansion.", "Hubble's law converts redshift to distance."], answer: "By redshift and Hubble's law." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Parallax → standard candles → redshift." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Climb the distance ladder." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Hubble tension", content: { markdown: "Measure the universe's expansion rate two ways — up the distance ladder (Cepheids and supernovae) versus from the early-universe imprint in the cosmic microwave background — and you get two values that **stubbornly disagree** by a few percent, far more than the error bars allow. This 'Hubble tension' is one of the hottest puzzles in cosmology. Either a measurement hides a subtle flaw, or new physics lurks in the dark sector. The humble distance ladder sits at the center of a possible revolution." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Parallax uses Earth's orbit to triangulate nearby stars (direct geometry).", "Standard candles have known luminosity; apparent brightness gives distance via the inverse-square law.", "Cepheids and Type Ia supernovae are the key standard candles.", "Redshift plus Hubble's law gives the distances of the farthest galaxies.", "Each rung calibrates the next, mapping the universe to its edge."], formulas: [{ label: "Inverse-square brightness", tex: "b = \\dfrac{L}{4\\pi d^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Parallax measures distance using:", options: ["a star's color", "the apparent shift of a star as Earth orbits the Sun", "a star's mass", "redshift"], answer: 1, difficulty: 3, explanation: "Nearby stars shift against the background as Earth moves — direct geometry." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A standard candle is an object whose true luminosity is known.", answer: true, difficulty: 2, explanation: "Knowing true luminosity lets apparent brightness reveal the distance." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Apparent brightness falls off with distance as:", options: ["1/d", "1/d²", "d", "d²"], answer: 1, difficulty: 3, explanation: "The inverse-square law: brightness ∝ 1/d²." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Ignoring constants, write apparent brightness $b$ in terms of luminosity $L$ and distance $d$ (use the inverse-square law). (Type like `L/d^2`.)", answer: { expr: "L/d^2", vars: ["L", "d"] }, difficulty: 3, hint: "Inverse square.", explanation: "$b \\propto L/d^2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If a standard candle is moved three times farther away, it appears how bright?", options: ["1/3 as bright", "1/6 as bright", "1/9 as bright", "3× as bright"], answer: 2, difficulty: 3, hint: "Square the factor.", explanation: "Brightness ∝ 1/d², so 3× distance gives 1/9 the brightness." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The distances of the most remote galaxies are found mainly from their:", options: ["parallax", "redshift (via Hubble's law)", "temperature", "spin"], answer: 1, difficulty: 3, hint: "Expansion stretches their light.", explanation: "Redshift plus Hubble's law gives distances beyond the reach of candles." },
    ],
  },
];
