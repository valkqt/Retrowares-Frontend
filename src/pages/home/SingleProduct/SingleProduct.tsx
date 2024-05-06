import { Link } from "react-router-dom";
import "../../../types"
import css from "./SingleProduct.module.css"
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Cart4, PlusLg } from "react-bootstrap-icons";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";


function SingleProduct({ product }: { product: Product }) {
    const [, addToCart] = useCart();
    return (

        <Card style={{ width: '18rem' }} className="d-flex flex-column">
            <Link to={`/Products/${product.id}`} className="CardLink">
                <div>
                    <Card.Img variant="top" src={product.image} className={css.ProductCardImage} />
                </div>
            </ Link>
            <Card.Body className="d-flex flex-column">
                <Card.Title>
                    <Link to={`/Products/${product.id}`} className="CardLink">
                        {product.title}
                    </Link>
                </Card.Title>
                <div className={css.CardColumnBetween + " flex-grow-1"}>
                    <div className={css.TextBetween}>
                        <p>
                            <Link to={`/Platforms/${product.platform}`} className="CardLink">
                                {product.platform}
                            </Link>
                        </p>
                        <p>{product.price.toFixed(2)}$</p>
                    </div>
                    <div className={css.TextBetween}>
                        <div>{product.genre}</div>
                        <Button className="btn-danger" onClick={() => {addToCart(product)}}> <PlusLg size={16}></PlusLg><Cart4 size={16}></Cart4></Button>
                    </div>
                </div>
            </Card.Body>
        </Card >
    )
}

export default SingleProduct;