import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  sex: z.string(),
  diagnosis_date: z.string(),
  created_at: z.string(),
  status: z.string(),
})

export type Subject = z.infer<typeof subjectSchema>
