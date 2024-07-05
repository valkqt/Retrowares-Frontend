import axios from 'axios'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 5000,
    headers: {"Content-Type": "application/json"}
})

export * from './products'
export * from "./highlights"
export * from "./stripe"
export * from "./orders"
export * from "./users"