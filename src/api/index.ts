import axios from 'axios'

export const instance = axios.create({
    baseURL: "//retrowares.store/api/",
    // baseURL: "https://localhost:7131/",
    timeout: 5000,
    headers: {"Content-Type": "application/json"}
})

export * from './products'
export * from "./highlights"
export * from "./stripe"
export * from "./orders"
export * from "./users"