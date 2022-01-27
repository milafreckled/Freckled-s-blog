import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Footer from "./footer";
import {
  container,
  body,
  header,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  localeButton,
  activeButton,
  navLinksMobile,
  navLinkItemMobile,
  navLinkTextMobile,
} from "./layout.module.css";
import Logo from "../images/logo.svg";
import OpenMenu from "../svg/opened-menu.svg";
import CloseMenu from "../svg/closed-menu.svg";
import {
  globalStateContext,
  dispatchStateContext,
} from "../contexts/GlobalState";

export default function Layout({ pageTitle, children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          locales
        }
      }
    }
  `);
  // const state = React.useContext(globalStateContext);
  // const dispatch = React.useContext(dispatchStateContext);
  //const setLocale = React.useCallback((locale) => dispatch({ locale }), []);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const isMobile = window.innerWidth < 700;

  return (
    <>
      <div className={body}>
        <div className={header}>
          <title>
            {pageTitle} | {data.site.siteMetadata.title}
          </title>
          <Logo />
          {isMobile ? (
            <nav>
              {!isOpenMenu ? (
                <OpenMenu onClick={() => setIsOpenMenu(true)} />
              ) : (
                <>
                  <CloseMenu onClick={() => setIsOpenMenu(false)} />
                  <MobileMenu />
                </>
              )}
            </nav>
          ) : (
            <nav>
              <ul className={navLinks}>
                <li className={navLinkItem}>
                  <Link to="/" className={navLinkText}>
                    Home
                  </Link>
                </li>
                <li className={navLinkItem}>
                  <Link to="/about" className={navLinkText}>
                    About
                  </Link>
                </li>
                <li className={navLinkItem}>
                  <Link to="/blog" className={navLinkText}>
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <main className={container}>
          <h1 className={heading}>{pageTitle}</h1>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

function MobileMenu() {
  return (
    <ul className={navLinksMobile}>
      <li className={navLinkItemMobile}>
        <Link to="/" className={navLinkTextMobile}>
          Home
        </Link>
      </li>
      <li className={navLinkItem}>
        <Link to="/about" className={navLinkTextMobile}>
          About
        </Link>
      </li>
      <li className={navLinkItemMobile}>
        <Link to="/blog" className={navLinkTextMobile}>
          Blog
        </Link>
      </li>
    </ul>
  );
}
