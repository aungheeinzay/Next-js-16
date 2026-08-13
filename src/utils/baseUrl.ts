export function getBaseUrl(){
    const env = process.env.NODE_ENV
    const baseUrl = env=="development" ? "http://localhost:3000" : ""
    return baseUrl
}