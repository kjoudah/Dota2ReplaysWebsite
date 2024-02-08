"use client";
import ProSelector from "@/components/ProSelector/ProSelector";
import { useEffect, useState } from "react";

export const revalidate = 3600;
export default function HomePage() {
  const [proList, setProList] = useState(null);
  useEffect(async () => {
    const list = await fetch("./players").then((res) => res.json());
    setProList(list);
  }, []);

  return <main>{proList && <ProSelector proList={proList} />}</main>;
}
