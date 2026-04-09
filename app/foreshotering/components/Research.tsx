const PAPERS = [
  {
    era: "Descriptive Geometry · 1799",
    title: "Géométrie Descriptive",
    authors: "Gaspard Monge",
    journal: "École Polytechnique, Paris",
    body: "The foundational text that formalised orthographic projection — the mathematical framework underlying all engineering drawings and foreshortening calculations. Monge showed how a 3D object is described by projections onto two perpendicular planes.",
    cite: "Monge, G. (1799). Géométrie descriptive. Baudouin, Paris.",
  },
  {
    era: "Perspective Theory · 1435",
    title: "Della Pittura (On Painting)",
    authors: "Leon Battista Alberti",
    journal: "First systematic treatise on perspective",
    body: "The earliest written theory of geometric perspective in Western art. Alberti introduced the 'visual pyramid' and explained why objects appear shorter when angled away — directly describing what we now call foreshortening.",
    cite: "Alberti, L.B. (1435). De Pictura. Trans. Spencer, J.R. (1966), Yale UP.",
  },
  {
    era: "Computer Graphics · 1963",
    title: "Sketchpad: A Man-Machine Graphical Communication System",
    authors: "Ivan E. Sutherland",
    journal: "MIT Lincoln Laboratory Technical Report 296",
    body: "Sutherland's PhD thesis introduced the first interactive computer graphics system and implemented rotation and projection computationally for the first time. The projection matrices he used are direct implementations of the cosine/sine foreshortening equations.",
    cite: "Sutherland, I.E. (1963). Sketchpad. MIT PhD Thesis. Reprinted: UCAM-CL-TR-574 (2003).",
  },
  {
    era: "3D Graphics · 1990",
    title: "Computer Graphics: Principles and Practice",
    authors: "Foley, van Dam, Feiner, Hughes",
    journal: "Addison-Wesley, 2nd Edition",
    body: "The definitive reference textbook for computer graphics. Chapter 6 formally derives viewing transformations and projection equations — including orthographic and perspective foreshortening — using the same trigonometric relationships explained in this article.",
    cite: "Foley, J.D. et al. (1990). Computer Graphics. ISBN 0-201-12110-7.",
  },
  {
    era: "Coordinate Geometry · 1637",
    title: "La Géométrie",
    authors: "René Descartes",
    journal: "Appendix to Discourse on Method",
    body: "Descartes introduced the coordinate system that made it possible to describe geometric shapes algebraically. Without this, the trigonometric foreshortening formulas could not be written as equations. Every modern 3D rotation matrix is built on this foundation.",
    cite: "Descartes, R. (1637). La Géométrie. Trans. Smith & Latham (1954), Dover.",
  },
  {
    era: "Trigonometry · 1748",
    title: "Introductio in Analysin Infinitorum",
    authors: "Leonhard Euler",
    journal: "Lausanne, Vol. 1",
    body: "Euler formalised the modern definitions of sine and cosine as functions of a continuous angle, and proved cos²(θ) + sin²(θ) = 1 — precisely the Pythagorean relationship between visible width and visible depth at any rotation angle demonstrated in this article.",
    cite: "Euler, L. (1748). Introductio, Vol. 1, Ch. 8. Opera Omnia, Ser. 1, Vol. 8.",
  },
];

export default function Research() {
  return (
    <div>
      {/* RESEARCH */}
      <section
        id="research"
        className="bg-paper-2 border-y-2 border-ink py-12 px-4 md:px-16"
      >
        <div className="max-w-275 mx-auto">
          <p className="font-mono text-[10px] tracking-[.2em] uppercase text-accent mb-2">
            Academic Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">
            Research &amp; Literature
          </h2>
          <p className="text-ink-2 text-[15px] max-w-2xl leading-[1.75] mb-8">
            The mathematics of foreshortening is one of the oldest intersections
            of art and science. These key works established and formalised the
            principles described in this article.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAPERS.map((p) => (
              <div
                key={p.title}
                className="bg-paper border border-paper-3 p-5"
                style={{ borderLeft: "3px solid #1a4a7a" }}
              >
                <p className="font-mono text-[9px] tracking-[.2em] uppercase text-[#1a4a7a] mb-1">
                  {p.era}
                </p>
                <h4 className="font-serif text-[1.05rem] text-ink mb-1 leading-[1.3]">
                  {p.title}
                </h4>
                <span className="font-mono text-[11px] text-ink-3 block mb-0.5">
                  {p.authors}
                </span>
                <span className="font-mono text-[11px] text-accent block mb-3">
                  {p.journal}
                </span>
                <p className="text-[13px] text-ink-2 leading-[1.6] mb-3">
                  {p.body}
                </p>
                <p className="font-mono text-[10px] text-ink-3 break-all">
                  {p.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
