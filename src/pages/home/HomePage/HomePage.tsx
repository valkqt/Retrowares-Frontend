import { useState, useEffect } from "react";
import { Product } from "@/types";
import Showcase from "./Showcase/Showcase.tsx";
import Highlight from "./Highlight/Highlight.tsx";

// import Test from "../../../components/_temp/Test.tsx";


function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://localhost:7131/api/Products", { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json()).then(data => { setProducts(data) })

    }, [])
    return (
        <>
            {/* <Test /> */}
            <Highlight />
            <div>
                <h2 className="text-center">PC-98 Collection</h2>
                <div className="CardWrapper">
                    {products.slice(0,4).map(elem => {
                        return <Showcase key={elem.id} item={elem} />
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage;