import { useState, useEffect } from "react"
import { Product } from "@/types.ts"
import { Link } from "react-router-dom"
import css from "./Highlight.module.css"
import classNames from "classnames"

interface Highlight {
    title: string,
    text: string,
    timestamp: string,
    relations: Product[],
}

function Relation({ relation }: { relation: Product }) {
    const [hover, setHover] = useState(false)

    return (<div className="position-relative">
        <Link to={`/Products/${relation.id}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <img src={relation.image} className="img-fluid" />
        </Link>
        <div className={classNames({ "toggleDisplay": !hover }, css.FeatureRelation)}>
            <h5>{relation.title}</h5>
            <div className="productPriceSmall">{relation.price}$</div>
            <div>{relation.platform}</div>
            <div>{relation.genre}</div>
        </div>
    </div>
    )

}

export default function Highlight() {
    const [feature, setFeature] = useState<Highlight>()

    useEffect(() => {
        fetch("https://localhost:7131/api/Highlights/latest")
            .then(res => res.json())
            .then(data => {
                setFeature(data)
            })
    }, [])



    return <div className="my-5">
        {feature && <div>
            <div>
                <div className="text-center mb-3">
                    <h1>{feature.title}</h1>
                    <div className={css.Subtitle}>Featured Article</div>

                </div>
                <p>{feature.text}</p>

            </div>
            <div className="d-flex gap-5">
                {feature.relations.map(r => {
                    return <div key={r.id}>
                        <Relation relation={r} />

                    </div>
                })}
            </div>
        </div>}
    </div>
}