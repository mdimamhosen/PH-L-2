import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty(),
  year: z
    .string({
      required_error: "Year is required",
    })
    .nonempty(),
  startMonth: z
    .string({
      required_error: "Start Month is required",
    })
    .nonempty(),
  endMonth: z
    .string({
      required_error: "End Month is required",
    })
    .nonempty(),
});
