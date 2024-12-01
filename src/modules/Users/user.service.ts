import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import prisma from '../../utils/prisma';
import config from '../../config';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import { createToken } from '../../utils/verifyJWT';

const createAdmin = async (payload: {
  name: string;
  password: string;
  email: string;
}) => {
  // checking if the user is exist
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
      include: {
        admin: true,
      },
    });

    await tx.admin.create({
      data: {
        name: payload.name,
        email: user.email,
        profilePhoto:
          'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/83221961/original/425127947f0688643bcefba40b83c767b13e2a6a/illustrate-your-cartoon-avatar.jpg',
      },
    });

    return user;
  });

  //create token and sent to the  client

  const jwtPayload = {
    id: newUser.id as string,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const combinedResult = { accessToken, refreshToken, newUser };

  return combinedResult;
};

const createVendor = async (payload: {
  name: string;
  password: string;
  email: string;
}) => {
  // checking if the user is exist
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
      include: {
        vendor: true,
      },
    });

    await tx.vendor.create({
      data: {
        name: payload.name,
        email: user.email,
        profilePhoto:
          'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/83221961/original/425127947f0688643bcefba40b83c767b13e2a6a/illustrate-your-cartoon-avatar.jpg',
      },
      include: {
        user: true,
      },
    });

    return user;
  });

  //create token and sent to the  client

  const jwtPayload = {
    id: newUser.id as string,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const combinedResult = { accessToken, refreshToken, newUser };

  return combinedResult;
};

const createCustomer = async (payload: {
  name: string;
  password: string;
  email: string;
}) => {
  // checking if the user is exist
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
      include: {
        customer: true,
      },
    });

    await tx.customer.create({
      data: {
        name: payload.name,
        email: user.email,
        profilePhoto:
          'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/83221961/original/425127947f0688643bcefba40b83c767b13e2a6a/illustrate-your-cartoon-avatar.jpg',
      },
    });

    return user;
  });

  //create token and sent to the  client

  const jwtPayload = {
    id: newUser.id as string,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const combinedResult = { accessToken, refreshToken, newUser };

  return combinedResult;
};

export const userService = {
  createAdmin,
  createVendor,
  createCustomer,
};
