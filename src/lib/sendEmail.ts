"use server"
import {Resend} from "resend";
import ResetPasswordEmailTemplate from "@/fetaures/auth/components/ResetPasswordEmailTemplate";
import VerifyEmailTemplate from "@/fetaures/auth/components/VerifyEmailTemplate";



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

export const sendVerifyEmail = async (to:string[],subject:string,confirmLink:string)=>{
    try {

    const { data, error } = await resend.emails.send({
        from: 'Dev Forum <onboarding@resend.dev>',
        to,
        subject,
        react:VerifyEmailTemplate({companyName:"Dev Fourm",url:confirmLink}),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
} catch (error) {
    return Response.json({ error }, { status: 500 });
}
}