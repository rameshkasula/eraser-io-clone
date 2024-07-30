/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="mx-auto flex flex-col items-baseline justify-center max-w-screen-xl px-4 py-32 lg:flex lg:max-h-screen lg:items-center">
      <h2 className="text-center p-2 px-3 rounded-full  border">
        see what's new |{" "}
        <span className="font-bold text-primary cursor-pointer ">
          {" "}
          AI diagrams{" "}
        </span>{" "}
      </h2>
      <div className="mx-auto max-w-xl text-center py-5">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Documents & Diagrams
          <strong className="font-extrabold text-gray-700 sm:block">
            {" "}
            for engineering teams.{" "}
          </strong>
        </h1>

        <p className="mt-4 sm:text-xl/relaxed">
          All-in-one markdown editor, collaborative canvas, and diagram-as-code
          builder
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="default" className="px-12 py-3 border-primary ">
            Try Eraser <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>

          <Button variant="outline" className="px-12 py-3 border-primary ">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
