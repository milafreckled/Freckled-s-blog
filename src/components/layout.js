import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import {
  container,
  body,
  header,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  navLinksMobile,
  navLinkItemMobile,
  navLinkTextMobile,
  menu,
  navigation,
} from "./layout.module.css";
import Logo from "../images/logo.svg";
import OpenMenu from "../svg/opened-menu.svg";
import CloseMenu from "../svg/closed-menu.svg";
import Footer from "./footer";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  // typeof window !== "undefined" && window.innerWidth < 700;
  const { width, height } = useWindowDimensions();

  return (
    <>
      <div className={body}>
        <div className={header}>
          <title>
            {pageTitle} | {data.site.siteMetadata.title}
          </title>

          {width <= 700 ? (
            <nav className={navigation}>
              {!isOpenMenu ? (
                <>
                  <Logo />
                  <OpenMenu
                    className={menu}
                    onClick={() => setIsOpenMenu(true)}
                  />
                </>
              ) : (
                <>
                  <CloseMenu
                    className={menu}
                    onClick={() => setIsOpenMenu(false)}
                  />
                  <MobileMenu />
                </>
              )}
            </nav>
          ) : (
            <nav>
              <Logo />
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
      <li className={navLinkItemMobile}>
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
