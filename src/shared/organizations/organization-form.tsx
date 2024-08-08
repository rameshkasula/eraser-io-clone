"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useOrganizationsStore } from "@/hooks/organizations-store";
import { toast } from "sonner";

let formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(5, { message: "Name should be at least 5 characters" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .min(5, { message: "Phone should be at least 5 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(5, { message: "Email should be at least 5 characters" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .min(5, { message: "Address should be at least 5 characters" }),
  website: z
    .string()
    .min(1, { message: "Website is required" })
    .min(5, { message: "Website should be at least 5 characters" }),
  city: z
    .string()
    .min(1, { message: "Province is required" })
    .min(5, { message: "Province should be at least 5 characters" }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .min(5, { message: "State should be at least 5 characters" }),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .min(5, { message: "Country should be at least 5 characters" }),
});

function OrganizationForm() {
  const organizationData = useOrganizationsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    organizationData
      .createOrganization(data)
      .then((res) => {
        console.log("res", res);
        toast.success("Organization created successfully");
        // @ts-ignore
        form.reset();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Organization creation failed");
      });
  };
  return (
    <main className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your organization name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Organization Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization address"
                          type="text"
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
                name="phone"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization phone"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your organization email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* <FormField
                control={form.control}
                name="website"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization website"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

          {/* <FormField
                control={form.control}
                name="city"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization city"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

          {/* <FormField
                control={form.control}
                name="state"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your organization country"
                      type="text"
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
            className="w-full my-3 "
            disabled={organizationData.isLoading}
          >
            {organizationData.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default OrganizationForm;
