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
  localeButton,
  activeButton,
} from "./layout.module.css";
import Logo from "../images/logo.svg";
import OpenMenu from "../svg/opened-menu.svg";
import CloseMenu from "../svg/closed-menu.svg";
import Footer from "./footer";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { CHANGE_LOCALE } from "../redux/actions";

function Layout({ locale, pageTitle, children }) {
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
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
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
                  <MobileMenu locale={locale} />
                </>
              )}
            </nav>
          ) : (
            <nav>
              <Logo />
              <ul className={navLinks}>
                <li className={navLinkItem}>
                  <Link to="/" className={navLinkText}>
                    {locale === "uk-UA" ? "Головна" : "Home"}
                  </Link>
                </li>
                <li className={navLinkItem}>
                  <Link to="/about" className={navLinkText}>
                    {locale === "uk-UA" ? "Про автора" : "About"}
                  </Link>
                </li>
                <li className={navLinkItem}>
                  <Link to="/blog" className={navLinkText}>
                    {locale === "uk-UA" ? "Блог" : "Blog"}
                  </Link>
                </li>
                <button
                  onClick={() =>
                    dispatch({ type: CHANGE_LOCALE, payload: "uk-UA" })
                  }
                  className={
                    locale === "uk-UA"
                      ? `${localeButton} ${activeButton}`
                      : localeButton
                  }
                >
                  UA
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: CHANGE_LOCALE, payload: "en-US" })
                  }
                  className={
                    locale === "en-US"
                      ? `${localeButton} ${activeButton}`
                      : localeButton
                  }
                >
                  EN
                </button>
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

function MobileMenu({ locale }) {
  return (
    <ul className={navLinksMobile}>
      <li className={navLinkItemMobile}>
        <Link to="/" className={navLinkTextMobile}>
          {locale === "uk-UA" ? "Головна" : "Home"}
        </Link>
      </li>
      <li className={navLinkItemMobile}>
        <Link to="/about" className={navLinkTextMobile}>
          {locale === "uk-UA" ? "Про автора" : "About"}
        </Link>
      </li>
      <li className={navLinkItemMobile}>
        <Link to="/blog" className={navLinkTextMobile}>
          {locale === "uk-UA" ? "Блог" : "Blog"}
        </Link>
      </li>
    </ul>
  );
}
const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  };
};
export default connect(mapStateToProps)(Layout);
