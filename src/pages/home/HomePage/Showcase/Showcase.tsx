import { Product } from "@/types";
import { useState } from "react";
import css from "./Showcase.module.css";
import classNames from "classnames";
import { Interweave } from "interweave";

export default function Showcase({ item }: { item: Product }) {
    // const [product, setProduct] = useState<Product>()
    const [hover, setHover] = useState(false)


    // useEffect(() => {
    //     fetch("https://localhost:7131/api/Products/225", { headers: { "Content-Type": "application/json" }, method: "GET" })
    //         .then(res => res.json()).then(data => { setProduct(data) })

    // }, [])


    return <>
        {
            item && <div>
                <div className={css.ShowcaseWrapper} >
                    <div className={"position-relative"} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className={css.ShowcaseImageWrapper}>
                            {/* <Link to={`/Products/${item.id}`} className={css.ShowcaseLink}> */}
                            <img src={item.image} className={css.ShowcaseImage} />
                            <div className={classNames(css.ShowcaseHover, hover ? "" : "toggleDisplay")}>
                                <h4>{item.title}</h4>
                                <div className="productPrice">{item.price}$</div>
                                <div>{item.platform}</div>

                                <div>{item.genre}</div>
                                <div className="mt-3">
                                    <div className={css.ShowcaseDescription}>
                                        <Interweave content={item.description} />
                                    </div>
                                </div>
                                <div>30% Off</div>
                                <div className={css.TextFading}>Go to product page</div>
                            </div>
                            <div className={classNames(css.ShowcaseSummary, hover ? css.toggleSummary : "")}>
                                <div className={classNames("flexBetween", "gap-3")}>
                                    <div>{item.title}</div>
                                    <div className="productPriceSmallest">{item.price}$</div>
                                </div>
                            </div>
                            {/* </Link> */}

                        </div>

                    </div>

                </div>


            </div>
        }
    </>

}