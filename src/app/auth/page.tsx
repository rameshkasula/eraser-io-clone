"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  Building2Icon,
  ChevronDownIcon,
  StoreIcon,
  User2Icon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const appearanceFormSchema = z.object({
  account: z.enum(["BUSINESS", "PERSONAL"], {
    required_error: "Please select account type.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
  account: "PERSONAL",
};

export default function AppearanceForm() {
  const router = useRouter();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    console.log("lllllllllllllll", data);

    if (data.account === "PERSONAL") {
      router.push("/auth/sign-up");
    } else {
      router.push("/auth/organization");
    }
    // toast.success("Appearance updated");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center  ">
      <div className="max-w-md w-full lg:max-w-2xl items-center justify-center ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="space-y-1 ">
                  <FormLabel>Account</FormLabel>
                  <FormDescription>
                    Please select your account type.
                  </FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-2 gap-12 pt-2 justify-center "
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem
                            value="PERSONAL"
                            className="sr-only"
                          />
                        </FormControl>
                        <div
                          className="items-center rounded-md border-2 border-muted p-1
                        h-4/5 hover:border-accent"
                        >
                          <div className="items-center justify-center flex flex-1 my-10  ">
                            <User2Icon className="h-16 w-16" />
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          PERSONAL
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem
                            value="BUSINESS"
                            className="sr-only"
                          />
                        </FormControl>
                        <div
                          className="items-center rounded-md border-2 border-muted p-1
                        h-4/5 hover:border-accent"
                        >
                          <div className="items-center justify-center flex flex-1 my-10  ">
                            <StoreIcon className="h-16 w-16" />
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          BUSINESS
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <Button type="submit">
              Next <ArrowRightIcon className="ml-2 h-4 w-4" />{" "}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
