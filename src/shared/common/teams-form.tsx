"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {};

const TeamsForm = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Team name is required" }).min(5, {
      message: "Team name should be at least 5 characters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const createTeam = useMutation(api.team.createTeam);

  const handleTeam = async (data: z.infer<typeof formSchema>) => {
    console.log("team data", data);
    setLoading(true);
    createTeam({
      teamName: data.name,
      createdBy: user?.email,
    })
      .then((res) => {
        console.log("res", res);
        toast("Team has been created.");
        router.push(`/teams`);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err?.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <main className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleTeam)} // Corrected here
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter team name "
                      type="text"
                      className="py-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            disabled={loading}
            className="px-12 py-6 gap-4  text-sm font-medium border-primary "
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default TeamsForm;
