import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getRelatedProducts } from "@/api"
import css from "./PlatformPage.module.css"
import classNames from "classnames"
import { Product } from "@/types"
import { Spinner } from "react-bootstrap"
import Showcase from "../home/Showcase/Showcase"
import Pagination from 'react-bootstrap/Pagination';

interface PaginationProps {
    pageCount: number;
    onPaginationChange: (o: number) => void;
    active: number;

}

export default function PlatformPage() {
    const [results, setResults] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [pageOffset, setPageOffset] = useState(0)
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (!params.name) {
            navigate("/")
            return
        }

        getRelatedProducts("", "", params.name).then(data => {
            setResults(data)
            setLoading(false)
            console.log(data)
        })
    }, [])

    function sortElements(a: Product, b: Product): number {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function ResultsPagination({ pageCount, onPaginationChange, active }: PaginationProps) {
        let current = active;
        let items = [];
        for (let i = 1; i <= pageCount; i++) {
            items.push(
                <Pagination.Item key={i} active={i === current} onClick={() => onPaginationChange(i * 30 - 30)}>
                    {i}
                </Pagination.Item>,
            );
        }

        const paginationBasic = (
            <div>
                <Pagination>{items}</Pagination>
            </div>
        );


        return paginationBasic
    }





    return <>
        {loading && <div className="text-center">
            <Spinner variant="dark" />
        </div>}
        <h1 className="text-center">{params.name} Collection</h1>
        <div className={classNames(css.Slider, "mb-5")}>
            {results.map(r => <Showcase item={r} key={r.id} />)}
        </div>
        <h2>Browse</h2>
        <ResultsPagination pageCount={Math.ceil(results.length / 30)} onPaginationChange={setPageOffset} active={1 + pageOffset / 30} />
        <div className={css.Table}>
            <table>
                <thead></thead>
                <tbody>
                    {results.sort(sortElements).slice(pageOffset, pageOffset + 30).map(r => {
                        return (
                            <tr key={r.id}>
                                <td>
                                    <Link to={`/products/${r.id}`} className="neuteredLink">
                                        {r.title}
                                    </Link>
                                </td>
                                <td>{r.releaseDate.slice(0,4)}</td>
                                <td>{r.genre}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>

    </>
}