import "../../types.ts"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
    const params = useParams()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        fetch(`https://localhost:7131/api/Products/${params.id}`, { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json()).then(data => { setProduct(data) })
    }, [])
    return <>
        <p>{product?.title}</p>
    </>
}

export default ProductPage;