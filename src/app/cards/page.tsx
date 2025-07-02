"use client";
import Link from "next/link";
import BtnReturn from "@components/ui/BtnReturn";
import { getCard } from "@lib/getCard";
import { useEffect, useState } from "react";
import { CardCreate, Data } from "@app-types/types";
import { getDataFilter } from "@lib/getData";


export default function CardsPage() {

  const [cardList, setCardList] = useState<CardCreate[] | null>(null);
  const [movementsList, setMovementsList] = useState<Data[] | null>(null);
  
  useEffect(() => {
    const getCardList = async () => {
      getCard().then((data) => {
        console.log('FELIPE !! ---------');
        console.log('lista de tarjetas: ', data);
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

  function getTotalAmount(cardName: string):number {
    const allMovementsByCard = movementsList?.filter(key => key.card === cardName);
    const totalAmount = allMovementsByCard?.reduce((sum, item) => sum + Number(item.amount), 0);
    return totalAmount ?? 0;
  }

  function getUsedPercentage(amountUsed:number, capacity:string) {
    if (amountUsed === undefined || amountUsed === null || capacity === undefined || capacity === null || capacity === '') {
      return 0;
    }
    const result = amountUsed * 100 / Number(capacity);
    return result === Infinity ? 0 : result;
  }

  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <div className="cards-section bg-test h-screen -mt-[10px]">
        <div className="section-content backdrop-blur-sm h-screen w-screen p-4 text-neutral-50">
          <div className="flex justify-between items-center">
            <h2 className="section-title text-3xl flex justify-between">
              Lista de Tarjetas
            </h2>
            <Link href="/cards/addCard">
              <button className="bg-orange-400 rounded-xl font-light py-2 px-3">
                Agregar Tarjeta
              </button>
            </Link>
          </div>
          <div className="card-list mt-4 flex flex-col gap-4">
            {
              cardList?.map(card => (
                <Link href={`/cards/cardDetails/${card.id}`} key={card.id}>
                  <div className="card p-4 bg-neutral-300/10 rounded-xl">
                    <p className="text-2xl">{ card.name }</p>
                    <p className="text-sm">Fecha fin de ciclo: { cycleDateFormat(card.date_end) }</p>
                    <p className="text-xl">
                      Total a pagar: ${ getTotalAmount(card.name) }
                    </p>
                    
                    <div className="progress-bar mt-4 flex justify-between items-center gap-4">
                      <div className="bar w-full">
                        <div className="capacity h-[2px] w-full bg-neutral-50/25 rounded-xl"></div>
                        <div className="
                          used
                          h-[2px]
                          -mt-[2px]
                          bg-orange-400"
                          style={{ width: getUsedPercentage(getTotalAmount(card.name), card.capacity) + '%' }}
                        ></div>
                      </div>
                      <div className="value">
                        <span>{ getUsedPercentage(getTotalAmount(card.name), card.capacity).toFixed(2) + '%' }</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}