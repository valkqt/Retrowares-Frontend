import { useState, useEffect } from "react";
import { Product, Highlight } from "@/types.ts";
import { Link } from "react-router-dom";
import css from "./Featured.module.css";
import classNames from "classnames";
import { Spinner } from "react-bootstrap";
import { getFeatured } from "@/api";


function Relation({ relation }: { relation: Product }) {
  const [hover, setHover] = useState(false);

  return (
    <div className={css.RelationItem}>
      <Link
        to={`/Products/${relation.id}`}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <img src={relation.image} className="img-fluid" />
      </Link>
      <div
        className={classNames({ toggleDisplay: !hover }, css.FeatureRelation)}
      >
        <h5>{relation.title}</h5>
        <div className="productPriceSmall">{relation.price}$</div>
        <div>{relation.platform}</div>
        <div>{relation.genre}</div>
      </div>
    </div>
  );
}

export default function Featured() {
  const [feature, setFeature] = useState<Highlight>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeatured().then(data => {
      setFeature(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="my-5">
      {loading && (
        <div className="text-center">
          <Spinner variant="dark" />
        </div>
      )}
      {feature && (
        <div >
          <div>
            <div className="text-center mb-3">
              <h1>{feature.title}</h1>
              <div className={css.Subtitle}>Featured Article</div>
            </div>
            <p>{feature.text}</p>
          </div>
          <div className={css.RelationContainer}>
            {feature.relations.map((r) => {
              return (
                <div key={r.id}>
                  <Relation relation={r} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
