import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import {sendEmail, sendVerifyEmail} from "@/lib/sendEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailVerification:{
    sendVerificationEmail: async ( { user, url, token }, request) => {
      void sendVerifyEmail(
        [user.email],
          "Verify your email",
          url
      )
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification:true,

    sendResetPassword: async ({ user, url, token }) => {
      void sendEmail(
          [user.email],
          "Reset Your Password",
          user.name,
          url
      );
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  accountLinking: {
    enabled: true,
    trustedProviders: ["github","google"],
  },

  plugins: [
    nextCookies()
  ]
});