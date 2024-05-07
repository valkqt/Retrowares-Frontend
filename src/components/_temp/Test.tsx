import { getRelatedProducts } from "@/api";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

function Test() {

    useEffect(() => {
        getRelatedProducts("", "Adventure", "PC-98").then(data => {console.log(data)})
    }, [])

    return <div>
        <p>sono test!</p>
        <Button>Test search query</Button>
    </div>
}

export default Test;