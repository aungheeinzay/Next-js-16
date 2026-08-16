import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Heading from "@/components/Heading";
import ChangePasswordForm from "@/fetaures/auth/components/ChangePasswordForm";
import {changePasswordAction} from "@/fetaures/auth/action/changePassword";

export default function Page(){
    return (
        <Card>
            <CardHeader>
                <Heading
                    title={"Change Password"}
                    description={"add new password and sign in with these password"}
                />
            </CardHeader>
            <CardContent>
                <ChangePasswordForm actionFun={changePasswordAction}/>
            </CardContent>
        </Card>
    )
}