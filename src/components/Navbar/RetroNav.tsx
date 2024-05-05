import { Cart4 } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import css from "./RetroNav.module.css"
import Searchbar from './Searchbar';

interface NavbarProps {
    setResults: (results: Product[]) => void;
}


function RetroNav({ setResults }: NavbarProps ) {

    return (
        <Container as="header">
            <Navbar expand="lg">
                <Link to="/" className='navbar-brand'>Retrowares</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={"me-auto " + css.justifyBetween}>
                        <div className='d-flex'>
                            {/* <Link to="/" className='nav-link'>Home</Link> */}
                        </div>
                        <div className='d-flex'>
                            <Searchbar setResults={setResults}/>
                            <Link to="/cart" className={'nav-link ' + css.centeredIcon} ><Cart4 size={20}></Cart4></Link>

                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default RetroNav;