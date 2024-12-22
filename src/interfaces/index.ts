import { z } from "zod";

// register
export const registerschema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(["ROLE_USER", "ROLE_ADMIN"])
});

export type Register = z.infer<typeof registerschema>;

// login
export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type Login = z.infer<typeof loginSchema>;


// user
// Enum pour les rôles
export const RoleEnum = z.enum(["ROLE_USER", "ROLE_ADMIN"]);

export const UserSchema = z.object({
  id: z.number(), 
  username: z.string(),
  password: z.string(),
  role: RoleEnum,
});

export type User = z.infer<typeof UserSchema>;


export const createUserSchema = UserSchema.extend({
  id: z.number().optional(), 
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = UserSchema.partial().extend({
  idUserUpdt: z.number().optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;


//insurance

export const InsuranceSchema = z.object({
  id: z.number(), 
  name: z.string() ,
  description: z.string(),
  amount: z.number().positive({ message: "The amount must be a positive number" }),
});

export type Insurance = z.infer<typeof InsuranceSchema>;


export const createInsuranceSchema = InsuranceSchema.extend({
  id: z.number().optional(), 
});

export type CreateInsurance = z.infer<typeof createInsuranceSchema>;


export const updateInsuranceSchema = InsuranceSchema.partial().extend({
  idInsuranceUpdt: z.number().optional(),
});

export type UpdateInsurance = z.infer<typeof updateInsuranceSchema>;



// Subscriptions
export const SubscriptionSchema = z.object({
  id: z.number(), 
  subscriptionDate: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      { message: "Subscription date must be in the format YYYY-MM-DD" }
    ),
  coverageStartDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      { message: "Coverage start date must be in the format YYYY-MM-DD" }
    ),
  coverageEndDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      { message: "Coverage end date must be in the format YYYY-MM-DD" }
    ),
  totalAmount: z
    .number()
    .positive({ message: "The total amount must be a positive number" }),
  product: InsuranceSchema,
  user: UserSchema, 
});

export type Subscription = z.infer<typeof SubscriptionSchema>;


export const createSubscriptionSchema = SubscriptionSchema.extend({
  id: z.number().optional(), 
  product: z.number(), 
  user: z.number(), 
});

export type CreateSubscription = z.infer<typeof createSubscriptionSchema>;

export const updateSubscriptionSchema = SubscriptionSchema.partial().extend({
  idSubscriptionUpdt: z.number().optional(),
});

export type UpdateSubscription = z.infer<typeof updateSubscriptionSchema>;


