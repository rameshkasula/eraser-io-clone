import { Button } from "@/components/ui/button";
import TeamsForm from "@/shared/teams/teams-form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-2xl">Create Team</h2>
      </div>

      <section>
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              what should we call your team ?
            </h2>

            <p className="hidden text-secondary-foreground sm:mt-4 sm:block">
              You can always change this later from settings
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <TeamsForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
