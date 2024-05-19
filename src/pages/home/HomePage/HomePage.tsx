import { useState, useEffect } from "react";
import { Product } from "@/types";
import Showcase from "../Showcase/Showcase.tsx";
import Highlight from "./Highlight/Highlight.tsx";
import { Spinner } from "react-bootstrap";

// import Test from "../../../components/_temp/Test.tsx";


function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://andreabuzzanca-001-site3.jtempurl.com//api/Products", { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json()).then(data => { setProducts(data); setLoading(false) })

    }, [])
    return (
        <>
            {/* <Test /> */}

            <Highlight />
            {loading && <div className="text-center">
                <Spinner variant="dark"/>
            </div>}
            <div>
                <h2 className="text-center">PC-98 Collection</h2>
                <div className="CardWrapper">
                    {products.slice(0, 4).map(elem => {
                        return <Showcase key={elem.id} item={elem} />
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage;