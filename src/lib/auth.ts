

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {nextCookies} from "better-auth/next-js";
import {sendEmail} from "@/lib/sendEmail";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
    
  }),emailAndPassword:{
    enabled:true,
    sendResetPassword:async({user,url,token})=>{
      void sendEmail(
          [user.email],
          "Reset Your Password",
          user.name,
          url
      );
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    }

  },
  plugins:[
      nextCookies()
  ]
});


