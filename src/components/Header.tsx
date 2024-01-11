import { FC } from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-[#900d0d] px-9 flex">
        <nav className="mx-auto max-w-3xl h-20 flex items-center">
          <ul className="flex flex-row">
            <li className="font-bold font-serif text-3xl mx-5 text-[#ffdbc5]">
              <Link href="/">Главная</Link>
            </li>
            <li className="font-bold font-serif text-3xl mx-5 text-[#ffdbc5]">
              <Link href="/holdingEvent/add">Добавить мероприятие</Link>
            </li>
          </ul>
        </nav>
      </header>
  );
};