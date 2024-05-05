import { Form, FormLabel, FormControl, FormGroup, Button } from "react-bootstrap";
import { useState } from "react";



function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function authenticate() {

        const user = {
            "Username": username,
            "Password": password
        }
        fetch("https://localhost:7131/api/Auth", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(user) })
            .then(res => res.json()).then(data => { localStorage.setItem("token", data.token); console.log(data) })

    }
    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            authenticate();

        }}>
            <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormControl type="text" placeholder="" onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>

            <Button type="submit" className="btn btn-primary">
                Authenticate
            </Button>
        </Form>
    )
}

export default LoginForm;