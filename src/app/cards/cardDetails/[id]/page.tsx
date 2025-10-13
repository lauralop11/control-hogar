"use client";
import BtnReturn from "@components/ui/BtnReturn";
import { CreditCardIcon } from '@heroicons/react/24/solid';
import { getCard } from "@lib/getCard";
import { useEffect, useState } from "react";
import { CardCreate, Data } from "@app-types/types";
import { getDataFilter } from "@lib/getData";
import { useParams } from "next/navigation";
import "./cardDetails.css";

type Params = {
  id: string;
}

export default function CardDetails() {
  const [Card, setCard] = useState<CardCreate | null>(null);
  const [MovementsList, setMovementsList] = useState<Data[] | null>(null);
  const Params = useParams() as Params;
  const {id} = Params;

  function cycleDateFormat(endDate) {
    const newEndDate = new Date(endDate);
    const newEndDay = newEndDate.getUTCDate();

    const actualDate = new Date();
    const monthName = actualDate.toLocaleString('default', { month: 'short' });

    return `${newEndDay} / ${monthName}`
  }

  function getTotalAmount(cardName) {
    const allMovementsByCard = MovementsList?.filter(key => key.card === cardName);
    const totalAmount = allMovementsByCard?.reduce((sum, item) => sum + Number(item.amount), 0);
    return `$ ${totalAmount}`;
  }

  function formatDate(unformattedDate) {
    const isoString = unformattedDate;
    const date = new Date(isoString);

    const formatted = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);

    return formatted
  }


  useEffect(() => {
    const getCardList = async () => {
      getCard().then((data) => {
        const dataFiltered = data.find(key => key.id == id);
        setCard(dataFiltered);
      });

      getDataFilter("expenses").then((data) => {
        setMovementsList(data);
      });
    }
    getCardList();
  }, [id]);

  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <div className="card-details-section bg-test h-screen -mt-[10px]">
        <div className="section-content section-content backdrop-blur-sm h-screen w-screen p-4 text-neutral-50">
          <div className="card-details relative">
            <div className="card-header flex justify-start items-center gap-4 mb-4">
              <CreditCardIcon className="w-15 opacity-50" style={{ color: Card?.color }} />
              <p className="
                text-6xl
                text-neutral-50
                top-16
                left-19">
                {Card?.name}
              </p>
            </div>
            <div className="amount-to-pay p-18 relative">
              <p className="text-neutral-50 text-5xl flex flex-col justify-center items-center gap-0 absolute top-[50%] left-0 right-0 -mt-[34px]">
                <span>{ getTotalAmount(Card?.name) }</span>
                <small className="text-sm font-light">Total a pagar</small>
              </p>
            </div>
            <div className="dates my-4 p-4 bg-neutral-300/10 rounded-xl">
              <p className="bottom-39 left-20 text-lg font-light text-center">
                Fecha de corte: {cycleDateFormat(Card?.date_end)}
              </p>
            </div>
          </div>
          <div className="card-movements">
            <h3 className="text-center text-xl mb-4">Movimientos</h3>
            <div className="movements-list p-2">
              {
                MovementsList?.map(movement => movement.card == Card?.name ? (
                  <div className="movement text-neutral-50 flex justify-around py-2 even:bg-neutral-300/10 odd:bg-neutral-300/15 first:rounded-t-xl last:rounded-b-xl" key={movement.id}>
                    <span>{formatDate(movement.date)}</span>
                    <span>{movement.description}</span>
                    <span>$ {movement.amount}</span>
                  </div>
                ): '')
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}