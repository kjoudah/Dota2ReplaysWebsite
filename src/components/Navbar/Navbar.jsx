"use client";
import { Menubar } from "primereact/menubar";
import Link from "next/link";

const Navbar = () => {
  const itemRenderer = (item) => {
    return (
      <Link className="p-16" href={item.href}>
        {item.label}
      </Link>
    );
  };
  const items = [
    {
      label: "Search by player",
      href: "/",
      template: itemRenderer,
    },
    {
      label: "Search by hero",
      href: "/hero",
      template: itemRenderer,
    },
  ];
  return <Menubar className="p-8" model={items} />;
};

export default Navbar;
