import Calculator from "../components/Calculator";
export default function Calci() {
  return (
    <div>
      {/* CALCULATOR */}
      <section id="calculator" className="px-4 md:px-16 py-12">
        <div className="max-w-275 mx-auto">
          <Calculator />
        </div>
      </section>
    </div>
  );
}
