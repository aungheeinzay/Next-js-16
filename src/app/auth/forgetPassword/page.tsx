import ForgetPasswordForm from "@/fetaures/auth/components/ForgetPasswordForm";
import {resetPasswordAction} from "@/fetaures/auth/action/resetPassword";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Heading from "@/components/Heading";

export default function Page(){
    return(
        <Card>
            <CardHeader>
                <Heading
                    title={"Forget Password"}
                    description={"we sent the reset password link to your email.check inbox!"}/>
            </CardHeader>
            <CardContent>
                <ForgetPasswordForm actionFun={resetPasswordAction}/>
            </CardContent>
        </Card>

    )
}