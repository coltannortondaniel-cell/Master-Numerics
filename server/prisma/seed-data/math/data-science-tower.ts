import type { LessonSeed } from "../types.js";

/**
 * The Data Science Tower (undergraduate): linear algebra — the grid of numbers
 * behind graphics, data, and AI. Vectors, matrices, and 2×2 determinants &
 * systems. NUMERIC/SYMBOLIC led. All original content.
 */
export const dataScienceTowerLessons: LessonSeed[] = [
  // ───────────────────────── 1. Vectors ─────────────────────────
  {
    slug: "vectors",
    title: "Vectors",
    tagline: "Magnitude and direction together",
    estMinutes: 15,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Arrows with Algebra", sub: "A vector packages a size and a direction into one object you can add, scale, and compute with." } },
      { kind: "CONTEXT", title: "The language of data and motion", content: { markdown: "A velocity, a force, a pixel's color, a user's preferences — all are naturally **vectors**: ordered lists of numbers. Linear algebra is the study of vectors and the transformations acting on them, and it is the mathematical engine of computer graphics, machine learning, and modern physics." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **vector** is an ordered list of numbers (**components**), often drawn as an arrow. In two dimensions, $\\vec v = (a, b)$.\n\n- **Addition** is componentwise: $(a_1, b_1) + (a_2, b_2) = (a_1+a_2,\\; b_1+b_2)$.\n- **Scalar multiplication** stretches: $k(a, b) = (ka, kb)$.\n- The **magnitude** (length) comes from the Pythagorean theorem:\n\n$$|\\vec v| = \\sqrt{a^2 + b^2}.$$\n\nThe **dot product** combines two vectors into a number: $(a_1,b_1)\\cdot(a_2,b_2) = a_1a_2 + b_1b_2$. It measures how much they point the same way — zero means **perpendicular**. These few operations, scaled to many dimensions, are all of applied linear algebra." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Magnitude", problem: "Find the length of $(3, 4)$.", steps: ["$\\sqrt{3^2 + 4^2}$.", "$\\sqrt{25}$."], answer: "$|\\vec v| = 5$." },
        { title: "Add", problem: "Add $(1, 2) + (3, 5)$.", steps: ["Componentwise.", "$(4, 7)$."], answer: "$(4, 7)$." },
        { title: "Dot product", problem: "Compute $(1, 2)\\cdot(3, 4)$.", steps: ["$1\\cdot3 + 2\\cdot4$.", "$3 + 8$."], answer: "$11$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Componentwise operations; magnitude by Pythagoras." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Add, scale, and measure vectors." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: vectors in n dimensions", content: { markdown: "Nothing limits vectors to 2D. A vector in $n$ dimensions is just $n$ numbers, and every rule generalizes: add componentwise, and $|\\vec v| = \\sqrt{v_1^2 + \\cdots + v_n^2}$. A grayscale image is a vector with one component per pixel; a document can be a vector of word counts. Machine learning lives in spaces of thousands of dimensions, where the dot product still measures similarity exactly as it does for two arrows." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A vector is an ordered list of components (an arrow).", "Add and scale componentwise.", "Magnitude $|\\vec v| = \\sqrt{a^2 + b^2}$.", "Dot product $a_1a_2 + b_1b_2$ measures alignment; 0 means perpendicular.", "Everything generalizes to n dimensions."], formulas: [{ label: "Magnitude", tex: "|\\vec v| = \\sqrt{a^2 + b^2}" }, { label: "Dot product", tex: "\\vec u\\cdot\\vec v = a_1a_2 + b_1b_2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the magnitude of the vector $(3, 4)$.", answer: { value: 5, tolerance: 0 }, explanation: "$\\sqrt{9+16} = 5$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Compute the dot product $(1, 2)\\cdot(3, 4)$.", answer: { value: 11, tolerance: 0 }, explanation: "$3 + 8 = 11$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Vector addition is performed:", options: ["by multiplying components", "componentwise", "by adding magnitudes", "only for equal vectors"], answer: 1, explanation: "Add matching components." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the magnitude of a 2D vector with components $a$ and $b$. (Type like `sqrt(a^2 + b^2)`.)", answer: { expr: "sqrt(a^2 + b^2)", vars: ["a", "b"] }, difficulty: 4, hint: "Pythagoras on the components.", explanation: "$|\\vec v| = \\sqrt{a^2 + b^2}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the magnitude of $(6, 8)$.", answer: { value: 10, tolerance: 0 }, hint: "$\\sqrt{36+64}$.", explanation: "$\\sqrt{100} = 10$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Compute the dot product $(2, 3)\\cdot(4, 1)$.", answer: { value: 11, tolerance: 0 }, hint: "$2\\cdot4 + 3\\cdot1$.", explanation: "$8 + 3 = 11$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Two vectors are perpendicular when their dot product is zero.", answer: true, hint: "No shared direction.", explanation: "A zero dot product means perpendicular." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Scale the vector $(2, 5)$ by 3. What is its new first component?", answer: { value: 6, tolerance: 0 }, hint: "Multiply each component by 3.", explanation: "$3 \\times 2 = 6$." },
    ],
  },

  // ───────────────────────── 2. Matrices ─────────────────────────
  {
    slug: "matrices",
    title: "Matrices",
    tagline: "Grids that transform space",
    estMinutes: 15,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Numbers in a Grid", sub: "A matrix is a rectangle of numbers — and, more powerfully, a machine that transforms vectors." } },
      { kind: "CONTEXT", title: "Transformations in the tower", content: { markdown: "Rotate a 3D model, blur an image, step a neural network forward — each is a **matrix** acting on vectors. A matrix is both a table of data and a **linear transformation**, and that dual nature makes it the central object of the data sciences." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **matrix** is a rectangular array of numbers with rows and columns. A $2\\times2$ matrix is\n\n$$A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}.$$\n\nOperations:\n\n- **Add** matrices of the same shape entrywise.\n- **Scalar multiply** by multiplying every entry.\n- **Matrix × vector** transforms the vector: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}$.\n\nMatrix multiplication chains transformations — and is **not commutative**: $AB \\ne BA$ in general, because doing a rotation then a stretch differs from the reverse. The **identity matrix** $\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$ leaves every vector unchanged." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Matrix times vector", problem: "Apply $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ to $(1, 1)$.", steps: ["$(2\\cdot1 + 0\\cdot1,\\; 0\\cdot1 + 3\\cdot1)$.", "$(2, 3)$."], answer: "$(2, 3)$ — it stretches x by 2, y by 3." },
        { title: "Scalar multiply", problem: "Multiply $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ by 2.", steps: ["Every entry doubles.", "$\\begin{pmatrix}2&4\\\\6&8\\end{pmatrix}$."], answer: "All entries doubled." },
        { title: "Identity", problem: "What does the identity matrix do to a vector?", steps: ["It maps each vector to itself.", "No change."], answer: "Leaves it unchanged." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Matrix × vector mixes rows with the vector." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Apply matrices to vectors; mind that order matters." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: eigenvectors", content: { markdown: "Some special vectors keep their direction under a matrix — the matrix only stretches them: $A\\vec v = \\lambda \\vec v$. These **eigenvectors**, with their **eigenvalues** $\\lambda$, reveal a transformation's natural axes. They power Google's PageRank, the principal components of a dataset, and the stationary states of quantum mechanics — arguably the most important idea in all of applied linear algebra." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A matrix is a grid of numbers — and a linear transformation.", "Add and scalar-multiply entrywise.", "Matrix × vector transforms the vector.", "Matrix multiplication is not commutative: $AB \\ne BA$.", "The identity matrix leaves vectors unchanged."], formulas: [{ label: "Matrix × vector", tex: "\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix} = \\begin{pmatrix}ax+by\\\\cx+dy\\end{pmatrix}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Apply $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ to $(1,1)$. What is the new first component?", answer: { value: 2, tolerance: 0 }, explanation: "$2\\cdot1 + 0\\cdot1 = 2$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The identity matrix, applied to a vector:", options: ["doubles it", "leaves it unchanged", "rotates it", "zeroes it"], answer: 1, explanation: "The identity maps each vector to itself." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Matrix multiplication is commutative ($AB = BA$ always).", answer: false, explanation: "Order matters: $AB \\ne BA$ in general." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Apply $\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ to $(3, 4)$. What is the new first component ($1\\cdot3 + 2\\cdot4$)?", answer: { value: 11, tolerance: 0 }, hint: "First row dotted with the vector.", explanation: "$3 + 8 = 11$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Multiply the matrix $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ by the scalar 2. What is the top-left entry?", answer: { value: 2, tolerance: 0 }, hint: "Double every entry.", explanation: "$2 \\times 1 = 2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A 2×2 matrix applied to a 2D vector produces:", options: ["a number", "a 2D vector", "a 3×3 matrix", "nothing"], answer: 1, hint: "It transforms the vector.", explanation: "Matrix × vector gives a transformed vector." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "An eigenvector of a matrix keeps its direction when the matrix is applied.", answer: true, hint: "$A\\vec v = \\lambda\\vec v$.", explanation: "Eigenvectors are only scaled, not redirected." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Apply $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ to $(5, 9)$. What is the new first component?", answer: { value: 9, tolerance: 0 }, hint: "This matrix swaps the components.", explanation: "$0\\cdot5 + 1\\cdot9 = 9$." },
    ],
  },

  // ───────────────────────── 3. Determinants & Linear Systems ─────────────────────────
  {
    slug: "determinants-and-systems",
    title: "Determinants & Systems",
    tagline: "Solving many equations at once",
    estMinutes: 15,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "One Number, Big Meaning", sub: "The determinant measures how a matrix scales area — and whether a system of equations has a unique solution." } },
      { kind: "CONTEXT", title: "When does a system solve?", content: { markdown: "Two linear equations in two unknowns usually meet at a single point — but sometimes they're parallel (no solution) or identical (infinitely many). One number, the **determinant**, tells you which case you're in, and it generalizes to systems of any size." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "For a $2\\times2$ matrix $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, the **determinant** is\n\n$$\\det = ad - bc.$$\n\nGeometrically it's the factor by which the matrix scales area (and its sign flags a flip).\n\nThe key fact for solving systems:\n\n- If $\\det \\ne 0$, the matrix is **invertible** and the system $A\\vec x = \\vec b$ has exactly **one** solution.\n- If $\\det = 0$, the rows are proportional — the equations are parallel or identical, giving **no** solution or **infinitely many**.\n\nThis single test scales to $n\\times n$ systems, and the determinant also appears in change-of-variables for integrals, cross products, and stability analysis." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Determinant", problem: "Find $\\det\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix}$.", steps: ["$ad - bc$.", "$3\\cdot4 - 1\\cdot2 = 12 - 2$."], answer: "$\\det = 10$." },
        { title: "Singular matrix", problem: "Find $\\det\\begin{pmatrix}2&4\\\\1&2\\end{pmatrix}$.", steps: ["$2\\cdot2 - 4\\cdot1$.", "$4 - 4 = 0$."], answer: "$0$ — no unique solution." },
        { title: "Interpret", problem: "A system has $\\det = 0$. What can you conclude?", steps: ["Not invertible.", "Parallel or identical lines."], answer: "No unique solution." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Determinant $ad - bc$; nonzero means a unique solution." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Compute determinants and read off solvability." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the inverse matrix", content: { markdown: "When $\\det \\ne 0$, a matrix has an **inverse** $A^{-1}$ that undoes it, so $A\\vec x = \\vec b$ solves as $\\vec x = A^{-1}\\vec b$ — the matrix version of dividing. For $2\\times2$, $A^{-1} = \\dfrac{1}{\\det}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$, and the $\\dfrac{1}{\\det}$ out front is exactly why a zero determinant breaks everything: you can't divide by zero, so a singular matrix has no inverse and no unique solution." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The 2×2 determinant is $ad - bc$.", "It measures how the matrix scales area.", "$\\det \\ne 0$: invertible, exactly one solution.", "$\\det = 0$: no unique solution (parallel/identical equations).", "The inverse $A^{-1}$ exists only when $\\det \\ne 0$."], formulas: [{ label: "Determinant", tex: "\\det = ad - bc" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\det\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix}$.", answer: { value: 10, tolerance: 0 }, explanation: "$3\\cdot4 - 1\\cdot2 = 10$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\det\\begin{pmatrix}2&4\\\\1&2\\end{pmatrix}$.", answer: { value: 0, tolerance: 0 }, explanation: "$4 - 4 = 0$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If a 2×2 system has determinant 0, it has:", options: ["exactly one solution", "no unique solution", "always no solution", "negative solutions"], answer: 1, explanation: "Zero determinant means not invertible — no unique solution." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the determinant of $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$. (Type like `a*d - b*c`.)", answer: { expr: "a*d - b*c", vars: ["a", "b", "c", "d"] }, difficulty: 4, hint: "Main diagonal minus off-diagonal.", explanation: "$\\det = ad - bc$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\det\\begin{pmatrix}5&2\\\\3&1\\end{pmatrix}$.", answer: { value: -1, tolerance: 0 }, hint: "$5\\cdot1 - 2\\cdot3$.", explanation: "$5 - 6 = -1$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A matrix has an inverse only when its determinant is nonzero.", answer: true, hint: "The inverse divides by det.", explanation: "A zero determinant means no inverse." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\det\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$ (the identity).", answer: { value: 1, tolerance: 0 }, hint: "$1\\cdot1 - 0\\cdot0$.", explanation: "The identity has determinant 1." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The determinant geometrically measures how a matrix scales:", options: ["length only", "area (or volume)", "time", "temperature"], answer: 1, hint: "Think area factor.", explanation: "It is the area/volume scaling factor of the transformation." },
    ],
  },
];
