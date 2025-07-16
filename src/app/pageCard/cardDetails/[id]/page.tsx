"use client";
import BtnReturn from "@components/ui/BtnReturn";
import { CreditCardIcon } from '@heroicons/react/24/solid';
import { getCard } from "services/getCard";
import { useEffect, useState } from "react";
import { CardCreate, Data } from "@app-types/types";
import { getDataFilter } from "services/getData";
import { useParams } from "next/navigation";

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
      <div className="card-details relative">
        <CreditCardIcon style={{ color: Card?.color }} />
        <p className="
          text-6xl
          absolute
          text-neutral-50
          top-16
          left-19">
          {Card?.name}
        </p>
        <p className="absolute bottom-39 left-20 text-lg font-bold" style={{ color: Card?.color }}>
          {cycleDateFormat(Card?.date_end)}
        </p>
        <p className="text-neutral-50 text-5xl absolute bottom-22 right-10">
          { getTotalAmount(Card?.name) }
        </p>
      </div>
      <div className="card-movements">
        <h3 className="text-center text-xl">Movimientos</h3>
        <div className="movements-list" style={{ background: Card?.color }}>
          {
            MovementsList?.map(movement => movement.card == Card?.name ? (
              <div className="movement text-neutral-50 flex justify-around py-2" key={movement.id}>
                <span>{formatDate(movement.date)}</span>
                <span>{movement.description}</span>
                <span>$ {movement.amount}</span>
              </div>
            ): '')
          }
        </div>
      </div>
    </>
  )
}