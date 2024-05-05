export async function getSearchResults(query: string): Promise<Product[]> {
    const res = await fetch(`https://localhost:7131/api/Products/Search?title=${query}`, 
    { 
        headers: { "Content-Type": "application/json" }, 
        method: "GET"
    })

    return await res.json()
}