"use client"

import Center from "@/components/center";
import Left from "@/components/left";
import Right from "@/components/right";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [isOpenRightPanel, setIsOpenRightPane] = useState(false)

  const assOPen = () => setIsOpenRightPane(!isOpenRightPanel)

  return (
    <div className="font-sans min-w-screen min-h-screen flex box-border">
      <div className="flex !w-[500px] shadow-2xl box-border">
        <Left />
      </div>
      <div className="flex w-full">
        <Center props={{ setOpen: assOPen }} />
      </div>
      {
        isOpenRightPanel ?       <div className="w-1/5 border-l-2 min-h-screen bg-amber-300">
        <Right />
      </div> : ""
      }
    </div>
  );
}
