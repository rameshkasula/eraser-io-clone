"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DateRangePicker from "../common/date-range-picker";
import { DateRange } from "react-day-picker";
import moment from "moment";
import { useFiltersStore } from "@/hooks/filters-store";

function Filters() {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    search,
    setSearch,
  }: any = useFiltersStore();

  const [searchValue, setSearchValue] = React.useState(search);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate, // Initialize with Moment.js...toDate(), // Initialize with Moment.js
    to: endDate, // Add days using Moment.js
  });

  // Add days using Moment.js
  const handleApply = () => {
    console.log("Apply");

    setStartDate(date?.from);
    setEndDate(date?.to);

    setSearch("");
  };

  // handle reset
  const handleReset = () => {
    console.log("reset");

    setStartDate(moment().toDate());
    setEndDate(moment().toDate());

    setSearch("");
  };

  return (
    <main className="flex justify-between max-w-screen-xl">
      <div className="flex items-center gap-6">
        <DateRangePicker date={date} setDate={setDate} />
        <Input
          // @ts-ignore
          size={"sm"}
          className="w-[200px]"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <Button
          size={"sm"}
          variant="outline"
          className="px-2 border-primary"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          size={"sm"}
          variant="default"
          className="px-4 "
          onClick={handleApply}
        >
          Apply{" "}
        </Button>
      </div>
    </main>
  );
}

export default Filters;
