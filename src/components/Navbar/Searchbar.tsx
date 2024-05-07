import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import css from "./RetroNav.module.css"
import { getSearchResults } from "../../api/index"
import {Product} from "@/types"

interface SearchbarProps {
    setResults: (results: Product[]) => void;
}

export default function Searchbar({ setResults }: SearchbarProps) {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    return (
        <Form 
            className='d-flex' 
            onSubmit={(e) => {     
                e.preventDefault();
                getSearchResults(query).then((data) => setResults(data));
                navigate("/search");
            }}>
            {/* <Form.Select className={css.SearchSelect}>
                <option value="Products" selected>Products</option>
                <option value="Platforms">Platforms</option>
                <option value="Genres">Genres</option>
            </Form.Select> */}
            <FormControl
                type="text" 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder='Search...'
            />
            <Button type="submit" className={`btn btn-danger ${css.centeredIcon}`}>
                <Search size={16} />
            </Button>
        </Form>
    )
}