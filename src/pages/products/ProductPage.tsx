import { getProductById, getRelatedProducts } from "@/api";
import { Product } from "@/types.ts";
import css from "./ProductPage.module.css"
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { Interweave } from "interweave";
import { Button } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { useCart } from "@/contexts/CartContext";


function ProductPage() {
    const params = useParams()
    const [product, setProduct] = useState<Product>()
    const [isLoading, setIsLoading] = useState(true);
    const [related, setRelated] = useState<Product[]>([])
    const [, addToCart] = useCart();


    console.log("render")

    useEffect(() => {
        if (params.id) {
            const productId = parseInt(params.id, 10);
            getProductById(productId)
                .then(data => {
                    setProduct(data);
                    console.log(data)
                    getRelatedProducts("", data.genre, "")
                        .then(rel => setRelated(rel))
                })
                .finally(() => setIsLoading(false));
        }


    }, [params.id]);

    if (isLoading) {
        return "Loading ...";
    }

    if (product == null) {
        return <Navigate to="/" />
    }

    return <>
        <h1 className="text-center">{product.title}</h1>

        <section className={css.productContainer}>

            <div className={classNames(css.productImage)}>
                <img src={product.image} className="img-fluid" />
            </div>
            <div className={css.productInfo}>
                <div className="d-flex justify-content-between">
                    <div className={css.productPrice}>{product.price.toFixed(2)}$</div>
                    <div className="d-flex gap-3">
                        <div className={css.inStock}>
                            <div>In stock: 69</div>
                        </div>


                        <Button className="btn-danger" onClick={() => addToCart(product)}>
                            <Cart4 size={16} />
                        </Button>
                    </div>

                </div>
                <Interweave content={product.description} />


                <dl >
                    <dt>Genre:</dt>
                    <dd>{product.genre}</dd>
                    <dt>Platform:</dt>
                    <dd>{product.platform}</dd>
                    <dt>Website:</dt>
                    <dd>{product.officialUrl ?? "Not available"}</dd>

                </dl>

            </div>
        </section>
        <section>
            <h5>Sample Screenshots</h5>
            <div className={css.relatedSlider}>
                {product.screenshots.slice(0, 3).map(s => {
                    return (
                        <div key={s.id}>
                            <img src={s.url} className={css.productScreenshot} />
                        </div>
                    )
                })}
            </div>

        </section>
        <aside>
            <h5>Related Products</h5>
            <div className={css.relatedSlider}>
                {related.map(r => {
                    return (
                        <div key={r.id}>
                            <Link to={`/Products/${r.id}`} className="neuteredLink">
                                <div>
                                    <img src={r.image} className={css.relatedImage} />
                                </div>
                                <p>{r.title}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </aside>

    </>
}

export default ProductPage;