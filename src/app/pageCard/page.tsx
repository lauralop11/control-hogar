"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BtnReturn } from "@components";
import { getCard } from "services/getCard";
import { CardCreate, Data } from "@app-types/types";
import { CreditCardIcon } from '@heroicons/react/24/solid';
import { getDataFilter } from "services/getData"; 


export default function CardsPage() {
  const [cardList, setCardList] = useState<CardCreate[] | null>(null);
  const [movementsList, setMovementsList] = useState<Data[] | null>(null);
  
  useEffect(() => {
    const getCardList = async () => {
      getCard().then((data) => {
        setCardList(data);
      });

      getDataFilter("expenses").then((data) => {
        setMovementsList(data);
      });
    }
    getCardList();
  }, []);

  function cycleDateFormat(endDate) {
    const newEndDate = new Date(endDate);
    const newEndDay = newEndDate.getUTCDate();

    const actualDate = new Date();
    const monthName = actualDate.toLocaleString('default', { month: 'short' });

    return `${newEndDay} / ${monthName}`
  }

  function getTotalAmount(cardName: string):string {
    const allMovementsByCard = movementsList?.filter(key => key.card === cardName);
    const totalAmount = allMovementsByCard?.reduce((sum, item) => sum + Number(item.amount), 0);
    return `$ ${totalAmount}`;
  } 

  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <div className="flex justify-around mx-10 items-center">
        <h2 className=" text-2xl font-extrabold m-3">Tarjetas</h2>
        <Link href="/pageCard/addCard">
          <button className="bg-primary text-white px-4 py-2 rounded-md ">
            Agregar Tarjeta
          </button>
        </Link>
      </div>
      <div className="card-list px-4">
        {
          cardList?.map(card => (
            <Link href={`/cards/cardDetails/${card.id}`} key={card.id}>
              <div className="card relative w-full bg-neutral-50/20 my-4 py-2 px-4 overflow-hidden">
                <p className="uppercase">
                  {card.name}
                </p>
                <p className="">
                  Fecha de corte de Tarjeta: <strong>{cycleDateFormat(card.date_end)}</strong>
                </p>
                <p className="">
                  Saldo: <strong>{ getTotalAmount(card.name) }</strong>
                </p>
                <CreditCardIcon className="text-neutral-50/20 size-36 absolute -top-4 right-1" />
              </div>
            </Link>
          ))
        }
      </div> 
    </>
  )
}