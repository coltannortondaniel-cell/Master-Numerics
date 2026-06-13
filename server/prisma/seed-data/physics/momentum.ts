import type { LessonSeed } from "../types.js";

/**
 * Classical Mechanics — Momentum & Collisions (grades 11–12 / intro university).
 * Momentum and impulse, conservation of momentum, inelastic and elastic
 * collisions, and the center of mass. Mounted on the Oort Cloud stop.
 */
export const momentumLessons: LessonSeed[] = [
  // ───────────────────────── 1. Momentum & Impulse ─────────────────────────
  {
    slug: "momentum-and-impulse",
    title: "Momentum & Impulse",
    tagline: "Mass in motion, and how to change it",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Mass in Motion", sub: "A slow truck and a fast bullet can be equally hard to stop. Momentum captures the 'quantity of motion', and impulse is how you change it." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Why do airbags, crumple zones, and follow-through in sports all work? They all manage **impulse** — stretching out the time over which momentum changes to soften the force. Momentum is also the conserved quantity that lets us analyse collisions and rocket flight where energy methods alone fall short." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Momentum** is mass times velocity:\n\n$$\\vec p = m\\vec v.$$\n\nIt's a **vector** (it has direction), measured in $\\text{kg·m/s}$. A heavy slow object and a light fast one can carry the same momentum.\n\n**Impulse** is what changes momentum. From Newton's second law in its original form, $\\vec F = \\dfrac{d\\vec p}{dt}$, a force acting over a time interval delivers an **impulse**:\n\n$$\\vec J = \\vec F\\,\\Delta t = \\Delta \\vec p.$$\n\nThis is the **impulse–momentum theorem**: the impulse on an object equals its change in momentum. Impulse is measured in $\\text{N·s}$, which is the same as $\\text{kg·m/s}$.\n\nThe practical punchline: to produce a given change in momentum (say, stopping a moving car), a **longer** contact time means a **smaller** force. An airbag increases $\\Delta t$, so the force on you, $F = \\Delta p / \\Delta t$, drops. Same $\\Delta p$, gentler ride." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Momentum of a car", problem: "Find the momentum of a $1000\\,\\text{kg}$ car moving at $20\\,\\text{m/s}$.", steps: ["$p = mv = 1000 \\times 20$.", "$= 20{,}000\\,\\text{kg·m/s}$."], answer: "$p = 20{,}000\\,\\text{kg·m/s}$." },
        { title: "Impulse from a force", problem: "A $50\\,\\text{N}$ force pushes for $4.0\\,\\text{s}$. Find the impulse.", steps: ["$J = F\\,\\Delta t = 50 \\times 4.0$.", "$= 200\\,\\text{N·s}$."], answer: "$J = 200\\,\\text{N·s}$." },
        { title: "Change in momentum", problem: "A $0.5\\,\\text{kg}$ ball speeds up from rest to $4.0\\,\\text{m/s}$. Find its change in momentum.", steps: ["$\\Delta p = m\\,\\Delta v = 0.5 \\times (4.0 - 0)$.", "$= 2.0\\,\\text{kg·m/s}$."], answer: "$\\Delta p = 2.0\\,\\text{kg·m/s}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "E13h1E_Pc00", title: "Introduction to Momentum" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Momentum, impulse, and their units." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $p = mv$ and $J = F\\Delta t = \\Delta p$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why momentum, not just energy?", content: { markdown: "Both energy and momentum are conserved, so why have two? Because they capture **different** things. Momentum is a **vector** and is conserved in *every* collision, even when kinetic energy is lost to heat. Kinetic energy is a **scalar** and is only conserved in *elastic* collisions. Having both lets you solve for two unknowns (two final velocities) in an elastic collision. Momentum also handles direction — head-on versus glancing — which energy alone can't. The two laws are partners, not rivals." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Momentum $\\vec p = m\\vec v$ — a vector, in $\\text{kg·m/s}$.", "Impulse $\\vec J = \\vec F\\Delta t = \\Delta\\vec p$ (impulse–momentum theorem).", "Impulse is measured in $\\text{N·s} = \\text{kg·m/s}$.", "For a fixed $\\Delta p$, longer contact time means smaller force — the airbag principle."], formulas: [{ label: "Momentum", tex: "\\vec p = m\\vec v" }, { label: "Impulse", tex: "\\vec J = \\vec F\\,\\Delta t = \\Delta\\vec p" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Momentum is defined as:", options: ["$mv$", "$ma$", "$\\tfrac12 mv^2$", "$Fd$"], answer: 0, explanation: "$p = mv$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Momentum of a $1000\\,\\text{kg}$ car at $20\\,\\text{m/s}$, in $\\text{kg·m/s}$?", answer: { value: 20000, tolerance: 0 }, explanation: "$1000 \\times 20 = 20{,}000$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Impulse equals the change in momentum.", answer: true, explanation: "$J = \\Delta p$, the impulse–momentum theorem." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Momentum of a $2.0\\,\\text{kg}$ ball at $5.0\\,\\text{m/s}$, in $\\text{kg·m/s}$?", answer: { value: 10, tolerance: 0 }, hint: "$p = mv$.", explanation: "$2 \\times 5 = 10$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Impulse of a $50\\,\\text{N}$ force acting for $4.0\\,\\text{s}$, in $\\text{N·s}$?", answer: { value: 200, tolerance: 0 }, hint: "$J = F\\Delta t$.", explanation: "$50 \\times 4 = 200$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $0.5\\,\\text{kg}$ ball goes from rest to $4.0\\,\\text{m/s}$. Change in momentum, in $\\text{kg·m/s}$?", answer: { value: 2, tolerance: 0 }, hint: "$\\Delta p = m\\Delta v$.", explanation: "$0.5 \\times 4 = 2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The SI unit of momentum is:", options: ["$\\text{kg·m/s}$", "$\\text{N}$", "$\\text{J}$", "$\\text{W}$"], answer: 0, hint: "Mass times velocity.", explanation: "$\\text{kg·m/s}$ (equal to $\\text{N·s}$)." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "An impulse of $12\\,\\text{N·s}$ acts on a $3.0\\,\\text{kg}$ object at rest. Its final speed, in m/s? (Use $J = mv$.)", answer: { value: 4, tolerance: 0 }, hint: "$v = J/m$.", explanation: "$12/3 = 4\\,\\text{m/s}$." },
    ],
  },

  // ──────────────────── 2. Conservation of Momentum ────────────────────
  {
    slug: "conservation-of-momentum",
    title: "Conservation of Momentum",
    tagline: "Total momentum never changes without an outside push",
    estMinutes: 15,
    xpReward: 180,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Total Is Constant", sub: "In any interaction with no outside force, the momentum lost by one object is exactly gained by the other." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Conservation of momentum is how rockets fly, how guns recoil, and how we analyse every car crash. It follows directly from Newton's third law: the forces two objects exert on each other are equal and opposite, so their momentum changes cancel exactly." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Conservation of momentum:** if no net *external* force acts on a system, its **total momentum stays constant**:\n\n$$\\vec p_{i,\\text{total}} = \\vec p_{f,\\text{total}}.$$\n\nFor two objects interacting (a collision, an explosion, a push-off):\n\n$$m_1 \\vec v_{1i} + m_2 \\vec v_{2i} = m_1 \\vec v_{1f} + m_2 \\vec v_{2f}.$$\n\nWhy is it true? During the interaction, object 1 pushes on object 2 and (Newton's third law) object 2 pushes back equally and oppositely. These internal forces give equal-and-opposite impulses, so whatever momentum one object gains, the other loses. The **total** can't change.\n\nConsequences you can see everywhere:\n\n- **Recoil.** Fire a bullet forward and the gun must move backward so the total stays the same (it started at zero).\n- **Push-off.** Two skaters at rest shove apart; they fly in opposite directions with equal and opposite momenta.\n- **Sticking together.** Two carts that couple move off with the combined momentum they had before.\n\nMomentum is a vector, so **directions matter** — choose a positive direction and give opposing velocities opposite signs." } },
      { kind: "SIMULATION", title: "Try it: the collision track", content: { simId: "collision", intro: "Set masses and speeds and launch the carts. Whatever you choose, the 'momentum before' and 'momentum now' readouts always match — total momentum is conserved." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Coupling carts", problem: "A $2.0\\,\\text{kg}$ cart at $3.0\\,\\text{m/s}$ hits a $1.0\\,\\text{kg}$ cart at rest and they stick together. Find their common speed.", steps: ["Total momentum before: $2.0\\times3.0 + 1.0\\times0 = 6.0\\,\\text{kg·m/s}$.", "After, combined mass is $3.0\\,\\text{kg}$ at speed $v$.", "$3.0\\,v = 6.0 \\Rightarrow v = 2.0\\,\\text{m/s}$."], answer: "$v = 2.0\\,\\text{m/s}$." },
        { title: "Recoil of a skater", problem: "A $50\\,\\text{kg}$ skater (at rest) throws a $2.0\\,\\text{kg}$ ball at $5.0\\,\\text{m/s}$. Find the skater's recoil speed.", steps: ["Total momentum starts at zero.", "Ball: $2.0\\times5.0 = 10\\,\\text{kg·m/s}$ forward.", "Skater must carry $10\\,\\text{kg·m/s}$ backward: $50\\,v = 10$."], answer: "$v = 0.20\\,\\text{m/s}$ backward." },
        { title: "Why the gun kicks", problem: "A bullet leaves a rifle moving forward. Which way does the rifle move, and why?", steps: ["The system started with zero momentum.", "The bullet now carries forward momentum.", "The rifle must carry equal backward momentum to keep the total zero."], answer: "Backward — that's recoil, required by momentum conservation." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "0qkmlhKfBPo", title: "Conservation of Momentum" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Total momentum before equals total after." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Set total momentum before equal to total after." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: how rockets really work", content: { markdown: "A rocket has nothing to push against in space — it flies by **throwing mass backward**. Each second it hurls hot exhaust out the back, and to keep total momentum constant, the rocket gains forward momentum. This leads to the **Tsiolkovsky rocket equation**, $\\Delta v = v_e \\ln\\dfrac{m_0}{m_f}$, which says your change in speed depends on the exhaust speed $v_e$ and the *ratio* of starting to ending mass. It's why rockets are mostly fuel — and why getting to orbit is so hard." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["With no external force, total momentum is conserved.", "$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$.", "It follows from Newton's third law (equal, opposite internal forces).", "Recoil, push-offs, and rockets are all momentum conservation.", "Momentum is a vector — track directions with signs."], formulas: [{ label: "Conservation", tex: "\\sum \\vec p_i = \\sum \\vec p_f" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "If no external force acts, total momentum is conserved.", answer: true, explanation: "That is conservation of momentum." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "When a gun fires a bullet forward, the gun:", options: ["recoils backward", "stays still", "moves forward", "speeds up"], answer: 0, explanation: "Recoil keeps total momentum constant." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $2.0\\,\\text{kg}$ cart at $3.0\\,\\text{m/s}$ hits a $1.0\\,\\text{kg}$ cart at rest and they stick. Combined speed in m/s?", answer: { value: 2, tolerance: 0 }, explanation: "$6.0/3.0 = 2.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Total momentum before a collision is $12\\,\\text{kg·m/s}$ with no external force. Total momentum after, in $\\text{kg·m/s}$?", answer: { value: 12, tolerance: 0 }, hint: "Conserved.", explanation: "It stays $12\\,\\text{kg·m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $3.0\\,\\text{kg}$ cart at $4.0\\,\\text{m/s}$ hits a $1.0\\,\\text{kg}$ cart at rest; they stick. Combined speed in m/s?", answer: { value: 3, tolerance: 0 }, hint: "$p/m_{tot}$.", explanation: "$12/4 = 3\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $1.0\\,\\text{kg}$ ball at $6.0\\,\\text{m/s}$ strikes a $2.0\\,\\text{kg}$ ball at rest and they stick. Combined speed in m/s?", answer: { value: 2, tolerance: 0 }, hint: "$6/3$.", explanation: "$6.0/3.0 = 2.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Two ice skaters start at rest and push apart. Their total momentum afterward is:", options: ["zero", "very large", "to the right", "undefined"], answer: 0, hint: "What was it before?", explanation: "It started at zero and stays zero." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $50\\,\\text{kg}$ skater at rest throws a $2.0\\,\\text{kg}$ ball at $5.0\\,\\text{m/s}$. Skater's recoil speed in m/s?", answer: { value: 0.2, tolerance: 0.01 }, hint: "$50v = 2\\times5$.", explanation: "$10/50 = 0.20\\,\\text{m/s}$." },
    ],
  },

  // ───────────────────────── 3. Inelastic Collisions ─────────────────────────
  {
    slug: "inelastic-collisions",
    title: "Inelastic Collisions",
    tagline: "When objects stick and energy is lost",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Sticking Together", sub: "In a perfectly inelastic collision, objects lock together. Momentum survives, but kinetic energy does not." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Most real-world crashes are inelastic: cars crumple, clay splats, train cars couple. Understanding that **momentum is conserved while kinetic energy is lost** lets us predict the wreckage's motion and quantify how much energy went into damage and heat." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In a **perfectly inelastic collision**, the objects **stick together** and move as one afterward. Momentum conservation gives their common final velocity directly:\n\n$$m_1 v_1 + m_2 v_2 = (m_1 + m_2)\\,v_f \\;\\Rightarrow\\; v_f = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}.$$\n\nThe defining feature: **kinetic energy is *not* conserved.** Some of it is converted into heat, sound, and permanent deformation as the objects crush and stick. Momentum is *always* conserved (no external force), but kinetic energy drops:\n\n$$K_f < K_i.$$\n\nThe \"lost\" kinetic energy hasn't vanished — by conservation of *total* energy it became heat and deformation. (A collision in which the objects don't stick but still lose some kinetic energy is just *inelastic*; the maximum possible energy loss happens when they stick — *perfectly* inelastic.)" } },
      { kind: "SIMULATION", title: "Try it: make them stick", content: { simId: "collision", intro: "Choose 'Stick together', set the carts moving, and launch. Momentum before equals momentum after — but compare the speeds and you'll see kinetic energy has dropped." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Two carts couple", problem: "A $2.0\\,\\text{kg}$ cart at $4.0\\,\\text{m/s}$ strikes a $2.0\\,\\text{kg}$ cart at rest; they stick. Find the final speed.", steps: ["$v_f = \\dfrac{2.0\\times4.0 + 2.0\\times0}{2.0+2.0} = \\dfrac{8.0}{4.0}$.", "$= 2.0\\,\\text{m/s}$."], answer: "$v_f = 2.0\\,\\text{m/s}$." },
        { title: "Energy lost", problem: "For the carts above, how much kinetic energy was lost?", steps: ["Before: $K_i = \\tfrac12(2.0)(4.0)^2 = 16\\,\\text{J}$.", "After: $K_f = \\tfrac12(4.0)(2.0)^2 = 8\\,\\text{J}$.", "Lost: $16 - 8 = 8\\,\\text{J}$."], answer: "$8\\,\\text{J}$ lost to heat and deformation." },
        { title: "Car pileup", problem: "A $1000\\,\\text{kg}$ car at $10\\,\\text{m/s}$ rear-ends an identical parked car; they lock together. Find the wreck's speed.", steps: ["$v_f = \\dfrac{1000\\times10}{2000} = \\dfrac{10000}{2000}$.", "$= 5.0\\,\\text{m/s}$."], answer: "$v_f = 5.0\\,\\text{m/s}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "Y-QOfc2XqOk", title: "Inelastic Collisions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Sticking, momentum, and energy." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $v_f = (m_1v_1 + m_2v_2)/(m_1+m_2)$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the ballistic pendulum", content: { markdown: "How do you measure a bullet's speed without fancy electronics? Fire it into a hanging block of wood — it embeds (perfectly inelastic), and the block-plus-bullet swings upward. The trick uses **both** big ideas in sequence: *momentum conservation* during the fast embedding gives the block's launch speed, then *energy conservation* during the slow swing turns that speed into a measured height. Combining them recovers the bullet's original speed from nothing but a length measurement. It's a beautiful reminder that momentum and energy are conserved in **different phases** of the same event." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Perfectly inelastic: objects stick and move together.", "$v_f = (m_1v_1 + m_2v_2)/(m_1+m_2)$ from momentum conservation.", "Momentum is conserved; kinetic energy is not.", "Lost kinetic energy becomes heat, sound, and deformation.", "Sticking gives the maximum possible kinetic-energy loss."], formulas: [{ label: "Stick-together speed", tex: "v_f = \\dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In a perfectly inelastic collision, the objects:", options: ["stick together", "bounce apart elastically", "pass through each other", "speed up"], answer: 0, explanation: "They couple and move as one." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "In an inelastic collision, momentum is conserved but kinetic energy is not.", answer: true, explanation: "Momentum always conserved; KE is lost." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $2.0\\,\\text{kg}$ cart at $4.0\\,\\text{m/s}$ hits a $2.0\\,\\text{kg}$ cart at rest; they stick. Final speed in m/s?", answer: { value: 2, tolerance: 0 }, explanation: "$8/4 = 2\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $1000\\,\\text{kg}$ car at $10\\,\\text{m/s}$ hits an identical parked car; they stick. Combined speed in m/s?", answer: { value: 5, tolerance: 0 }, hint: "$10000/2000$.", explanation: "$5.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $4.0\\,\\text{kg}$ cart at $3.0\\,\\text{m/s}$ hits a $2.0\\,\\text{kg}$ cart at rest; they stick. Combined speed in m/s?", answer: { value: 2, tolerance: 0 }, hint: "$12/6$.", explanation: "$2.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Kinetic energy of a $2.0\\,\\text{kg}$ object at $4.0\\,\\text{m/s}$, in joules? (its energy before sticking)", answer: { value: 16, tolerance: 0 }, hint: "$\\tfrac12 mv^2$.", explanation: "$\\tfrac12(2)(16) = 16\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "In an inelastic collision, the 'lost' kinetic energy mostly becomes:", options: ["heat and deformation", "more momentum", "more speed", "light"], answer: 0, hint: "Where does crushing energy go?", explanation: "It turns into heat, sound, and permanent deformation." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $3.0\\,\\text{kg}$ cart at $2.0\\,\\text{m/s}$ hits a $1.0\\,\\text{kg}$ cart at rest; they stick. Combined speed in m/s?", answer: { value: 1.5, tolerance: 0 }, hint: "$6/4$.", explanation: "$1.5\\,\\text{m/s}$." },
    ],
  },

  // ───────────────────────── 4. Elastic Collisions ─────────────────────────
  {
    slug: "elastic-collisions",
    title: "Elastic Collisions",
    tagline: "Bouncing with no energy lost",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Perfect Bounces", sub: "In an elastic collision, objects bounce apart and keep all their kinetic energy — like billiard balls or atoms." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Truly elastic collisions are rare in everyday life but exact at the atomic scale — gas molecules, billiard balls, and Newton's cradles come close. Because **both** momentum and kinetic energy are conserved, elastic collisions have clean, predictable outcomes." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In an **elastic collision**, the objects bounce apart and **kinetic energy is conserved** along with momentum:\n\n$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}, \\qquad \\tfrac12 m_1 v_{1i}^2 + \\tfrac12 m_2 v_{2i}^2 = \\tfrac12 m_1 v_{1f}^2 + \\tfrac12 m_2 v_{2f}^2.$$\n\nTwo conservation laws mean you can solve for **both** final velocities.\n\nThe most important special case — **equal masses**, one initially at rest: they simply **exchange velocities.** The moving ball stops dead, and the struck ball moves off with the original speed. This is exactly what a **Newton's cradle** shows, and why a head-on cue ball stops while the object ball rolls away.\n\nGeneral 1-D formulas (useful, not worth memorising):\n\n$$v_{1f} = \\frac{m_1 - m_2}{m_1 + m_2}\\,v_{1i} + \\frac{2 m_2}{m_1 + m_2}\\,v_{2i}, \\qquad v_{2f} = \\frac{m_2 - m_1}{m_1 + m_2}\\,v_{2i} + \\frac{2 m_1}{m_1 + m_2}\\,v_{1i}.$$\n\nA light ball hitting a heavy one bounces nearly straight back; a heavy ball hitting a light one barely slows and sends the light one off at nearly twice its speed." } },
      { kind: "SIMULATION", title: "Try it: elastic bounce", content: { simId: "collision", intro: "Choose 'Elastic' and set equal masses with one cart at rest — watch them swap velocities. Then try unequal masses and see how the bounce changes." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Equal masses exchange", problem: "An elastic, head-on collision: a ball at $3.0\\,\\text{m/s}$ hits an identical ball at rest. Find both final velocities.", steps: ["Equal masses, one at rest → they exchange velocities.", "Mover stops; struck ball takes the $3.0\\,\\text{m/s}$."], answer: "First ball: $0$; second ball: $3.0\\,\\text{m/s}$." },
        { title: "Newton's cradle", problem: "Why does lifting one ball of a Newton's cradle launch exactly one ball off the far end?", steps: ["The balls have equal mass and collide elastically.", "Momentum and kinetic energy must both be conserved.", "Only 'one ball out at the same speed' satisfies both."], answer: "Conserving both momentum and energy forces one ball out at the incoming speed." },
        { title: "Light hits heavy", problem: "In an elastic collision, a light ball strikes a much heavier ball at rest. Roughly what happens to the light ball?", steps: ["With $m_1 \\ll m_2$, the factor $(m_1-m_2)/(m_1+m_2) \\approx -1$.", "So $v_{1f} \\approx -v_{1i}$."], answer: "It bounces back at nearly its original speed." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "vGEHGsLnzVk", title: "Elastic Collisions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Elastic means energy is conserved too." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Remember the equal-mass exchange rule." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: relative speed reverses", content: { markdown: "There's an elegant shortcut for 1-D elastic collisions: the **relative velocity reverses**. Whatever speed the objects approach each other at, they separate at the *same* speed:\n\n$$v_{1i} - v_{2i} = -(v_{1f} - v_{2f}).$$\n\nThis single equation, paired with momentum conservation, replaces the messy quadratic energy equation and gives both final velocities with only linear algebra. It also makes the equal-mass exchange obvious. Physicists use this 'closing speed = separating speed' rule constantly." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Elastic collisions conserve both momentum and kinetic energy.", "Equal masses (one at rest) exchange velocities.", "A Newton's cradle is the classic demonstration.", "Light-on-heavy bounces back; heavy-on-light barely slows.", "Shortcut: relative (closing) speed reverses on separation."], formulas: [{ label: "KE conserved", tex: "\\tfrac12 m_1 v_{1i}^2 + \\tfrac12 m_2 v_{2i}^2 = \\tfrac12 m_1 v_{1f}^2 + \\tfrac12 m_2 v_{2f}^2" }, { label: "Relative speed", tex: "v_{1i} - v_{2i} = -(v_{1f} - v_{2f})" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "In an elastic collision, both momentum and kinetic energy are conserved.", answer: true, explanation: "That is the definition of elastic." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In a head-on elastic collision between two equal masses (one at rest), they:", options: ["exchange velocities", "stick together", "both stop", "both reverse"], answer: 0, explanation: "Equal masses swap velocities." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Elastic, equal masses: a $3.0\\,\\text{m/s}$ ball hits an identical ball at rest. Speed of the struck ball afterward, in m/s?", answer: { value: 3, tolerance: 0 }, explanation: "It takes the full $3.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Elastic, equal masses, one at $5.0\\,\\text{m/s}$ into one at rest. Speed of the initially-moving ball afterward, in m/s?", answer: { value: 0, tolerance: 0 }, hint: "Exchange rule.", explanation: "The mover stops; speed 0." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A Newton's cradle (equal balls) demonstrates:", options: ["elastic collisions exchanging momentum", "inelastic sticking", "friction", "gravity only"], answer: 0, hint: "One in, one out.", explanation: "It's a chain of elastic collisions." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Elastic collisions lose kinetic energy to heat.", answer: false, hint: "What does 'elastic' mean?", explanation: "Elastic collisions conserve kinetic energy." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Elastic, equal masses: ball A at $6.0\\,\\text{m/s}$ hits ball B at rest. Speed of A afterward, in m/s?", answer: { value: 0, tolerance: 0 }, hint: "Exchange rule.", explanation: "A stops; B moves at $6.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which type of collision conserves kinetic energy?", options: ["elastic", "perfectly inelastic", "all collisions", "none"], answer: 0, hint: "Only one keeps all the KE.", explanation: "Only elastic collisions conserve kinetic energy." },
    ],
  },

  // ───────────────────────── 5. Center of Mass ─────────────────────────
  {
    slug: "center-of-mass",
    title: "Center of Mass",
    tagline: "The balance point of a system",
    estMinutes: 13,
    xpReward: 160,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Balance Point", sub: "Every system moves as if all its mass were concentrated at one special point — the center of mass." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "A wrench tossed across a table tumbles wildly, but one point on it glides in a perfectly smooth line — its **center of mass**. This point is what Newton's laws really describe for an extended object, and it's why a diver's center of mass follows a clean parabola no matter how they somersault." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **center of mass** (CM) is the **mass-weighted average position** of all the parts of a system. For two objects on a line:\n\n$$x_{cm} = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}.$$\n\n(For many objects, sum $m_i x_i$ over all of them and divide by the total mass.)\n\nKey properties:\n\n- The CM lies **closer to the heavier** object. For equal masses it sits exactly **halfway** between them.\n- The whole system **moves as if all its mass were at the CM** and all external forces acted there. That's why we could treat objects as points in earlier lessons.\n- **With no external force, the CM moves at constant velocity** — even while the parts collide, explode, or spin. In a collision, the individual carts change motion, but their *combined* center of mass sails on undisturbed. This is just conservation of momentum seen from another angle: $\\vec p_{total} = M\\vec v_{cm}$.\n\nThe center of mass turns a complicated, wobbling system into a single point that obeys $\\vec F_{ext} = M\\vec a_{cm}$." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Two unequal masses", problem: "A $2.0\\,\\text{kg}$ mass sits at $x = 0$ and a $1.0\\,\\text{kg}$ mass at $x = 3.0\\,\\text{m}$. Find the center of mass.", steps: ["$x_{cm} = \\dfrac{2.0(0) + 1.0(3.0)}{2.0 + 1.0} = \\dfrac{3.0}{3.0}$.", "$= 1.0\\,\\text{m}$."], answer: "$x_{cm} = 1.0\\,\\text{m}$ (closer to the heavier mass)." },
        { title: "Equal masses", problem: "Two equal masses sit at $x = 0$ and $x = 4.0\\,\\text{m}$. Where is the CM?", steps: ["Equal masses → halfway.", "$x_{cm} = \\dfrac{0 + 4.0}{2} = 2.0\\,\\text{m}$."], answer: "$x_{cm} = 2.0\\,\\text{m}$ (the midpoint)." },
        { title: "Heavier pulls it in", problem: "A $3.0\\,\\text{kg}$ mass at $x = 0$ and a $1.0\\,\\text{kg}$ mass at $x = 8.0\\,\\text{m}$. Find the CM.", steps: ["$x_{cm} = \\dfrac{3.0(0) + 1.0(8.0)}{3.0 + 1.0} = \\dfrac{8.0}{4.0}$.", "$= 2.0\\,\\text{m}$."], answer: "$x_{cm} = 2.0\\,\\text{m}$ — near the heavy mass." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "U-iD4Dv5GP0", title: "Center of Mass" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Finding and reasoning about the CM." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $x_{cm} = (m_1x_1 + m_2x_2)/(m_1+m_2)$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Earth–Moon barycenter", content: { markdown: "The Moon doesn't simply orbit the Earth — both orbit their common center of mass, called the **barycenter**. Because the Earth is about 81 times heavier, the barycenter sits only about $4{,}700\\,\\text{km}$ from Earth's center — still *inside* the Earth, but not at its center. So the Earth wobbles slightly as the Moon goes around. Astronomers detect planets around other stars precisely by watching the star wobble about the star–planet barycenter. The humble weighted average becomes a planet-hunting tool." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The center of mass is the mass-weighted average position.", "$x_{cm} = (m_1x_1 + m_2x_2)/(m_1+m_2)$.", "It lies closer to the heavier mass; midway for equal masses.", "A system moves as if all mass were at the CM.", "With no external force, the CM moves at constant velocity."], formulas: [{ label: "Center of mass", tex: "x_{cm} = \\dfrac{m_1 x_1 + m_2 x_2}{m_1 + m_2}" }, { label: "Momentum & CM", tex: "\\vec p_{total} = M\\vec v_{cm}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The center of mass is the:", options: ["mass-weighted average position", "heaviest single point", "always the geometric center", "fastest-moving point"], answer: 0, explanation: "It's the average position weighted by mass." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Two equal masses at $x = 0$ and $x = 4.0\\,\\text{m}$. Center of mass position, in m?", answer: { value: 2, tolerance: 0 }, explanation: "Halfway: $2.0\\,\\text{m}$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "With no external force, the center of mass moves at constant velocity.", answer: true, explanation: "Internal forces can't change the CM's motion." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$m_1 = 2.0\\,\\text{kg}$ at $x=0$ and $m_2 = 1.0\\,\\text{kg}$ at $x=3.0\\,\\text{m}$. $x_{cm}$ in m?", answer: { value: 1, tolerance: 0 }, hint: "$(m_1x_1+m_2x_2)/(m_1+m_2)$.", explanation: "$3.0/3.0 = 1.0\\,\\text{m}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$m_1 = 3.0\\,\\text{kg}$ at $x=0$ and $m_2 = 1.0\\,\\text{kg}$ at $x=8.0\\,\\text{m}$. $x_{cm}$ in m?", answer: { value: 2, tolerance: 0 }, hint: "Heavier mass pulls it in.", explanation: "$8.0/4.0 = 2.0\\,\\text{m}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "For a heavy mass and a light mass, the center of mass is:", options: ["closer to the heavier mass", "closer to the lighter mass", "exactly in the middle", "outside both"], answer: 0, hint: "Weighted toward more mass.", explanation: "The CM sits nearer the heavier object." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two $5.0\\,\\text{kg}$ masses at $x=2.0\\,\\text{m}$ and $x=6.0\\,\\text{m}$. $x_{cm}$ in m?", answer: { value: 4, tolerance: 0 }, hint: "Equal masses → midpoint.", explanation: "Midway: $4.0\\,\\text{m}$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The center of mass of two equal masses is exactly halfway between them.", answer: true, hint: "Equal weighting.", explanation: "Equal masses put the CM at the midpoint." },
    ],
  },
];
