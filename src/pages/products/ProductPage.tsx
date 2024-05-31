import { getProductById, getRelatedProducts } from "@/api";
import { Product, Screenshot } from "@/types.ts";
import css from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { Interweave } from "interweave";
import { Button } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { useCart } from "@/contexts/CartContext";
import ScreenshotModal from "./ScreenshotModal/ScreenshotModal";
import { usePopup } from "@/contexts";

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);
  const [screenshotShow, setScreenshotShow] = useState(false);
  const [highlight, setHighlight] = useState<Screenshot>();
  const [, addToCart] = useCart();
  const [, setPopup, , setMessage] = usePopup();

  useEffect(() => {
    if (params.id) {
      const productId = parseInt(params.id, 10);
      getProductById(productId)
        .then((data) => {
          setProduct(data);
          getRelatedProducts("", data.genre, "").then((rel) => setRelated(rel));
        })
        .finally(() => setIsLoading(false));
    }
  }, [params.id]);

  if (isLoading) {
    return "Loading ...";
  }

  if (product == null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className={css.ProductTitle}>{product.title}</h1>

      <section className={css.productContainer}>
        <div className={classNames(css.productImage)}>
          <img src={product.image} className="img-fluid" />
        </div>

        <div className={css.ProductStock}>
          <div className="productPrice">
            <div>{product.price.toFixed(2)}$</div>
          </div>
          <div className="flexBetween gap-3">
            <div className={classNames(css.inStock)}>
              <div className="GenericFont">Stock: {product.stock}</div>
            </div>

            <Button
              className="btn-danger"
              onClick={() => {
                addToCart(product);
                setPopup(true);
                setMessage("Product added to cart");
              }}
            >
              <Cart4 size={16} />
            </Button>
          </div>
        </div>

        <dl className={css.ProductInfoList}>
          <dt>Genre:</dt>
          <dd>{product.genre}</dd>
          <dt>Platform:</dt>
          <dd>
            <Link
              to={`/Platforms/${product.platform}`}
              className="neuteredLink"
            >
              {product.platform}
            </Link>
          </dd>
          {/* <dt>Website:</dt>
                    <dd>{product.officialUrl ?? "Not available"}</dd> */}
          <dt>Release Date:</dt>
          <dd>{product.releaseDate ?? "Unknown"}</dd>
        </dl>
        <Interweave
          content={product.description}
          className={css.ProductDescription}
        />
      </section>
      <section>
        <h2 className="text-center darkHeader">Sample Screenshots</h2>
        <div className={css.ScreenshotContainer}>
          {product.screenshots.slice(0, 3).map((s) => {
            return (
              <div key={s.id}>
                <div
                  onClick={() => {
                    setScreenshotShow(true);
                    setHighlight(s);
                  }}
                >
                  <img src={s.thumbnail} className={css.productScreenshot} />
                </div>
              </div>
            );
          })}
        </div>
        {highlight && (
          <ScreenshotModal
            show={screenshotShow}
            onHide={() => setScreenshotShow(false)}
            item={highlight}
          />
        )}
      </section>
      <aside>
        <h2 className="text-center darkHeader">Related Products</h2>
        <div className={css.relatedSlider}>
          {related
            .filter((r) => r.id !== product.id)
            .map((r) => {
              return (
                <div key={r.id}>
                  <Link to={`/Products/${r.id}`} className="neuteredLink">
                    <div>
                      <img src={r.image} className={css.relatedImage} />
                    </div>
                    <div>{r.title}</div>
                  </Link>
                </div>
              );
            })}
        </div>
      </aside>
    </>
  );
}

export default ProductPage;
