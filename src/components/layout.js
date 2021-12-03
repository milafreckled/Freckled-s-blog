import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  container,
  body,
  header,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  logoImage,
} from "./layout.module.css";
export default function Layout({ pageTitle, children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div className={body}>
      <div className={header}>
        <title>
          {pageTitle} | {data.site.siteMetadata.title}
        </title>
        {/* <header className={siteTitle}>{data.site.siteMetadata.title}</header> */}
        <StaticImage
          alt="Blog's logo"
          src="../images/logo.png"
          className={logoImage}
        />
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
      </div>
      <main className={container}>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
}
