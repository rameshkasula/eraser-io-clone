"use client";

import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="grid h-screen px-4 bg-primary-500 place-content-center">
      <div className="text-center">
        <h1 className="font-black  text-primary-300 text-9xl">500</h1>

        <p className="text-2xl font-bold tracking-tight text-primary-900 sm:text-4xl">
          Something went wrong
        </p>

        <p className="mt-4 text-gray-500">Please try again later.</p>

        <Button
          //   type="button"
          className="mt-8 rounded-lg text-white "
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
