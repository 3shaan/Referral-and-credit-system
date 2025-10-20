import { z } from "zod";
export const referralSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  referrerId: z.string().regex(/^[0-9a-f]{24}$/),
  referredId: z.string().regex(/^[0-9a-f]{24}$/),
  status: z.enum(['pending', 'converted']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})

export const createReferralSchema = referralSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true
});


// interface

export type Referral = z.infer<typeof referralSchema>;
export type CreateReferral = z.infer<typeof createReferralSchema>
