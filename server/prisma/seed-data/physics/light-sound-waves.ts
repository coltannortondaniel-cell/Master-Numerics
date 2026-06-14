import type { LessonSeed } from "../types.js";

// Middle-school physics (grades 6–7), themed on the Space Telescope: waves,
// sound, light & optics, and the electromagnetic spectrum. Data-only sections.
export const lightSoundWavesLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: Waves Everywhere ─────────────────────────
  {
    slug: "waves-everywhere",
    title: "Waves Everywhere",
    tagline: "How energy travels without anything making the whole trip",
    estMinutes: 15,
    xpReward: 120,
    difficulty: 2,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "The Wave That Crosses an Ocean",
          sub: "A wave can travel thousands of kilometers, yet the water barely moves — it just bobs up and down. Waves carry energy, not stuff. That single idea explains sound, light, and earthquakes.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Drop a pebble in a pond and rings spread outward. Shout, and your voice reaches a friend. Flip on a lamp and light fills the room. Earthquakes shake whole cities from kilometers away.\n\nAll four are **waves** — and they share the same rules. A wave is how **energy travels from place to place without matter making the whole journey**. Learn the anatomy of a wave once, and you've started to understand sound, light, music, radio, and the telescopes that read the universe.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A wave carries energy, not matter.** Watch a duck on rippling water: the ripples race past, but the duck just bobs **up and down** in place. The water doesn't travel to shore — the *wave* does, passing its energy along.\n\n**Two types of wave:**\n\n- **Transverse** — the material wiggles *across* the direction the wave travels. Water ripples, a shaken rope, and light are transverse.\n- **Longitudinal** — the material squashes and stretches *along* the direction of travel. Sound is longitudinal: air gets pushed into compressions and pulled into gaps.\n\n**The anatomy of a wave:**\n\n- **Amplitude** — how big the wiggle is (the height of a crest). Bigger amplitude means **more energy** — a louder sound, a brighter light, a taller ocean wave.\n- **Wavelength** ($\\lambda$) — the distance from one crest to the next.\n- **Frequency** ($f$) — how many waves pass each second, measured in **hertz (Hz)**. High frequency means crests arrive quickly.\n- **Wave speed** ($v$) — how fast the wave travels.\n\n**The wave equation ties them together:**\n\n$$v = f \\times \\lambda$$\n\nSpeed equals frequency times wavelength. For a fixed speed, squeezing the wavelength shorter forces the frequency higher, and vice-versa. This one relationship runs through everything that follows: a high musical note is a high frequency; a short-wavelength light wave is high frequency too.\n\n**Waves bounce, bend, and blend.** They **reflect** off barriers (an echo), **refract** (bend) when they pass into a new material at an angle, and **interfere** when they overlap — crests adding to crests (louder/brighter) or crests filling troughs (silence/darkness). These behaviors are the fingerprints that tell scientists they're looking at a wave at all.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Using the wave equation",
              problem: "A wave on a rope has a frequency of 4 Hz and a wavelength of 0.5 m. How fast does it travel?",
              steps: [
                "Use $v = f \\times \\lambda$.",
                "$v = 4 \\times 0.5$.",
                "$= 2$ m/s.",
              ],
              answer: "2 m/s. Four waves per second, each half a meter long, march past at two meters every second.",
            },
            {
              title: "Bigger amplitude, more energy",
              problem: "Two ocean waves have the same wavelength, but wave A is twice as tall as wave B. Which carries more energy, and what changed?",
              steps: [
                "Amplitude is the height of the wave.",
                "Energy increases with amplitude.",
                "Wave A's greater height means greater amplitude.",
              ],
              answer: "Wave A carries more energy. Taller waves (greater amplitude) carry more energy — which is why a big wave hits harder than a ripple of the same length.",
            },
            {
              title: "The bobbing duck",
              problem: "A wave travels across a lake toward the shore. Does the water itself travel to the shore? What does?",
              steps: [
                "A floating duck shows the water's true motion: up and down in place.",
                "The crests move forward, but the water returns to where it started.",
                "What moves forward is the wave's energy.",
              ],
              answer: "The water mostly stays put, bobbing up and down; the wave (energy) is what travels to shore. Waves move energy, not matter.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Ride three quick waves." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems — catch the wave." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the wave that reads the Earth",
        content: {
          markdown:
            "When an earthquake strikes, it sends out **seismic waves** — both transverse and longitudinal — that race through the planet. Networks of sensors around the world catch them.\n\nHere's the clever part: different waves travel at different speeds and bend as they pass through materials of different density, exactly like light refracting. By timing when each wave arrives and how it bent, geologists have **mapped the inside of the Earth** — a place no drill will ever reach. That's how we know Earth has a solid inner core, a liquid outer core, and a thick rocky mantle: we read it in the waves.\n\nThe same trick, aimed at the sky instead of the ground, lets astronomers read the insides of stars from the way they ring and pulse — a field called *asteroseismology*.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "A wave carries energy from place to place without matter making the whole trip.",
            "Transverse waves wiggle across the travel direction (light); longitudinal waves squash along it (sound).",
            "Amplitude = wave height = energy; wavelength = crest-to-crest; frequency = waves per second (Hz).",
            "Wave speed: v = f × λ ties frequency and wavelength together.",
            "Waves reflect, refract, and interfere — their tell-tale behaviors.",
          ],
          formulas: [{ label: "Wave equation", tex: "v = f \\times \\lambda" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A wave mainly transfers…", options: ["matter", "energy", "temperature", "mass"], answer: 1, difficulty: 1, explanation: "Waves carry energy from place to place; the material itself mostly stays put." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The number of waves passing a point each second is the wave's…", options: ["amplitude", "wavelength", "frequency", "speed"], answer: 2, difficulty: 2, explanation: "Frequency counts waves per second, measured in hertz (Hz)." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Sound is a longitudinal wave, while light is a transverse wave.", answer: true, difficulty: 3, explanation: "Sound compresses and stretches the medium along its travel (longitudinal); light wiggles across its travel direction (transverse)." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A wave has a frequency of 5 Hz and a wavelength of 3 m. What is its speed, in m/s?", answer: { value: 15, tolerance: 0 }, difficulty: 2, hint: "v = f × λ.", explanation: "$v = 5 \\times 3 = 15$ m/s." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A wave travels at 20 m/s with a wavelength of 4 m. What is its frequency, in Hz?", answer: { value: 5, tolerance: 0 }, difficulty: 3, hint: "Rearrange v = f × λ to f = v ÷ λ.", explanation: "$f = v \\div \\lambda = 20 \\div 4 = 5$ Hz." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which change makes a wave carry more energy?", options: ["A longer wavelength", "A larger amplitude", "A slower speed", "A lower frequency"], answer: 1, difficulty: 2, hint: "Think wave height.", explanation: "Greater amplitude (a taller wave) means more energy — louder sound, brighter light, bigger ocean wave." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "When a wave keeps the same speed but its wavelength gets shorter, its frequency must get higher.", answer: true, difficulty: 3, hint: "v = f × λ with v fixed.", explanation: "If v is constant and λ shrinks, then f must rise so that f × λ still equals v." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An echo is an example of a wave…", options: ["refracting", "reflecting off a barrier", "being created", "disappearing"], answer: 1, difficulty: 2, hint: "Your shout comes back to you.", explanation: "An echo is sound reflecting off a surface and returning to your ears." },
    ],
  },

  // ───────────────────────── Lesson 2: Sound ─────────────────────────
  {
    slug: "sound-and-hearing",
    title: "Sound and Hearing",
    tagline: "Vibrations in the air — and the silence of space",
    estMinutes: 15,
    xpReward: 120,
    difficulty: 2,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "In Space, No One Can Hear You",
          sub: "A rocket launch is one of the loudest sounds on Earth — yet the same engines firing in deep space make no sound at all. Sound needs something to travel through, and space is empty.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Music, speech, a warning siren, a doctor's ultrasound, a bat hunting in the dark — all are **sound**. Sound is how we communicate, enjoy music, and even peer inside the human body and the ocean floor.\n\nAnd the rule that sound needs a **medium** explains one of the strangest facts about space: it's utterly silent. Master sound and you'll understand pitch, loudness, echoes, sonic booms, and why the movies get space battles completely wrong.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Sound is a vibration travelling through a material.** Pluck a guitar string and it shakes the air next to it, squeezing the air into **compressions** and **rarefactions** (gaps) that ripple outward — a longitudinal wave. Those pulses reach your eardrum, vibrate it, and your brain hears 'sound.'\n\n**Sound needs a medium.** Air, water, steel — anything with particles to pass the vibration along. With no particles, there's nothing to vibrate. **In the vacuum of space, sound cannot travel at all.** That's real: outside a spacecraft, the loudest engine is silent.\n\n**Two properties you hear:**\n\n- **Pitch** (how high or low) comes from **frequency**. Fast vibrations (high frequency) sound high, like a whistle; slow vibrations (low frequency) sound low, like a bass drum. Humans hear roughly 20 Hz to 20,000 Hz. Below that is *infrasound* (elephants, earthquakes); above is *ultrasound* (bats, medical scanners).\n- **Loudness** comes from **amplitude**. Bigger vibrations carry more energy and sound louder. Loudness is measured in **decibels (dB)**.\n\n**Sound has a speed — and it's not light's.** In air, sound travels about **343 m/s** (roughly a kilometer every three seconds). That's why you see lightning, then hear thunder seconds later: light arrives almost instantly, sound lags behind. Sound actually travels **faster in denser, stiffer materials** — quicker in water than air, and faster still in steel. Put your ear to a rail and you'll hear a far-off train through the metal before it reaches you through the air.\n\n**Beat the speed of sound and you get a sonic boom.** When a jet flies faster than 343 m/s, it outruns its own sound waves, which pile up into a shock wave heard on the ground as a thunderous crack.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "How far is the storm?",
              problem: "You see a lightning flash and hear the thunder 6 seconds later. Sound travels about 343 m/s. Roughly how far away was the strike?",
              steps: [
                "Light arrives almost instantly, so the 6 s is sound's travel time.",
                "Distance = speed × time = $343 \\times 6$.",
                "$\\approx 2058$ m, about 2 km.",
              ],
              answer: "About 2 kilometers away. A handy rule: every 3 seconds of delay is roughly 1 km.",
            },
            {
              title: "High note or low note?",
              problem: "A singer raises the frequency of the note she's holding. Does the pitch go up or down, and does the speed of the sound in the room change?",
              steps: [
                "Pitch is set by frequency: higher frequency, higher pitch.",
                "Raising the frequency raises the pitch.",
                "Sound speed depends on the medium (the air), not the note — so it stays about 343 m/s.",
              ],
              answer: "The pitch goes up; the speed of sound stays the same. In a fixed medium, only frequency and wavelength trade off (v = f λ).",
            },
            {
              title: "Silence in space",
              problem: "A movie shows a spaceship exploding with a huge BOOM. What's wrong with this, physically?",
              steps: [
                "Sound is a vibration that needs particles to travel through.",
                "Space is a near-perfect vacuum — almost no particles.",
                "With no medium, the vibration can't propagate.",
              ],
              answer: "There would be no sound. In the vacuum of space, explosions are silent — the movie boom is artistic license, not physics.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Listen up — three questions." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems. Make some noise." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: seeing with sound",
        content: {
          markdown:
            "Bats and dolphins hunt in darkness using **echolocation**: they emit high-frequency squeaks and listen for the echoes bouncing back, building a sound-picture of their surroundings precise enough to snag a single insect mid-flight.\n\nHumans copied the trick. **Sonar** maps the ocean floor and finds submarines by timing sound echoes through water. **Ultrasound** scanners send sound far above human hearing into the body and reconstruct images of a beating heart — or a baby — from the echoes, with no radiation at all.\n\nThe same idea even helps the blind: some people learn to click their tongues and read the returning echoes to navigate. Sound, it turns out, is a way of seeing.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Sound is a longitudinal vibration travelling through a medium (it can't travel in a vacuum).",
            "Pitch comes from frequency; loudness comes from amplitude (measured in decibels).",
            "Humans hear roughly 20 Hz–20,000 Hz; below is infrasound, above is ultrasound.",
            "Sound travels about 343 m/s in air — faster in water and steel — much slower than light.",
            "The flash-to-thunder delay measures distance: about 1 km per 3 seconds.",
          ],
          formulas: [{ label: "Distance from delay", tex: "d = v_{sound} \\times t \\quad (v_{sound} \\approx 343\\ \\text{m/s})" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Sound can travel through the vacuum of space.", answer: false, difficulty: 1, explanation: "Sound needs a medium (particles to vibrate). Space is nearly empty, so it carries no sound." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The pitch of a sound (how high or low it is) is determined by its…", options: ["amplitude", "frequency", "speed", "loudness"], answer: 1, difficulty: 2, explanation: "Higher frequency means higher pitch; lower frequency means lower pitch." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A louder sound has a greater…", options: ["frequency", "amplitude", "speed", "wavelength"], answer: 1, difficulty: 2, explanation: "Loudness comes from amplitude — bigger vibrations carry more energy and sound louder." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Sound travels about 343 m/s in air. How far (in meters) does it travel in 5 seconds? Round to the nearest meter.", answer: { value: 1715, tolerance: 1 }, difficulty: 2, hint: "distance = speed × time.", explanation: "$d = 343 \\times 5 = 1715$ m." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "You see lightning and hear thunder 9 seconds later. Roughly how far away was it (use ~1 km per 3 s)?", options: ["About 1 km", "About 3 km", "About 9 km", "About 27 km"], answer: 1, difficulty: 3, hint: "Divide the delay by 3.", explanation: "9 s ÷ 3 s per km ≈ 3 km away." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Sound generally travels faster through steel than through air.", answer: true, difficulty: 3, hint: "Denser, stiffer materials pass vibrations faster.", explanation: "Sound moves faster in stiffer, denser media — much faster in steel than in air." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why do you see fireworks burst before you hear the bang?", options: ["Your eyes react faster than your ears", "Light travels far faster than sound", "Sound is created later", "The bang is quiet"], answer: 1, difficulty: 2, hint: "Compare the speeds of light and sound.", explanation: "Light reaches you almost instantly; sound lags at ~343 m/s, so the bang arrives after the flash." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A jet flying faster than the speed of sound produces…", options: ["total silence", "a sonic boom", "a rainbow", "no drag"], answer: 1, difficulty: 3, hint: "It outruns its own sound waves.", explanation: "Outrunning its sound waves piles them into a shock wave heard on the ground as a sonic boom." },
    ],
  },

  // ───────────────────────── Lesson 3: Light & Optics ─────────────────────────
  {
    slug: "light-and-optics",
    title: "Light and Optics",
    tagline: "How light travels, bounces, and bends to make images",
    estMinutes: 16,
    xpReward: 130,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "The Fastest Thing There Is",
          sub: "Light crosses a room in a few billionths of a second and the gap from the Sun in eight minutes. Bend it with a curved piece of glass and you can capture a galaxy.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Almost everything you know about the world arrives as **light** entering your eyes. Light lets you see, plants eat, cameras capture, and telescopes reach across the universe to look billions of years into the past.\n\nUnderstanding how light **travels in straight lines, reflects, and refracts** explains mirrors, shadows, rainbows, lenses, eyeglasses, cameras, microscopes, and the great space telescopes. It's the physics of seeing itself.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Light travels in straight lines** (called rays) until something stops or turns it. That's why a blocked light makes a sharp **shadow**, and why you can't see around corners.\n\n**Light is incredibly fast:** about **300,000,000 m/s** in space — fast enough to circle the Earth 7 times in one second. Nothing travels faster. Because the speed is finite, the light from distant stars is old: we see them as they were long ago.\n\n**Three things light does when it meets a surface:**\n\n- **Reflection** — it bounces. A mirror reflects so cleanly you see an image. The rule: the angle coming in equals the angle going out. Rough surfaces scatter light every which way, which is how you see ordinary objects.\n- **Refraction** — it **bends** when it passes from one material into another (air into water, say) because it changes speed. This is why a straw in a glass looks broken at the surface, and why a pool looks shallower than it is.\n- **Absorption** — it's soaked up and turned to heat. A black shirt absorbs most light (and warms up); a white shirt reflects most.\n\n**Lenses bend light to form images.** A lens is shaped glass that refracts light in a controlled way:\n\n- A **convex** (bulging) lens bends parallel light rays together to a **focal point**. It can magnify and is the heart of magnifying glasses, cameras, the human eye, and telescopes.\n- A **concave** (hollow) lens spreads rays apart.\n\n**Your eye is an optical instrument.** Its lens focuses light onto the retina at the back. If the focus lands a bit short or long, the world looks blurry — and **eyeglasses add a lens** to fix exactly where the light converges. **Telescopes and microscopes** use the same lens physics, just scaled to gather faint, distant light or magnify the tiny.\n\n**Curved mirrors do it too.** The biggest telescopes don't use lenses at all — they use giant **curved mirrors** to collect and focus starlight, because a huge mirror is far easier to build than a huge lens.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "The broken straw",
              problem: "A straw in a glass of water looks bent or broken at the water's surface. Which behavior of light explains this?",
              steps: [
                "Light from the underwater part of the straw passes from water into air.",
                "Crossing that boundary, the light changes speed and bends — refraction.",
                "Your brain assumes light travelled straight, so the straw appears displaced.",
              ],
              answer: "Refraction. Light bends as it leaves the water, shifting the straw's apparent position so it looks broken at the surface.",
            },
            {
              title: "Why telescopes are big",
              problem: "Astronomers always want bigger telescope mirrors. What is the main advantage of a larger mirror (or lens)?",
              steps: [
                "A telescope's job is to gather light from faint, distant objects.",
                "A bigger mirror has more area to catch light.",
                "More light gathered means fainter, farther objects become visible.",
              ],
              answer: "A larger mirror collects more light, revealing fainter and more distant objects — which is why observatories build ever-bigger mirrors.",
            },
            {
              title: "Light from the past",
              problem: "A star is 100 light-years away. What does it mean to say we 'see it as it was 100 years ago'?",
              steps: [
                "Light travels fast but not instantly.",
                "Light from that star took 100 years to reach us.",
                "So the image arriving now left the star 100 years ago.",
              ],
              answer: "We're seeing 100-year-old light. Looking far into space is literally looking back in time — telescopes are time machines.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — focus up." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems to bring into focus." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the telescope that unbent its own mistake",
        content: {
          markdown:
            "When the **Hubble Space Telescope** launched in 1990, its images came back blurry. Engineers were horrified: the main mirror had been ground to the wrong shape by an amount thinner than a human hair — a flaw in its curvature that smeared every star.\n\nBecause the error was precisely known, opticians could design corrective optics — in effect, **eyeglasses for a telescope**. In 1993, astronauts flew up and installed them. Hubble snapped into perfect focus and went on to take some of the most famous images in history.\n\nThe whole rescue was pure optics: a curvature error in one mirror, cancelled by a matching curvature in another. The same physics that fixes nearsighted eyes fixed humanity's greatest telescope.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Light travels in straight-line rays at about 300,000,000 m/s — the fastest speed there is.",
            "At a surface, light can reflect (bounce), refract (bend when changing speed), or be absorbed (become heat).",
            "Refraction explains the 'broken' straw and why pools look shallow.",
            "Convex lenses focus light to a point and magnify; the eye, cameras, and telescopes all rely on this.",
            "Big telescopes use large curved mirrors to gather more light and reveal fainter, farther objects.",
          ],
          formulas: [{ label: "Speed of light", tex: "c \\approx 3 \\times 10^{8}\\ \\text{m/s}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Light normally travels in…", options: ["curvy spirals", "straight lines until something turns it", "random directions", "circles"], answer: 1, difficulty: 1, explanation: "Light travels in straight-line rays, which is why blocked light makes a sharp shadow." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Light bending as it passes from air into water is called…", options: ["reflection", "refraction", "absorption", "vibration"], answer: 1, difficulty: 2, explanation: "Refraction is the bending of light when it changes speed crossing into a new material." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A black object stays cool because it reflects most light that hits it.", answer: false, difficulty: 2, explanation: "Black objects absorb most light and warm up. White objects reflect most light and stay cooler." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does a straw look broken where it enters a glass of water?", options: ["The water cuts it", "Light refracts (bends) as it leaves the water", "The straw really bends", "Reflection from the glass"], answer: 1, difficulty: 2, hint: "Light changes speed at the surface.", explanation: "Light from the submerged part bends as it exits the water, shifting the straw's apparent position." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A convex (bulging) lens takes parallel light rays and…", options: ["spreads them apart", "brings them together at a focal point", "absorbs them", "reflects them backward"], answer: 1, difficulty: 3, hint: "It's the lens in a magnifier and a camera.", explanation: "A convex lens converges parallel rays to a focal point, which lets it focus and magnify images." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Because light has a finite speed, looking at distant stars means seeing them as they were in the past.", answer: true, difficulty: 3, hint: "Light takes time to arrive.", explanation: "Light from far away left long ago, so telescopes show us the universe's past." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The main reason astronomers build telescopes with very large mirrors is to…", options: ["make them heavier", "gather more light to see fainter objects", "reflect sound", "use less glass"], answer: 1, difficulty: 2, hint: "More area, more light.", explanation: "A bigger mirror collects more light, revealing fainter and more distant objects." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Eyeglasses correct blurry vision by…", options: ["adding a lens that adjusts where light focuses in the eye", "making the eye bigger", "removing light", "reflecting images"], answer: 0, difficulty: 3, hint: "It's all about the focal point landing on the retina.", explanation: "Corrective lenses bend incoming light so it focuses exactly on the retina, sharpening the image." },
    ],
  },

  // ───────────────────────── Lesson 4: The EM Spectrum ─────────────────────────
  {
    slug: "electromagnetic-spectrum",
    title: "The Electromagnetic Spectrum and Color",
    tagline: "Visible light is one thin slice of a much bigger rainbow",
    estMinutes: 16,
    xpReward: 140,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "The Colors You Can't See",
          sub: "Radio, microwaves, infrared, X-rays, gamma rays — all are 'light', just at wavelengths your eyes can't catch. Telescopes built to see them have revealed an invisible universe.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Your phone, the microwave oven, the TV remote, a hospital X-ray, the warmth of a fire — every one of these uses **light your eyes cannot see**. Visible light is just a narrow band of a vast family of waves called the **electromagnetic spectrum**.\n\nLearning the spectrum explains color, why sunscreen matters, how Wi-Fi works, how night-vision cameras see heat, and why astronomers build separate telescopes for radio, infrared, and X-rays. It's the user manual for light in all its forms.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**All these waves are the same thing — electromagnetic waves — differing only in wavelength and frequency.** They all travel at the speed of light. Lined up from longest wavelength (lowest frequency, lowest energy) to shortest (highest frequency, highest energy):\n\n**Radio → Microwave → Infrared → Visible → Ultraviolet → X-ray → Gamma ray**\n\n- **Radio** — longest waves; carry broadcast, Wi-Fi, and signals from spacecraft.\n- **Microwave** — heat water in food; also carry phone and radar signals.\n- **Infrared (IR)** — felt as **heat**; TV remotes and night-vision cameras use it.\n- **Visible light** — the thin slice your eyes detect, from **red** (longest visible wavelength) through orange, yellow, green, blue, to **violet** (shortest).\n- **Ultraviolet (UV)** — just past violet; gives sunburns. The ozone layer blocks most.\n- **X-rays** — short, energetic; pass through soft tissue but not bone, so we image skeletons.\n- **Gamma rays** — shortest, most energetic; from nuclear reactions and the most violent events in space.\n\n**Shorter wavelength means higher frequency and more energy.** That's why gamma rays and X-rays are dangerous (high energy) while radio waves pass through you harmlessly.\n\n**Color is your eye reading visible wavelengths.** An object looks red because it **reflects red wavelengths** and absorbs the rest; a leaf looks green because it reflects green. A black object absorbs nearly all visible light; a white one reflects nearly all. Mixing the colors of light back together gives white — which is why sunlight, containing them all, looks white.\n\n**The invisible universe.** Earth's atmosphere blocks most UV, X-rays, and gamma rays — good for life, hard for astronomy. So we launch space telescopes that see in **infrared** (peering through dust to newborn stars), **X-ray** (catching gas swirling into black holes), and more. Each band of the spectrum reveals things the others can't. Combine them and you get the full picture of the cosmos.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Ranking by energy",
              problem: "Which carries more energy per wave: a radio wave or an X-ray? How do you know?",
              steps: [
                "Energy rises with frequency (and falls with wavelength).",
                "Radio waves have very long wavelengths (low frequency, low energy).",
                "X-rays have very short wavelengths (high frequency, high energy).",
              ],
              answer: "X-rays carry far more energy — which is exactly why X-rays can be hazardous and radio waves are harmless to pass through.",
            },
            {
              title: "Why a leaf looks green",
              problem: "White sunlight (all colors) falls on a green leaf. Why does the leaf look green?",
              steps: [
                "White light contains every visible color.",
                "The leaf absorbs most colors but reflects green.",
                "Only the reflected green reaches your eyes.",
              ],
              answer: "The leaf reflects green wavelengths and absorbs the others, so green is what you see. Color is the light an object reflects.",
            },
            {
              title: "Seeing through dust",
              problem: "Newborn stars hide inside thick clouds of dust that block visible light. Which kind of telescope can see them, and why?",
              steps: [
                "Visible light is scattered and blocked by dust.",
                "Longer-wavelength infrared passes through dust more easily.",
                "An infrared telescope can detect the warm glow of the hidden stars.",
              ],
              answer: "An infrared telescope. Its longer waves slip through the dust, revealing stars being born — which visible-light telescopes can't see.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions across the spectrum." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems to finish the Space Telescope." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the accidental discovery of the Big Bang's glow",
        content: {
          markdown:
            "In 1964, two engineers, **Penzias and Wilson**, were testing a sensitive radio antenna in New Jersey. No matter where they pointed it, a faint hiss of microwave static remained. They checked everything — even scrubbed out pigeon droppings from the antenna. The hiss stayed.\n\nIt turned out they were hearing the **cosmic microwave background**: the faint afterglow of the Big Bang itself, stretched by the universe's expansion from blinding light into a whisper of microwaves, arriving from every direction in the sky. They had accidentally detected the leftover heat of creation, 13.8 billion years old.\n\nThe discovery won the Nobel Prize and is among the strongest evidence that the universe began in a hot, dense state. A reminder that every band of the spectrum has a story to tell — even the static.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma rays are all electromagnetic waves at different wavelengths.",
            "Shorter wavelength means higher frequency and more energy (gamma/X-ray energetic; radio gentle).",
            "Visible light is a thin slice, red (long) through violet (short).",
            "Color is the visible light an object reflects; white light contains all colors.",
            "Different telescopes (infrared, X-ray, radio) reveal parts of the universe visible light can't show.",
          ],
          formulas: [{ label: "Order of the spectrum", tex: "\\text{radio} \\to \\text{micro} \\to \\text{IR} \\to \\text{visible} \\to \\text{UV} \\to \\text{X} \\to \\gamma" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Visible light is…", options: ["the only kind of light there is", "one small band of the electromagnetic spectrum", "a type of sound", "faster than radio waves"], answer: 1, difficulty: 2, explanation: "Visible light is just the narrow slice our eyes detect; the spectrum extends far beyond it in both directions." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which kind of electromagnetic wave do we feel as heat and use in TV remotes?", options: ["X-rays", "Infrared", "Radio", "Gamma rays"], answer: 1, difficulty: 2, explanation: "Infrared radiation is felt as heat and used by remotes and night-vision cameras." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Shorter-wavelength electromagnetic waves carry more energy.", answer: true, difficulty: 2, explanation: "Shorter wavelength means higher frequency and more energy — which is why X-rays and gamma rays are energetic and hazardous." },
      { scope: "PRACTICE", kind: "ORDER", prompt: "Order these from LONGEST wavelength to SHORTEST.", options: ["Radio", "Infrared", "Visible light", "X-rays"], answer: [], difficulty: 3, hint: "Radio is the longest; X-rays are very short.", explanation: "Longest to shortest: radio → infrared → visible → X-rays, matching increasing frequency and energy." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A red apple looks red because it…", options: ["makes red light", "reflects red wavelengths and absorbs the rest", "is hot", "absorbs only red light"], answer: 1, difficulty: 3, hint: "Color is the light that bounces back to you.", explanation: "The apple reflects red wavelengths to your eyes and absorbs the others, so it appears red." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is the most energetic and potentially dangerous?", options: ["Radio waves", "Microwaves", "Visible light", "Gamma rays"], answer: 3, difficulty: 2, hint: "Shortest wavelength wins.", explanation: "Gamma rays have the shortest wavelength and highest energy, making them the most penetrating and hazardous." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Astronomers use infrared telescopes partly because infrared light can pass through dust clouds that block visible light.", answer: true, difficulty: 3, hint: "Longer waves slip past dust.", explanation: "Infrared's longer wavelengths penetrate dust, revealing newborn stars hidden from visible-light telescopes." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Mixing all the colors of visible light back together produces…", options: ["black", "white light", "infrared", "no light"], answer: 1, difficulty: 2, hint: "Think of what sunlight contains.", explanation: "All the visible colors combined make white light — which is why sunlight, containing them all, looks white." },
    ],
  },
];
