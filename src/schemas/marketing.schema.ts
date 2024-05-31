import {
  EmailMarketingBodyProps,
  EmailMarketingProps,
} from "@/constants/types";
import { ZodType, z } from "zod";

export const EmailMarketingSchema: ZodType<EmailMarketingProps> = z.object({
  name: z
    .string()
    .min(3, { message: "The campaign name must be atleast 3 characters" }),
});

export const EmailMarketingBodySchema: ZodType<EmailMarketingBodyProps> =
  z.object({
    description: z
      .string()
      .min(30, { message: "The body must have atleast 30 characters" }),
  });
