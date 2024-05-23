import { Button } from "react-bootstrap";

function Test() {
  function plofi() {
    fetch("https://localhost:7131/api/Products/pepe")
      .then((res) => res.json())
      .then((data) => console.log(JSON.parse(data.pepe)));
  }

  return (
    <div>
      <p>sono test!</p>
      <Button onClick={plofi}>Test search query</Button>
    </div>
  );
}

export default Test;
