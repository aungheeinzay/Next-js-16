export const ABOUTS = "/about"
export const POSTS = "/posts"
export const SINGLE_POSTS=(id: string | number)=>`${POSTS}/${id}`
export const EDIT_POST=(id:string)=>`${POSTS}/${id}/edit`