'use client';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export function BtnReturn () {
  const back = () => {
    window.history.back()
  }
  return (
    <div className="flex justify-center items-center">
      <button className="button rounded-full" 
      onClick={() => {back()}} >
        <ArrowLeftIcon className="w-6 h-6"/>
      </button>
    </div>
  );
}