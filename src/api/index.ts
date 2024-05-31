import axios from 'axios'

export const instance = axios.create({
    baseURL: "http://retrowares.store/",
    // baseURL: "https://localhost:7131/",
    timeout: 2000,
    headers: {"Content-Type": "application/json"}
})


export * from './products'
export * from "./highlights"
export * from "./stripe"
export * from "./orders"