import { Product } from "@/types"

export async function getSearchResults(query: string): Promise<Product[]> {
    const res = await fetch(`https://localhost:7131/api/Products/Search?title=${query}`, 
    { 
        headers: { "Content-Type": "application/json" }, 
        method: "GET"
    })

    return await res.json()
}

export async function getProductById(id : number): Promise<Product> {
    const res = await fetch(`http://andreabuzzanca-001-site3.jtempurl.com//api/Products/${id}`, { headers: { "Content-Type": "application/json" }, method: "GET" })
    
    return await res.json()

}

export async function getSpecialOffers(): Promise<Product[]> {
    const res = await fetch(`https://localhost:7131/api/Products/offers`, { headers: { "Content-Type": "application/json" }, method: "GET" })

    return await res.json()

}

export async function getRelatedProducts(title: string, genre: string, platform: string): Promise<Product[]>{

    const res = await fetch(`https://localhost:7131/api/Products/Search?title=${title}&genre=${genre}&platform=${platform}`, 
    { 
        headers: { "Content-Type": "application/json" }, 
        method: "GET"
    })

    return await res.json()
}

