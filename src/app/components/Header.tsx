'use client'

export default function Header() {
  const date = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header>
      <section className="mx-5 h-20 flex justify-between items-center">
        <h2 className="font-extrabold text-primary text-2xl">Información</h2>
        <h3>{date}</h3>
      </section>
    </header>
  );
}