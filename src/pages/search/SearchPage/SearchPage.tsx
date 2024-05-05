// import css from "./SearchPage.module.css"
import "../../../types"

function SearchPage({ products }: { products: Product[] }) {
    return <div>
        {products.map(p => {
            return <p>{p.title}</p>
        })}
    </div>
}

export default SearchPage;