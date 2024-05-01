import { Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { useState } from "react";


function PostForm() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    interface Product {
        Title: string,
        Image?: string
    }

    function AddProduct() {

        const newProduct: Product = {
            Title: title,
            Image: image,
        }
        fetch("http://andreabuzzanca-001-site2.jtempurl.com/api/Products/", {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify(newProduct) }).then(res => res.json()).then(data => console.log(data))
        console.log(newProduct)
    }


    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
        AddProduct()
        }}>
            <FormGroup>
                <FormLabel>Product name</FormLabel>
                <FormControl type="text" placeholder="Write a name" required onChange={e => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Product name</FormLabel>
                <FormControl type="text" placeholder="Paste image link" onChange={e => setImage(e.target.value)} />
            </FormGroup>

            <Button variant="warning" type="submit">Submit</Button>
        </Form>
    )
}

export default PostForm;