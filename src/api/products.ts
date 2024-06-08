import { Product } from "@/types"
import { instance } from "./index"

export async function getAllProducts(): Promise<Product[]> {
    return instance.get("products").then(data => data.data)

}

export async function getSearchResults(query: string): Promise<Product[]> {

    return instance.get(`products/Search?title=${query}`).then(data => data.data)
}

export async function getProductById(id : number): Promise<Product> {
    
    return instance.get(`products/${id}`).then(data => data.data)

}

export async function getSpecialOffers(): Promise<Product[]> {

    return instance.get(`products/offers`).then(data => data.data)
}

export async function getRelatedProducts(title: string, genre: string, platform: string): Promise<Product[]>{

    return instance.get(`products/Search?title=${title}&genre=${genre}&platform=${platform}`).then(data =>  data.data)
}

