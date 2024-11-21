"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleOrder } from "@/lib/payment";

import React from "react";

export default function PaymentCard() {
  const [state, formAction] = React.useActionState(handleOrder, {
    errors: {},
    start: true,
  });
  const [formState, setFormState] = React.useState({
    pages: 0,
    paperType: "",
    paymentMethod: "",
  });
  return (
    <div className="w-[calc(100vw-16rem)] flex items-center justify-center pt-10 ">
      <Card className="w-[600px] shadow-neutral-400 shadow-md">
        <CardHeader>
          <CardTitle>Let's get yourself some pages</CardTitle>
          <CardDescription>Let's buy page</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formAction}>
            <div className="grid w-full items-center gap-4">
              <div className="flex space-y-1.5 justify-between px-2 items-center">
                <label htmlFor="pages">Number of Pages</label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  placeholder="Number of pages"
                  className="py-2 w-[300px] text-center"
                />
              </div>
              <div className="flex space-y-1.5 justify-between px-2 items-center">
                <label htmlFor="paperType">Type of paper</label>
                <Select
                  name="paperType"
                  onValueChange={(value: string) => {
                    setFormState((prev) => ({ ...prev, paperType: value }));
                  }}
                >
                  <SelectTrigger
                    id="paperType"
                    className="w-[300px] text-md text-center flex justify-center"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-y-1.5 justify-between px-2 items-center">
                <label htmlFor="paymentMethod">Payment method</label>
                <Select
                  name="paymentMethod"
                  onValueChange={(value: string) => {
                    setFormState((prev) => ({ ...prev, paymentMethod: value }));
                  }}
                >
                  <SelectTrigger
                    id="paymentMethod"
                    className="w-[300px] text-md text-center flex justify-center"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {!state.errors.pages &&
              !state.errors.paperType &&
              !state.errors.paymentMethod &&
              !state.start && (
                <div className="flex justify-between w-full px-2 pt-8 items-center">
                  <div>TOTAL</div>
                  <div>200</div>
                </div>
              )}

            <div className="mt-2 text-red-500" id="warningMessage">
              <p>{state.errors.pages}</p>
              <p>{state.errors.paperType}</p>
              <p>{state.errors.paymentMethod}</p>
            </div>

            <Button className="w-[100%] mt-8 text-sm">Check Price</Button>
          </form>
          {!state.errors.pages &&
            !state.errors.paperType &&
            !state.errors.paymentMethod &&
            !state.start && (
              <div className="w-full flex justify-end">
                <Button className="mt-4" variant="link">
                  Pay Now
                </Button>
              </div>
            )}
        </CardContent>
        {/* total amout */}
      </Card>
    </div>
  );
}
