import classNames from "classnames"
import css from "./CartPopup.module.css"

export default function CartPopup({ items }: { items: Product[] }) {

    return <div className={classNames(css.cartPopup)}>
        {items.map(i => {
            return (
                <p>{i.title}</p>
            )
        })}

    </div>
}