"use server"
import {Resend} from "resend";
import ResetPasswordEmailTemplate from "@/fetaures/auth/components/ResetPasswordEmailTemplate";



const resend = new Resend(process.env.RESENT_API_KEY)


export const sendEmail=async (to:string[],subject:string,name:string,resetPasswordLink:string)=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'Dev Forum <onboarding@resend.dev>',
            to,
            subject,
            react:ResetPasswordEmailTemplate({userFirstname:name,resetPasswordLink}),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}