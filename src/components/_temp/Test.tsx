import { useEffect } from "react";
import { Button } from "react-bootstrap";

function Test() {

    useEffect(() => {
        // fetch("https://localhost:7131/api/Products/pepe").then(res => res.json()).then(data => console.log(data))
    }, [])

    return <div>
        <p>sono test!</p>
        <Button>Test search query</Button>
    </div>
}

export default Test;