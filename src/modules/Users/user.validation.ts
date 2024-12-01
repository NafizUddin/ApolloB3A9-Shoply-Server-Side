import { UserStatus } from '@prisma/client';
import { z } from 'zod';

const createAdmin = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const createVendor = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const createCustomer = z.object({
  password: z.string(),
  patient: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email(),
    name: z.string({
      required_error: 'Name is required!',
    }),
    contactNumber: z.string({
      required_error: 'Contact number is required!',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const userValidation = {
  createAdmin,
  createVendor,
  createCustomer,
  updateStatus,
};
