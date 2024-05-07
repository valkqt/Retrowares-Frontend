// import css from "./SearchPage.module.css"
import SingleProduct from "@/pages/home/SingleProduct/SingleProduct";
import { Product } from "@/types"
function SearchPage({ products }: { products: Product[] }) {
    return <>
    <h1 className="text-center">Search Results</h1>
    <div className="CardWrapper">
        {products.map(p => {
            return <SingleProduct key={p.id} product={p} />
        })}
    </div>
    </>
}

export default SearchPage;