export function extrectHash(text:string){
    const match = text.match(/#[\p{L}\p{N}_]+/gu) ?? []
    return [...new Set(
        match.map((hash)=>hash.slice(1).toLocaleLowerCase())
    )]
}
