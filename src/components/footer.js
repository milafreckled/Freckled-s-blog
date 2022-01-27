import React from "react";
import { Link } from "gatsby";
import { footer, icon } from "./footer.module.css";
import InstagramLogo from "../svg/instagram.svg";
import FacebookLogo from "../svg/facebook.svg";
import GithubLogo from "../svg/github.svg";

export default function Footer() {
  return (
    <footer className={footer}>
      <Link to="https://www.instagram.com/milafreckled/">
        <InstagramLogo className={icon} />
      </Link>
      <Link to="https://www.facebook.com/profile.php?id=100005818517786">
        <FacebookLogo className={icon} />
      </Link>
      <Link to="https://github.com/milafreckled">
        <GithubLogo className={icon} />
      </Link>
    </footer>
  );
}
