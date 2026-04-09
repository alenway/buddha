import InteractiveDemo from "./InteractiveDemo";

const TABLE_ROWS = [
  { angle: "0°", cos: "1.000", sin: "0.000", fw: "40.0", sd: "0.0" },
  { angle: "15°", cos: "0.966", sin: "0.259", fw: "38.6", sd: "10.4" },
  { angle: "30°", cos: "0.866", sin: "0.500", fw: "34.6", sd: "20.0" },
  { angle: "45°", cos: "0.707", sin: "0.707", fw: "28.3", sd: "28.3" },
  { angle: "60°", cos: "0.500", sin: "0.866", fw: "20.0", sd: "34.6" },
  { angle: "75°", cos: "0.259", sin: "0.966", fw: "10.4", sd: "38.6" },
  { angle: "90°", cos: "0.000", sin: "1.000", fw: "0.0", sd: "40.0" },
];

export default function HeroSection() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-ink/10 px-4 md:px-16 py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-end max-w-275 mx-auto animate-fade-up">
        <div>
          <p className="font-mono text-[11px] tracking-[.15em] uppercase text-accent mb-3">
            Visual Mathematics · Perspective · 3D
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-ink mb-5">
            The Art of
            <br />
            <em className="italic text-accent">Foreshortening</em>
          </h1>
          <p className="text-[1.05rem] text-ink-2 max-w-md leading-[1.75]">
            When you rotate an object, its visible dimensions change in a
            precise, predictable way. Learn the formulas — and explore full 3D
            rotation in any direction, not just left and right.
          </p>
          <div className="mt-6 pt-5 border-t border-ink/10 flex gap-4 flex-wrap font-mono text-[11px] text-ink-3 tracking-[.08em]">
            <span>7 min read</span>
            <span>·</span>
            <span>Full 3D rotation</span>
            <span>·</span>
            <span>6 coloured faces</span>
            <span>·</span>
            <span>Research references</span>
          </div>
        </div>
        {/* Hero cube is rendered client-side in InteractiveDemo below */}
        <div className="flex items-center justify-center">
          <div className="bg-paper-2 border border-paper-3 p-4 rounded-sm text-center">
            <p className="font-mono text-[10px] tracking-[.12em] uppercase text-ink-3 mb-2">
              Rotate in any direction
            </p>
            <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
              {[
                { color: "#3b82f6", label: "Front" },
                { color: "#8b5cf6", label: "Back" },
                { color: "#10b981", label: "Top" },
                { color: "#f59e0b", label: "Bottom" },
                { color: "#ef4444", label: "Right" },
                { color: "#ec4899", label: "Left" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-1.5 px-2 py-1.5 bg-paper rounded border border-paper-3"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ background: f.color }}
                  />
                  <span className="text-ink-2">{f.label}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-ink-3 mt-3">
              Each face has a unique colour + label
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-275 mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 py-12">
          {/* MAIN ARTICLE */}
          <main className="space-y-0">
            <section id="concept">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 pb-3 border-b border-ink/10 mt-8">
                What is Foreshortening?
              </h2>
              <p className="text-ink-2 leading-[1.8] mb-4">
                Foreshortening is the visual effect where an object or part of
                it appears{" "}
                <strong className="text-ink font-semibold">
                  shorter than it actually is
                </strong>{" "}
                because it is angled away from the viewer. Artists have used
                this principle for centuries to create convincing depth. But
                foreshortening is not just an art trick — it is grounded in
                precise, calculable mathematics.
              </p>
              <p className="text-ink-2 leading-[1.8] mb-4">
                Think about looking straight at the edge of a ruler. You see its
                full length. Now tilt it away from you. It appears shorter and
                shorter. At 90°, all you see is a dot — the very tip pointing
                directly at your eye. The ruler hasn{"'"}t changed; only the{" "}
                <em>visible portion</em> has changed.
              </p>
              <blockquote className="border-l-4 border-accent bg-paper-2 px-5 py-4 my-6">
                <p className="font-serif text-xl italic text-ink leading-normal">
                  &quot;Foreshortening is what happens when you send one
                  dimension of a shape into hiding — the math always knows
                  exactly how much is left.&quot;
                </p>
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                {[
                  {
                    title: "In Art",
                    color: "#1a6b4a",
                    body: "Renaissance painters like Mantegna mastered foreshortening to make figures leap off the canvas. A human arm pointing at you looks dramatically shorter than one stretched sideways.",
                  },
                  {
                    title: "In 3D Design",
                    color: "#1a4a7a",
                    body: "Every 3D software — Blender, Maya, AutoCAD — uses foreshortening mathematics constantly when rendering objects from different angles and in different projections.",
                  },
                  {
                    title: "In Engineering",
                    color: "#b8860b",
                    body: "Mechanical drawings use orthographic projection — foreshortening applied systematically — to represent 3D objects accurately on flat blueprints.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="border border-paper-3 bg-paper-2 p-4"
                    style={{ borderTopWidth: 3, borderTopColor: c.color }}
                  >
                    <h4
                      className="font-mono text-[11px] uppercase tracking-[.12em] mb-2"
                      style={{ color: c.color }}
                    >
                      {c.title}
                    </h4>
                    <p className="text-[13px] text-ink-2 leading-[1.6]">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="how-it-works">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 pb-3 border-b border-ink/10 mt-10">
                How It Works: Two Things Happen at Once
              </h2>
              <p className="text-ink-2 leading-[1.8] mb-4">
                Use a{" "}
                <strong className="text-ink font-semibold">
                  40 mm × 40 mm cube
                </strong>{" "}
                as the example. Imagine looking at it straight on, then slowly
                rotating it from right to left. Two things happen simultaneously
                — and in the previous version of this page, we only showed one
                axis. Now you can rotate in{" "}
                <strong className="text-ink font-semibold">
                  any direction simultaneously
                </strong>
                .
              </p>
              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                1. The front face width shrinks (Y axis rotation)
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                When you rotate left or right (Y axis), the blue front face
                turns away. Its visible width shrinks by{" "}
                <strong className="text-ink">cos(angle)</strong>. The red and
                pink side faces start to appear, scaled by{" "}
                <strong className="text-ink">sin(angle)</strong>.
              </p>
              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                2. The front face height shrinks (X axis rotation)
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                When you rotate up or down (X axis), the same thing happens
                vertically. The front face height shrinks by{" "}
                <strong className="text-ink">cos(angle)</strong>. The green top
                and amber bottom faces come into view by{" "}
                <strong className="text-ink">sin(angle)</strong>.
              </p>
              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                3. Z axis rotation — spinning in place
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                The Z axis rotates the object around the axis pointing straight
                at you. This doesn{"'"}t foreshorten anything — it just spins
                the shape. It&apos;s useful in combination with X and Y rotation
                to reach any orientation in space.
              </p>
              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                The superposition principle
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                When you rotate around multiple axes at once, we use{" "}
                <strong className="text-ink">rotation matrices</strong> — not
                just oblique offsets. Each axis has its own rotation matrix (Rx,
                Ry, Rz), and we multiply them together to get the combined
                rotation. The cube above uses this exact technique: you can drag
                it to any orientation in 3D space and all six faces will be
                correctly projected, lit, and labelled.
              </p>
            </section>

            <section id="demo">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 pb-3 border-b border-ink/10 mt-10">
                Interactive 3D Demo
              </h2>
              <p className="text-ink-2 leading-[1.8] mb-2">
                The demo below uses full 3D rotation matrices. Drag the cube
                directly, or use the sliders. Watch the live foreshortening
                measurements update on the right as you rotate.
              </p>
              <InteractiveDemo />
            </section>

            <section id="formulas">
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 pb-3 border-b border-ink/10 mt-10">
                The Formulas
              </h2>
              <p className="text-ink-2 leading-[1.8] mb-4">
                For a single-axis rotation, you only need two formulas. They
                work for <em>any</em> object.
              </p>
              <div className="bg-ink text-paper-2 px-6 py-5 my-5 font-mono text-[15px] leading-[2.1] rounded-sm relative overflow-hidden">
                <span className="absolute top-2.5 right-4 text-[9px] tracking-[.2em] text-paper-2/30">
                  FORMULA
                </span>
                <span className="text-[#EF9F27] font-medium">visibleWidth</span>
                {"  "}= realWidth × <span className="text-[#5DCAA5]">cos</span>
                (angle){"\n"}
                <span className="text-[#EF9F27] font-medium">visibleDepth</span>
                {"  "}= realDepth × <span className="text-[#5DCAA5]">sin</span>
                (angle){"\n"}
                <span className="text-[#EF9F27] font-medium">
                  visibleHeight
                </span>{" "}
                = realHeight × <span className="text-[#5DCAA5]">1</span>
                {"  "}
                <span className="text-paper-2/40 text-[13px]">
                  {"// left/right rotation only"}
                </span>
              </div>
              <p className="text-ink-2 leading-[1.8] mb-4">
                <strong className="text-ink font-semibold">Cosine (cos)</strong>{" "}
                tells you how much of the original dimension is still facing
                you. At 0° it equals 1.0 (full size). At 90° it equals 0.0
                (completely edge-on, invisible).
              </p>
              <p className="text-ink-2 leading-[1.8] mb-4">
                <strong className="text-ink font-semibold">Sine (sin)</strong>{" "}
                tells you how much of the depth has rotated into view. At 0° it
                equals 0.0. At 90° it equals 1.0 (full depth visible).
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="bg-paper-2">
                      {[
                        "Angle",
                        "cos(angle)",
                        "sin(angle)",
                        "Front width (40mm)",
                        "Side depth (40mm)",
                      ].map((h) => (
                        <th
                          key={h}
                          className="font-mono text-[10px] tracking-[.12em] uppercase text-ink-3 px-4 py-3 text-left border-b-2 border-ink/10"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row) => (
                      <tr
                        key={row.angle}
                        className="border-b border-ink/8 hover:bg-paper-2 transition-colors"
                      >
                        <td className="font-mono px-4 py-2.5 text-ink-2">
                          {row.angle}
                        </td>
                        <td className="font-mono px-4 py-2.5 text-[#1d4ed8]">
                          {row.cos}
                        </td>
                        <td className="font-mono px-4 py-2.5 text-[#be185d]">
                          {row.sin}
                        </td>
                        <td className="font-mono px-4 py-2.5 text-accent font-medium">
                          {row.fw} mm
                        </td>
                        <td className="font-mono px-4 py-2.5 text-ink-2">
                          {row.sd} mm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                The Pythagorean connection
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                Square the visible width and the visible depth and add them —
                you always get the original dimension squared, at any angle.
                This is because cos²(θ) + sin²(θ) = 1.
              </p>
              <div className="bg-ink text-paper-2 px-6 py-5 my-5 font-mono text-[14px] leading-[2.1] rounded-sm relative overflow-hidden">
                <span className="absolute top-2.5 right-4 text-[9px] tracking-[.2em] text-paper-2/30">
                  FORMULA
                </span>
                (visibleWidth)² + (visibleDepth)² = (realDimension)²{"\n\n"}
                <span className="text-paper-2/40 text-[12px]">
                  {"// Example at 30°:"}
                </span>
                {"\n"}
                <span className="text-[#5DCAA5]">34.6</span>² +{" "}
                <span className="text-[#ec4899]">20.0</span>² = 1197 + 400 ={" "}
                <span className="text-[#EF9F27]">1597 ≈ 40² = 1600 ✓</span>
              </div>

              <h3 className="font-serif text-xl italic text-ink mt-6 mb-2">
                For full 3D rotation: rotation matrices
              </h3>
              <p className="text-ink-2 leading-[1.8] mb-4">
                When rotating around multiple axes simultaneously, we use{" "}
                <strong className="text-ink font-semibold">
                  3×3 rotation matrices
                </strong>
                . Each axis (X, Y, Z) has its own matrix, and we multiply them
                together. This is exactly what the 3D cube above does
                internally.
              </p>
              <div className="bg-ink text-paper-2 px-6 py-5 my-5 font-mono text-[13px] leading-[2.1] rounded-sm relative overflow-hidden">
                <span className="absolute top-2.5 right-4 text-[9px] tracking-[.2em] text-paper-2/30">
                  MATRIX FORM
                </span>
                <span className="text-[#5DCAA5]">Ry</span>(θ) = [cos θ, 0, sin
                θ]{"\n"}
                {"          "}[ 0, 1, 0 ]{"\n"}
                {"          "}[-sin θ, 0, cos θ]{"\n\n"}
                <span className="text-[#10b981]">Rx</span>(φ) = [1, 0, 0 ]{"\n"}
                {"          "}[0, cos φ, -sin φ]{"\n"}
                {"          "}[0, sin φ, cos φ]{"\n\n"}
                <span className="text-[#EF9F27]">Combined</span> ={" "}
                <span className="text-[#10b981]">Rx</span> ×{" "}
                <span className="text-[#5DCAA5]">Ry</span> × Rz
              </div>
            </section>
          </main>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-18 space-y-4">
              <div className="bg-paper-2 border border-paper-3 border-l-[3px] border-l-accent px-4 py-4">
                <h3 className="font-mono text-[10px] tracking-[.15em] uppercase text-accent mb-3">
                  Contents
                </h3>
                <ul className="space-y-0">
                  {[
                    ["#concept", "What is foreshortening?"],
                    ["#how-it-works", "How it works"],
                    ["#demo", "3D demo"],
                    ["#formulas", "The formulas"],
                    ["#research", "Research papers"],
                    ["#calculator", "Calculator"],
                  ].map(([href, label]) => (
                    <li key={href} className="border-b border-ink/8">
                      <a
                        href={href}
                        className="block py-2 font-mono text-[12px] text-ink-3 hover:text-accent hover:pl-1.5 transition-all"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-paper-2 border border-paper-3 border-l-[3px] border-l-accent px-4 py-4">
                <h3 className="font-mono text-[10px] tracking-[.15em] uppercase text-accent mb-3">
                  Quick Reference
                </h3>
                <div className="space-y-2 text-[13px] text-ink-2 font-mono">
                  <p>
                    <strong className="text-ink">Width</strong> = W × cos(Y°)
                  </p>
                  <p>
                    <strong className="text-ink">Depth</strong> = D × sin(Y°)
                  </p>
                  <p>
                    <strong className="text-ink">Height</strong> = H × cos(X°)
                  </p>
                  <p>
                    <strong className="text-ink">Top depth</strong> = D ×
                    sin(X°)
                  </p>
                  <p>
                    <strong className="text-ink">Pythagoras</strong>
                    <br />
                    w² + d² = W²
                  </p>
                </div>
              </div>
              <div
                className="bg-paper-2 border border-paper-3 border-l-[3px]"
                style={{ borderLeftColor: "#1a4a7a" }}
              >
                <div className="px-4 py-4">
                  <h3
                    className="font-mono text-[10px] tracking-[.15em] uppercase mb-3"
                    style={{ color: "#1a4a7a" }}
                  >
                    Historical Note
                  </h3>
                  <p className="text-[13px] text-ink-2 leading-[1.6]">
                    The word <em>foreshortening</em> comes from the Italian{" "}
                    <em>scorcio</em>, used by Renaissance artists since the
                    1400s. The mathematical formalisation via matrices was
                    developed by Euler (1748) and Monge (1799).
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
