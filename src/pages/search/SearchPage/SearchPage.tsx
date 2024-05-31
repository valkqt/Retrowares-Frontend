import css from "./SearchPage.module.css";
import Showcase from "@/pages/home/Showcase/Showcase";
import { Product } from "@/types";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getRelatedProducts } from "@/api";

function SearchPage({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: (data: Product[]) => void;
}) {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className={css.FormWrapper}>
        <h1 className="text-center">Search</h1>
        <Form
          className={css.Form}
          onSubmit={(e) => {
            e.preventDefault();
            getRelatedProducts(title, genre, platform).then((data) => {
              setProducts(data);
              navigate("/search/results");
            });
          }}
        >
          <FormControl
            type="text"
            placeholder="Search titles..."
            onChange={(e) => setTitle(e.target.value)}
          />

          <Form.Group className={css.SelectMenus}>
            <Form.Select
              className={css.CustomSelect}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Platforms</option>
              <option value="PC-98">NEC PC-98</option>
              <option value="DOS">MS-DOS</option>
              <option value="Apple II">Apple</option>
            </Form.Select>

            <Form.Select
              className={css.CustomSelect}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Genres</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="strategy / tactics">Strategy/Tactics</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="btn-danger">
            Search...
          </Button>
        </Form>
      </div>

      {params.query && (
        <>
          {products.length > 0 ? (
            <>
              <h1 className="text-center">Search Results</h1>

              <div className="CardWrapperWrap">
                {products.map((p) => {
                  return <Showcase key={p.id} item={p} />;
                })}
              </div>
            </>
          ) : (
            <p className="text-center">
              No results matching your search preferences were found.
            </p>
          )}
        </>
      )}
    </>
  );
}

export default SearchPage;
