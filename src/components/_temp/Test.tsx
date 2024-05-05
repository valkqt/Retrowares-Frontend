import { Button } from "react-bootstrap";

function Test() {

    function tess() {
        fetch("https://localhost:7131/api/Products/pepe", { headers: { "Content-Type": "application/json" }, method: "GET"})
            .then(res => res.json()).then(data => { console.log(JSON.parse(data.pepe)) })
    }
    return <div>
        <Button onClick={() => {tess()}}>Test</Button>
    </div>
}

export default Test;