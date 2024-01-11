import { FC, ReactNode } from "react";

import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }:LayoutProps) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#ffdbc5] pt-7 px-6">
        <div className="mx-auto max-w-5xl py-2">{children}</div>
      </main>
      <footer className="bg-[#900d0d] text-black py-16" />
    </>
  );
};