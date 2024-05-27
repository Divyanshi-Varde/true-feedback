import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Message must be atleast 10 characters long!")
    .max(300, "Message must be no longer than 300 characters!"),
});
