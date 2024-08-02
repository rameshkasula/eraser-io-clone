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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { axiosClient } from "@/utils/axios-helper";
import { useSession } from "next-auth/react";

type Props = {};

const TeamsForm = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = {
    email: "sQqXU@example.com",
    given_name: "John",
    family_name: "Doe",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxYjy7j6eWtZD3O2R8u9k7kZJtqS2Kq6uZ6Uv5gqYQ=s96-c",
    sub: "123",
    name: "John Doe",
    _id: "123",
  };
  const formSchema = z.object({
    name: z.string().min(1, { message: "Team name is required" }).min(5, {
      message: "Team name should be at least 5 characters",
    }),

    description: z
      .string()
      .min(1, { message: "Description is required" })
      .min(5, {
        message: "Description should be at least 5 characters",
      }),

    // Add more fields as needed
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleTeam = async (data: z.infer<typeof formSchema>) => {
    console.log("team data", data);
    setLoading(true);

    let payload = {
      name: data.name,
      description: data.description,
      createdBy: {
        email: session?.user?.email ?? "",
        name: session?.user?.name ?? "", // @ts-ignore
        id: session?.user?.id ?? "",
      },

      // @ts-ignore
      organizationId: session?.user?.organizationId ?? session?.user?.id ?? "",
    };

    // axios call
    try {
      const results = await axiosClient.post("/teams", payload);
      console.log("results", results.data);
      toast.success("Team has been created.");
      router.push(`/teams`);
    } catch (error) {
      console.log("error", error);

      // @ts-ignore
      toast.error(error?.message || "Error creating team");
    }
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Team Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter team description "
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
