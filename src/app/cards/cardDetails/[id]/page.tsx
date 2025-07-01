"use client";
import BtnReturn from "@components/ui/BtnReturn";
import { CreditCardIcon } from '@heroicons/react/24/solid';
import { getCard } from "@lib/getCard";
import { useEffect, useState } from "react";
import { CardCreate, Data } from "@app-types/types";
import { getDataFilter } from "@lib/getData";
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


  useEffect(() => {
    const getCardList = async () => {
      getCard().then((data) => {
        const dataFiltered = data.find(key => key.id == id);
        console.log('selected card: ', dataFiltered);
        setCard(dataFiltered);
      });

      getDataFilter("expenses").then((data) => {
        setMovementsList(data);
      });
    }
    getCardList();
  }, []);

  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <div className="card-details">
        <CreditCardIcon />
        <p className="
          text-3xl
          absolute
          text-neutral-50
          top-7
          left-9">
          {Card?.name}
        </p>
        <p className="absolute bottom-19 left-12 text-sm font-bold" style={{ color: Card?.color }}>
          {cycleDateFormat(Card?.date_end)}
        </p>
        <p className="text-neutral-50 text-2xl absolute bottom-10 right-6">
          { getTotalAmount(Card?.name) }
        </p>
      </div>
    </>
  )
}