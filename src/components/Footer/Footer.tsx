import { Button } from "react-bootstrap";
import css from "./Footer.module.css";
import {
  ChevronUp,
  Facebook,
  Github,
  Linkedin,
  Twitter,
} from "react-bootstrap-icons";

export function Footer() {
  return (
    <footer className={css.FooterWrapper}>
      <div className={css.FooterContents}>
        <div>
          <address className={css.Address}>
            &copy;Retrowares 2024, Via Pepe Kek 123, Torino
          </address>
          <div className={css.Socials}>
            <a href="https://www.linkedin.com/in/andrea-buzzanca-b662362bb/">
              <Linkedin size={20} />
            </a>
            <a href="https://www.linkedin.com/in/andrea-buzzanca-b662362bb/">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/in/andrea-buzzanca-b662362bb/">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/valkqt">
              <Github size={20} />
            </a>
          </div>
        </div>
        <Button variant="dark">
          <a href="#" className="neuteredLink">
            <ChevronUp />
          </a>
        </Button>
      </div>
    </footer>
  );
}
