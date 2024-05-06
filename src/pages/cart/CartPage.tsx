import "../../types"

export default function CartPage({items}: {items: Product[]}) {

    return <div>
        {items.map(i => {return <p key={i.id}>{i.title}</p>})}
    </div>
}