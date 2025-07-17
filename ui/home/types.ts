import { z } from "zod"

export const schema = z.object({
  full_name: z.string().min(1, "Họ và tên không được để trống"),
  personal_id: z.string().min(1, "Số CCCD không được để trống"),
  predict_number: z.string().length(3, "Số dự đoán phải có 3 chữ số"),
})

export type IForm = z.infer<typeof schema>
