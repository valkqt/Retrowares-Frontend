import { useState, useEffect } from "react";
import { Product } from "@/types";
import Showcase from "../Showcase/Showcase.tsx";
import { Spinner } from "react-bootstrap";
import { getAllProducts } from "@/api/products.ts";
import Featured from "./Featured/Featured.tsx";

// import Test from "../../../components/_temp/Test.tsx";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  function sortElements(a: Product, b: Product): number {
    if (a.discountPercentage < b.discountPercentage) {
      return 1;
    }
    if (a.discountPercentage > b.discountPercentage) {
      return -1;
    }
    return 0;
  }

  return (
    <>
      {/* <Test /> */}

      <Featured />
      {loading && (
        <div className="text-center">
          <Spinner variant="dark" />
        </div>
      )}
      <div>
        <h2>Best Offers</h2>
        <div className="CardWrapper">
          {[...products]
            .sort((a, b) => sortElements(a, b))
            .slice(0, 4)
            .map((p) => {
              return <Showcase key={p.id} item={p} />;
            })}
        </div>

        <h2 className="text-center">PC-98 Collection</h2>
        <div className="CardWrapper">
          {products
            .filter((elem) => elem.platform === "PC-98")
            .slice(0, 4)
            .map((elem) => {
              return <Showcase key={elem.id} item={elem} />;
            })}
        </div>
        <h2 className="text-center">MS-DOS Collection</h2>
        <div className="CardWrapper">
          {products
            .filter((elem) => elem.platform === "DOS")
            .slice(0, 4)
            .map((elem) => {
              return <Showcase key={elem.id} item={elem} />;
            })}
        </div>
        <h2 className="text-center">Apple II Collection</h2>
        <div className="CardWrapper">
          {products
            .filter((elem) => elem.platform === "Apple II")
            .slice(0, 4)
            .map((elem) => {
              return <Showcase key={elem.id} item={elem} />;
            })}
        </div>
        <h2 className="text-center">Commodore 64 Collection</h2>
        <div className="CardWrapper">
          {products
            .filter((elem) => elem.platform === "Commodore 64")
            .slice(0, 4)
            .map((elem) => {
              return <Showcase key={elem.id} item={elem} />;
            })}
        </div>
        <h2 className="text-center">NES Collection</h2>
        <div className="CardWrapper">
          {products
            .filter((elem) => elem.platform === "NES")
            .slice(0, 4)
            .map((elem) => {  
              return <Showcase key={elem.id} item={elem} />;
            })}
        </div>

      </div>
    </>
  );
}

export default HomePage;
