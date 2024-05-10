import { Link } from "react-router-dom";
import { Product } from "@/types"
import css from "./SingleProduct.module.css"
import { Button } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { useCart } from "@/contexts/CartContext";


function SingleProduct({ product }: { product: Product }) {
    const [, addToCart] = useCart();
    return (

        <div style={{width: "18rem"}} className="d-flex flex-column CustomCard">
            <Link to={`/Products/${product.id}`} className="">
                <div>
                    <img src={product.image} className={css.ProductCardImage} />
                </div>
            </ Link>
            <div className={css.CardContents}>
                <div>
                    <Link to={`/Products/${product.id}`} className="neuteredLink">
                        <h4>{product.title}</h4>
                    </Link>
                </div>
                <div className={css.CardColumnBetween + " flex-grow-1"}>
                    <div className={css.TextBetween}>
                        <p>
                            <Link to={`/Platforms/${product.platform}`} className="neuteredLink">
                                {product.platform}
                            </Link>
                        </p>
                        <p className="productPriceSmall">{product.price.toFixed(2)}$</p>
                    </div>
                    <div className={css.TextBetween}>
                        <div>{product.genre}</div>
                        <Button className="btn-danger" onClick={() => {addToCart(product)}}> <Cart4 size={16}></Cart4></Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SingleProduct;