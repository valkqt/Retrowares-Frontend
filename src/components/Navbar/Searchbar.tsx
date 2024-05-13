import { useState } from "react"
import { Form, FormControl, Button, Spinner } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import css from "./RetroNav.module.css"
import { getSearchResults } from "../../api/index"
import { Product } from "@/types"
import useClickOutside from "@/methods/useClickOutside"

interface SearchbarProps {
    setResults: (results: Product[]) => void;
}

interface SearchbarMenuProps {
    loading: boolean;
    results: Product[];
    show: boolean;
}

let timeout: number


function SearchbarMenu({ loading, results, show }: SearchbarMenuProps) {


    return (
        <>
            {show &&
                <div className={css.SearchbarMenu}>

                    {loading && <div className="text-center p-2">
                        <Spinner variant="dark" />
                    </div>
                    }
                    {results.length > 0 && <div>
                        {results.map(r => <div key={r.id}>
                            {r.title}
                        </div>)}
                    </div>}
                </div>
            }
        </>
    )
}

export default function Searchbar({ setResults }: SearchbarProps) {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [menuShow, setMenuShow] = useState(false)

    function handleClickOutside() {
        setMenuShow(false);
    }


    const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

    return (
        <div className="position-relative" ref={ref}>
            <Form
                className='d-flex'
                onSubmit={(e) => {
                    e.preventDefault();
                    getSearchResults(query).then((data) => setResults(data));
                    navigate("/search");
                }}>

                <FormControl
                    type="text"
                    onChange={(e) => {
                        clearTimeout(timeout)

                        setQuery(e.target.value)
                        setMenuShow(true)
                        setLoading(true)
                        setSearchResults([])
                        timeout = window.setTimeout(() => {
                            getSearchResults(e.target.value).then(data => {
                                setSearchResults(data)
                                setLoading(false)
                            })
                        }, 2000)


                    }}
                    placeholder='Search...'
                />
                <Button type="submit" className={`btn btn-danger ${css.centeredIcon}`}>
                    <Search size={16} />
                </Button>
            </Form>
            {query && <SearchbarMenu loading={loading} results={searchResults} show={menuShow} />
            }
        </div>
    )
}