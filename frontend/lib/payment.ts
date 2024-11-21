"use server";

import { error } from "console";
import { start } from "repl";

export const handleOrder = async (previousState: any, formData: FormData) => {
  const pages = formData.get("pages");
  const paperType = formData.get("paperType");
  const paymentMethod = formData.get("paymentMethod");

  console.log({ pages, paperType, paymentMethod });

  return {
    errors: {
      pages: !pages ? "Please enter a valid number" : undefined,
      paperType: !paperType ? "Please select a paper type" : undefined,
      paymentMethod: !paymentMethod
        ? "Please select a payment method"
        : undefined,
    },
    start: false,
  };
};
