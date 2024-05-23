import { Cart4 } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import css from "./RetroNav.module.css";
import Searchbar from "./Searchbar";
import CartPopup from "./CartPopup/CartPopup";
import { useState } from "react";
import useClickOutside from "../../methods/useClickOutside.ts";
import classNames from "classnames";
import { Product } from "@/types";
import { useCart } from "@/contexts";

interface NavbarProps {
  setResults: (results: Product[]) => void;
}

function RetroNav({ setResults }: NavbarProps) {
  const [popupShow, setPopupShow] = useState(false);
  const [cart] = useCart();

  function handleClickOutside() {
    setPopupShow(false);
  }

  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <Container as="header">
      <Navbar expand="lg" className={classNames(css.Zindex, "sticky-top")}>
        <Link to="/" className="navbar-brand">
          Retrowares
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={classNames("me-auto", css.justifyBetween, )}>
            <div className="d-md-flex">
              <Link to="/About" className="nav-link">
                About us
              </Link>
              <Link to="/Offers" className="nav-link">
                Features
              </Link>
              <Link to="/Tracking" className="nav-link">
                Tracking
              </Link>
              <NavDropdown
                title="Browse"
                id="basic-nav-dropdown"
                className={classNames(css.NavDropdown)}
              >
                <Link to="/Search" className="dropdown-item">
                  Advanced Search
                </Link>

                <NavDropdown.Divider />
                <Link to="/Platforms/PC-98" className="dropdown-item">
                  NEC PC-98
                </Link>
                <Link to="/Platforms/DOS" className="dropdown-item">
                  MS-DOS
                </Link>
                <Link to="/Platforms/Apple%20II" className="dropdown-item">
                  Apple II
                </Link>
                <Link to="/Platforms/NES" className="dropdown-item">
                  NES
                </Link>
                <Link to="/Platforms/Commodore%2064" className="dropdown-item">
                  Commodore 64
                </Link>


              </NavDropdown>
            </div>
            <div className="d-flex gap-3">
              <Searchbar setResults={setResults} />
              <div
                ref={ref}
                className={classNames(css.centeredIcon, css.popupContainer)}
              >
                <div onClick={() => setPopupShow(true)}>
                  <Cart4 size={20} className={css.popupContainer} />
                  <div
                    className={css.itemCounter}
                    style={
                      cart.length > 0
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <div className="GenericFont">{cart.length}</div>
                  </div>
                </div>

                {popupShow && (
                  <>
                    <CartPopup items={cart} />
                  </>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default RetroNav;
