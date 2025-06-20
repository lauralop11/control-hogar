'use client';
import Image from 'next/image';

export default function BtnReturn () {
  const back = () => {
    window.history.back()
  }
  return (
    <div className="flex justify-center items-center">
      <button className="text-white font-bold pt-1 px-4 rounded" 
      onClick={() => {back()}} >
        <Image src="/icons/return.svg" width={30} height={30} alt="Return"/>
      </button>
    </div>
  );
}