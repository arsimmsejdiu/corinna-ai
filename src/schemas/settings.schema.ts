import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/constants/constant";
import {
  AddDomainProps,
  AddProductProps,
  DomainSettingsProps,
  FilterQuestionsProps,
  HelpDeskQuestionsProps,
} from "@/constants/types";
import { ZodType, z } from "zod";

export const AddDomainSchema: ZodType<AddDomainProps> = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Your file size must be less then 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG & PNG are accepted file formats",
    }),
});

export const DomainSettingsSchema: ZodType<DomainSettingsProps> = z
  .object({
    domain: z
      .string()
      .min(4, { message: "A domain must have atleast 3 characters" })
      .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
        "This is not a valid domain"
      )
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, "The message must be atleast 6 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .refine(
    (schema) => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true;
        }
      }
      if (!schema.image?.length) {
        return true;
      }
    },
    {
      message:
        "The fill must be less then 2MB, and on PNG, JPEG & JPG files are accepted",
      path: ["image"],
    }
  );

export const HelpDeskQuestionsSchema: ZodType<HelpDeskQuestionsProps> =
  z.object({
    question: z.string().min(1, { message: "Question cannot be left empty" }),
    answer: z.string().min(1, { message: "Question cannot be left empty" }),
  });

export const FilterQuestionsSchema: ZodType<FilterQuestionsProps> = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
});

export const AddProductSchema: ZodType<AddProductProps> = z.object({
  name: z
    .string()
    .min(3, { message: "The name must have atleast 3 characters" }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Your file size must be less then 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG & PNG are accepted file formats",
    }),
  price: z.string(),
});
