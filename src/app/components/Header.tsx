'use client'

export default function Header() {
  const actuallyMonth = new Date().getMonth() + 1;
  const actuallyYear = new Date().getFullYear();
  const startDate = new Date (actuallyYear, actuallyMonth - 1, 20).toLocaleDateString();
  const endDate = new Date (actuallyYear, actuallyMonth, 19).toLocaleDateString();
  return (
    <header>
      <section className="mx-5 h-20 flex justify-around items-center">
        <h2 className="font-extrabold text-2xl">Cuentas App</h2>
        <h3>Ciclo de <span className="py-4 font-bold">{startDate}</span> a <span className="py-4 font-bold">{endDate}</span></h3>
      </section>
    </header>
  );
}