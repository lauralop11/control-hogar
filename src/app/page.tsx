"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Home from "@components/Home";

const Gastos = dynamic(() => import("@components/Gastos"), { ssr: false });

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);
  return (
    <div className="md:grid grid-cols-2 gap-2 justify-around">
      <Home/>
      { isDesktop && <Gastos/>}
    </div>
  );
}
