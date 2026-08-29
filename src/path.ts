export const ABOUTS = "/about"
export const POSTS = "/posts"
export const SINGLE_POSTS=(id: string | number)=>`${POSTS}/${id}`
export const EDIT_POST=(id:string)=>`${POSTS}/${id}/edit`
export const SIGNUPPATH="/auth/signUp"
export const SIGNINPATH="/auth/signIn"
export const FORGETPASSWORD = "/auth/forgetPassword"
export const PROFILE="/profile"