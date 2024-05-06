import { useState, useEffect } from "react";
import SingleProduct from "../SingleProduct/SingleProduct.tsx";
import "../../../types.ts"
import css from "./HomePage.module.css"
import { Product } from "@/types";

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
            <div className={css.CardWrapper}>
                {products.map(elem => {
                    return <SingleProduct key={elem.id} product={elem}></SingleProduct>
                })}
            </div>
        </>
    )
}

export default HomePage;