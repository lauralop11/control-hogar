import Form from "@components/cards/Form";
import BtnReturn from "@components/ui/BtnReturn";
export default function FormCard() {
  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <section>
        <h2 className="text-primary font-bold text-xl text-center mb-5">Agregar Tarjeta</h2>
        <Form/>
      </section>
    </>
  );
}
