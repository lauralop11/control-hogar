import Link from "next/link";
import BtnReturn from "@components/ui/BtnReturn";

export default function CardsPage() {
  return (
    <>
     <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <div className="flex justify-around mx-10">
        <h2 className="text-red-700 text-2xl font-extrabold m-3">Tarjetas</h2>
        <Link href="/cards/addCard">
          <button className="bg-primary text-white px-4 py-2 rounded-md ">
            Agregar Tarjeta
          </button>
        </Link>
      </div>
    </>
  )
}