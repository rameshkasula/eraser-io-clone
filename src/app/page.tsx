"use client";

import Banner from "@/shared/layouts/Banner";
import Header from "@/shared/layouts/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <div className="bg-indigo-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Love Kasz.io ?
          <Link href="/pricing" className="mx-3 inline-block underline">
            Check out our plans!
          </Link>
        </p>
      </div>
      <Header />
      <Banner />
    </main>
  );
}
