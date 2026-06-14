import type { LessonSeed } from "../types.js";

/**
 * The Graduate School (graduate): pure mathematics — the deep structure.
 * Sequences & convergence (real analysis), an introduction to groups (abstract
 * algebra), and proof techniques (induction & contradiction) built with the
 * PROOF question type. All original content.
 */
export const graduateSchoolLessons: LessonSeed[] = [
  // ───────────────────────── 1. Sequences & Convergence ─────────────────────────
  {
    slug: "sequences-and-convergence",
    title: "Sequences & Convergence",
    tagline: "What a list of numbers heads toward",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Closing In on a Limit", sub: "Real analysis makes the intuition of 'getting arbitrarily close' airtight — the rigor beneath all of calculus." } },
      { kind: "CONTEXT", title: "Making calculus rigorous", content: { markdown: "Calculus works, but *why*? Real analysis rebuilds it on a precise foundation, starting with **sequences** and what it means for them to **converge**. The payoff is certainty: theorems that hold without exception, proved from definitions rather than pictures." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **sequence** is an ordered, infinite list $a_1, a_2, a_3, \\dots$. It **converges** to a limit $L$ if its terms get and stay arbitrarily close to $L$.\n\nThe rigorous ($\\varepsilon$-$N$) definition:\n\n> $a_n \\to L$ means: for every $\\varepsilon > 0$ there is an $N$ such that $|a_n - L| < \\varepsilon$ for all $n > N$.\n\nIn words: name any tolerance $\\varepsilon$, however tiny, and eventually every term lands within $\\varepsilon$ of $L$.\n\nExamples:\n\n- $a_n = \\dfrac{1}{n} \\to 0$.\n- $a_n = \\dfrac{n+1}{n} = 1 + \\dfrac1n \\to 1$.\n- $a_n = (-1)^n$ **diverges** — it bounces between $-1$ and $1$, never settling.\n\nA sequence that doesn't converge **diverges**. Convergence is the bedrock idea on which limits, continuity, derivatives, and integrals are all rigorously built." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "A limit", problem: "Find $\\lim_{n\\to\\infty}\\dfrac1n$.", steps: ["Terms shrink toward 0.", "For any $\\varepsilon$, take $N > 1/\\varepsilon$."], answer: "$0$." },
        { title: "Rewrite to see it", problem: "Find $\\lim_{n\\to\\infty}\\dfrac{n+1}{n}$.", steps: ["$= 1 + \\dfrac1n$.", "$\\dfrac1n \\to 0$."], answer: "$1$." },
        { title: "Divergence", problem: "Does $a_n = (-1)^n$ converge?", steps: ["Terms alternate $-1, 1, -1, \\dots$.", "No single limit."], answer: "No — it diverges." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Converges = terms settle near one value." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Find limits; spot divergence." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: completeness of the reals", content: { markdown: "What makes the **real numbers** the right setting for analysis is **completeness**: every sequence whose terms bunch arbitrarily close together (a **Cauchy sequence**) actually converges — to a real number. The rationals fail this: $3, 3.1, 3.14, 3.141, \\dots$ bunches up but its limit $\\pi$ isn't rational. Completeness is the axiom that plugs the 'holes' in the number line and guarantees that limits, suprema, and integrals exist." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A sequence is an infinite ordered list of terms.", "It converges to $L$ if terms stay arbitrarily close to $L$.", "ε-N definition: for any ε>0, eventually $|a_n - L| < ε$.", "$1/n \\to 0$; $(-1)^n$ diverges.", "Completeness of the reals guarantees Cauchy sequences converge."], formulas: [{ label: "Convergence", tex: "\\forall\\varepsilon>0\\;\\exists N:\\; n>N \\Rightarrow |a_n - L| < \\varepsilon" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\lim_{n\\to\\infty}\\dfrac{1}{n}$.", answer: { value: 0, tolerance: 0 }, explanation: "The terms shrink to 0." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\lim_{n\\to\\infty}\\dfrac{n+1}{n}$.", answer: { value: 1, tolerance: 0 }, explanation: "$1 + 1/n \\to 1$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The sequence $a_n = (-1)^n$:", options: ["converges to 1", "converges to 0", "diverges", "converges to −1"], answer: 2, explanation: "It alternates and never settles." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\lim_{n\\to\\infty}\\left(\\tfrac12\\right)^n$.", answer: { value: 0, tolerance: 0 }, hint: "Repeated halving.", explanation: "$(1/2)^n \\to 0$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "In the ε-N definition, ε can be made as small as we like.", answer: true, hint: "It quantifies 'arbitrarily close'.", explanation: "Convergence must hold for every ε > 0, no matter how small." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\lim_{n\\to\\infty}\\dfrac{3n}{n+1}$.", answer: { value: 3, tolerance: 0 }, hint: "Divide top and bottom by n.", explanation: "$\\dfrac{3}{1 + 1/n} \\to 3$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A Cauchy sequence of real numbers always converges to a real number.", answer: true, hint: "This is completeness.", explanation: "Completeness of the reals guarantees it." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A sequence that does not converge is said to:", options: ["oscillate only", "diverge", "be bounded", "be finite"], answer: 1, hint: "The opposite of converge.", explanation: "Non-convergent sequences diverge." },
    ],
  },

  // ───────────────────────── 2. Introduction to Groups ─────────────────────────
  {
    slug: "introduction-to-groups",
    title: "Introduction to Groups",
    tagline: "The algebra of symmetry",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Structure, Stripped Bare", sub: "Forget what the objects are; keep only how they combine. Four axioms capture symmetry itself." } },
      { kind: "CONTEXT", title: "Abstraction as power", content: { markdown: "Abstract algebra asks: what's the *common structure* behind adding integers, rotating a square, and shuffling a deck? The answer is the **group** — one of mathematics' most powerful ideas, unifying number theory, geometry, and the symmetries of physical law." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **group** is a set $G$ with an operation $*$ satisfying four axioms:\n\n1. **Closure:** for all $a, b \\in G$, $a * b \\in G$.\n2. **Associativity:** $(a * b) * c = a * (b * c)$.\n3. **Identity:** there is an $e$ with $e * a = a * e = a$ for all $a$.\n4. **Inverses:** every $a$ has an $a^{-1}$ with $a * a^{-1} = e$.\n\nExamples:\n\n- The integers under **addition**: identity $0$, inverse of $5$ is $-5$. ✓ A group.\n- The integers under **multiplication**: $0$ has no inverse, and most elements lack one. ✗ Not a group.\n- The rotations of a square (0°, 90°, 180°, 270°) under composition. ✓ A finite group.\n\nIf the operation is also **commutative** ($a*b = b*a$), the group is **abelian**. From these spare axioms an enormous, rigorous theory unfolds." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Identity element", problem: "What is the identity for integers under addition?", steps: ["Need $e$ with $e + a = a$.", "$0 + a = a$."], answer: "$0$." },
        { title: "Inverse", problem: "What is the inverse of $5$ under addition?", steps: ["Need $5 + x = 0$.", "$x = -5$."], answer: "$-5$." },
        { title: "Not a group", problem: "Are the integers a group under multiplication?", steps: ["Identity is 1.", "But 2 has no integer inverse."], answer: "No — inverses fail." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Closure, associativity, identity, inverses." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Test the axioms; find identities and inverses." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: symmetry and physics", content: { markdown: "Groups are the mathematics of **symmetry**, and symmetry runs physics. **Noether's theorem** ties each continuous symmetry to a conservation law: time-translation symmetry gives conservation of energy; rotational symmetry gives angular momentum. The **Standard Model** of particle physics is built from specific symmetry groups. So the spare four axioms you just met turn out to encode the deepest organizing principles of the universe." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A group is a set with an operation obeying four axioms.", "Closure, associativity, an identity, and inverses for all.", "Integers under addition form a group; under multiplication they don't.", "An abelian group also has $a*b = b*a$.", "Groups formalize symmetry — central to modern physics."], formulas: [{ label: "Inverse axiom", tex: "a * a^{-1} = e" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is NOT one of the group axioms?", options: ["closure", "associativity", "commutativity", "inverses"], answer: 2, explanation: "Commutativity is optional (abelian groups); it isn't required." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the identity element for the integers under addition?", answer: { value: 0, tolerance: 0 }, explanation: "$0 + a = a$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Under addition, what is the inverse of $5$?", answer: { value: -5, tolerance: 0 }, explanation: "$5 + (-5) = 0$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The integers under multiplication form a group.", answer: false, hint: "Does 2 have an integer inverse?", explanation: "Most integers lack a multiplicative inverse, so it's not a group." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A group whose operation is commutative is called:", options: ["cyclic", "abelian", "trivial", "finite"], answer: 1, hint: "Named after Abel.", explanation: "A commutative group is abelian." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The four rotations of a square (0°, 90°, 180°, 270°) form a group under composition.", answer: true, hint: "Check closure and inverses.", explanation: "They are closed, associative, have identity (0°), and each has an inverse." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The 'closure' axiom requires that combining two elements:", options: ["gives the identity", "stays inside the set", "gives zero", "is commutative"], answer: 1, hint: "No escaping the set.", explanation: "Closure: $a * b$ is again in the group." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Noether's theorem links symmetries to conservation laws.", answer: true, hint: "Symmetry ↔ conservation.", explanation: "Each continuous symmetry yields a conserved quantity." },
    ],
  },

  // ───────────────────────── 3. Proof Techniques ─────────────────────────
  {
    slug: "proof-techniques",
    title: "Proof Techniques",
    tagline: "Induction and contradiction",
    estMinutes: 17,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Certainty, Constructed", sub: "A proof is an argument so tight no counterexample can exist. Two master techniques carry most of mathematics." } },
      { kind: "CONTEXT", title: "Why proof is the point", content: { markdown: "At the highest level, mathematics isn't computation — it's **proof**: establishing truth beyond any doubt, for infinitely many cases at once. Two techniques do most of the heavy lifting: **induction** (for statements about all integers) and **contradiction** (assume the opposite and derive an absurdity)." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Mathematical induction** proves a statement $P(n)$ for all integers $n \\ge 1$ in two steps:\n\n1. **Base case:** show $P(1)$ is true.\n2. **Inductive step:** assume $P(k)$ (the hypothesis) and prove $P(k+1)$.\n\nThen $P(n)$ holds for all $n$ — like dominoes: the first falls, and each knocks over the next.\n\n**Proof by contradiction** proves a statement by assuming its **negation** and deriving an impossibility. The classic: to show $\\sqrt2$ is irrational, assume $\\sqrt2 = a/b$ in lowest terms and reach a contradiction (both $a$ and $b$ turn out even).\n\nOther tools include **direct proof** (chain implications from hypothesis to conclusion) and **proof by counterexample** (one example disproves a universal claim). Mastery of these is what separates doing mathematics from merely using it." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Induction shape", problem: "What two parts does an induction proof need?", steps: ["A base case.", "An inductive step."], answer: "Base case and inductive step." },
        { title: "Contradiction shape", problem: "How does proof by contradiction begin?", steps: ["Assume the statement is false.", "Derive an impossibility."], answer: "Assume the negation, reach absurdity." },
        { title: "Counterexample", problem: "Disprove: 'all primes are odd.'", steps: ["Find one even prime.", "2 is prime and even."], answer: "$2$ is a counterexample." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Induction = base + step; contradiction = assume the opposite." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Assemble the proofs in correct logical order." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the limits of proof", content: { markdown: "Can every true statement be proved? Astonishingly, no. **Gödel's incompleteness theorems** show that any consistent formal system rich enough for arithmetic contains true statements it cannot prove — and cannot prove its own consistency. This doesn't make mathematics shaky; it reveals that truth outruns provability. It reshaped logic, foundations, and our understanding of what computation and reasoning can ever achieve." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A proof establishes truth for all cases, beyond doubt.", "Induction: prove the base case, then the inductive step.", "Contradiction: assume the negation, derive an absurdity.", "One counterexample disproves a universal claim.", "Gödel showed some truths are unprovable within a system."], formulas: [{ label: "Induction", tex: "P(1)\\;\\wedge\\;\\big(P(k)\\Rightarrow P(k+1)\\big)\\;\\Rightarrow\\;\\forall n\\,P(n)" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Mathematical induction requires a base case and a(n):", options: ["counterexample", "inductive step", "contradiction", "limit"], answer: 1, explanation: "Base case plus inductive step." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Proof by contradiction starts by assuming:", options: ["the statement is true", "the statement is false", "a base case", "nothing"], answer: 1, explanation: "Assume the negation, then derive an impossibility." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A single counterexample is enough to disprove a universal statement.", answer: true, explanation: "One exception breaks an 'all' claim." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the induction proof that $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$.", options: ["Base case: for $n=1$, both sides equal 1.", "Assume it holds for $n = k$: $1 + \\cdots + k = \\dfrac{k(k+1)}{2}$.", "Add $(k+1)$ to both sides.", "Simplify the right side to $\\dfrac{(k+1)(k+2)}{2}$ — the formula for $n = k+1$.", "By induction, the formula holds for all $n$."], answer: [], difficulty: 5, hint: "Base case, hypothesis, add the next term, simplify, conclude.", explanation: "Verify $n=1$, assume for $k$, add $(k+1)$, simplify to the $k+1$ form, then conclude for all $n$." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the proof by contradiction that $\\sqrt{2}$ is irrational.", options: ["Assume $\\sqrt2 = \\dfrac{a}{b}$ in lowest terms.", "Then $2b^2 = a^2$, so $a^2$ is even, hence $a$ is even.", "Write $a = 2c$, giving $2b^2 = 4c^2$, so $b^2 = 2c^2$.", "Then $b^2$ is even, so $b$ is even too.", "But then $a$ and $b$ share the factor 2 — contradicting 'lowest terms'."], answer: [], difficulty: 5, hint: "Assume rational, show both a and b are even, contradicting lowest terms.", explanation: "Assuming a lowest-terms fraction forces both numerator and denominator even — impossible." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "To disprove 'all primes are odd', you can note that:", options: ["3 is prime", "2 is an even prime", "1 is not prime", "primes are infinite"], answer: 1, hint: "Find an even prime.", explanation: "2 is prime and even — a counterexample." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Gödel showed that some true statements cannot be proved within a given formal system.", answer: true, hint: "Incompleteness.", explanation: "Gödel's first incompleteness theorem." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The inductive step assumes the statement for $n = k$ and proves it for $n = k+1$.", answer: true, hint: "The domino effect.", explanation: "That implication is exactly the inductive step." },
    ],
  },
];
