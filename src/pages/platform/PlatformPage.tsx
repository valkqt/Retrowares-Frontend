import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRelatedProducts } from "@/api";
import css from "./PlatformPage.module.css";
import classNames from "classnames";
import { Product } from "@/types";
import { Spinner } from "react-bootstrap";
import Showcase from "../home/Showcase/Showcase";
import Pagination from "react-bootstrap/Pagination";

interface PaginationProps {
  pageCount: number;
  onPaginationChange: (o: number) => void;
  active: number;
}

export default function PlatformPage() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.name) {
      navigate("/");
      return;
    }

    getRelatedProducts("", "", params.name).then((data) => {
      setResults(data);
      setLoading(false);
      setPageOffset(0)
      console.log(data);
    });
  }, [params.name]);

  function sortElements(a: Product, b: Product): number {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  function ResultsPagination({
    pageCount,
    onPaginationChange,
    active,
  }: PaginationProps) {
    let current = active;
    let items = [];
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === current}
          onClick={() => onPaginationChange(i * 30 - 30)}
        >
          {i}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );

    return paginationBasic;
  }

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner variant="dark" />
        </div>
      )}
      <h1 className="text-center">{params.name} Collection</h1>
      <div className={classNames(css.Slider, "mb-5")}>
        {results.map((r) => (
          <Showcase item={r} key={r.id} />
        ))}
      </div>
      {results.length > 0 ? (
        <>
          <h2>Browse</h2>
          <ResultsPagination
            pageCount={Math.ceil(results.length / 30)}
            onPaginationChange={setPageOffset}
            active={1 + pageOffset / 30}
          />
          <div>
            <table className={css.Table}>
              <thead className={css.TableHeader}>
                <tr>
                  <td className="h4">Title</td>
                  <td className="h4">Price</td>
                  <td className={classNames("h4", css.DesktopTableCell)}>
                    Genre
                  </td>

                  <td className={classNames("h4", css.DesktopTableCell)}>
                    Release Date
                  </td>
                  <td className="h4">Stock</td>
                </tr>
              </thead>
              <tbody className={css.PlatformTable}>
                {results
                  .sort(sortElements)
                  .slice(pageOffset, pageOffset + 30)
                  .map((r) => {
                    return (
                      <tr
                        key={r.id}
                        className={css.LinkRow}
                        onClick={() => navigate(`/products/${r.id}`)}
                      >
                        <td>{r.title}</td>
                        <td className="productPriceSmallest">{r.price}$</td>
                        <td className={css.DesktopTableCell}>{r.genre}</td>

                        <td className={css.DesktopTableCell}>
                          {r.releaseDate.slice(0, 4)}
                        </td>
                        <td>{r.stock}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <ResultsPagination
            pageCount={Math.ceil(results.length / 30)}
            onPaginationChange={setPageOffset}
            active={1 + pageOffset / 30}
          />
        </>
      ) : (
        <div className="text-center">There are no games for this platform</div>
      )}
    </>
  );
}
