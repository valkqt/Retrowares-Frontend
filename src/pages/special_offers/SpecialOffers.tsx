import { getSpecialOffers } from "@/api"
import { useEffect, useState } from "react"
import { Product } from "@/types"
import Showcase from "../home/Showcase/Showcase"
import { Spinner } from "react-bootstrap"

export default function SpecialOffers() {
    const [offers, setOffers] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSpecialOffers().then(data => {
            setOffers(data)
            setLoading(false)
        })
    }, [])

    return <>
        {loading && <div className="text-center">
            <Spinner variant="dark" />
        </div>}

        <div className="d-flex flex-wrap gap-5">
            {
                offers.filter(o => o.discountPercentage > 0).map(o => <div key={o.id} >
                    <Showcase item={o} />
                </div>)
            }
        </div>
    </>
}