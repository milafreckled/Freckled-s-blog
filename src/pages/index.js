import * as React from "react";
import Layout from "../components/layout";
import { article, homeQuote, quoteText, authorName } from "./base.module.css";
import OpenQuote from "../svg/lapki-up.svg";
import CloseQuote from "../svg/lapki-down.svg";
import { connect } from "react-redux";

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial/",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
    color: "#E95800",
  },
  {
    text: "How to Guides",
    url: "https://www.gatsbyjs.com/docs/how-to/",
    description:
      "Practical step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done.",
    color: "#1099A8",
  },
  {
    text: "Reference Guides",
    url: "https://www.gatsbyjs.com/docs/reference/",
    description:
      "Nitty-gritty technical descriptions of how Gatsby works. Most useful when you need detailed information about Gatsby's APIs.",
    color: "#BC027F",
  },
  {
    text: "Conceptual Guides",
    url: "https://www.gatsbyjs.com/docs/conceptual/",
    description:
      "Big-picture explanations of higher-level Gatsby concepts. Most useful for building understanding of a particular topic.",
    color: "#0D96F2",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
    color: "#8EB814",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    badge: true,
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
    color: "#663399",
  },
];

// markup
const IndexPage = ({ serverData, locale }) => {
  const { data } = serverData;
  React.useEffect(() => {
    console.log('Locale: ', locale);
  }, [])
  return (
    <>
      <Layout pageTitle="Home Page">
        <article className={article}>
         {locale === "en-US" ? 
          `Hello, dear reader! I am pleased to welcome you in this cozy place
          where you can learn, grow and aspire. Let's share inspiration
          together!`
          : `Привіт, дорогий читач! Я рада вітати тебе у затишному мцсці, де ти можеш дізнаватись щось нове та надихатись.
          Давай ділитися натхненням разом!`}
        </article>
        <h2> {locale === "en-US" ? "Quote of the day:" : "Цитатa дня"}</h2>
        <blockquote className={homeQuote}>
          <OpenQuote className={quoteText} />
          {data.contents.quotes[0]?.quote}
          <br />
          <p className={authorName}>{data.contents.quotes[0]?.author}</p>
          <CloseQuote className={quoteText} />
        </blockquote>

        <span
          style={{
            zIndex: "50",
            fontSize: "0.6em",
            fontWeight: "bold",
            marginLeft: "80%",
          }}
        >
          <img
            src="https://theysaidso.com/branding/theysaidso.png"
            height="20"
            width="20"
            alt="theysaidso.com"
          />
          <a
            href="https://theysaidso.com"
            title="Powered by quotes from theysaidso.com"
            style={{
              color: "#ccc",
              marginLeft: "4px",
              verticalAlign: "middle",
            }}
          >
            They Said So®
          </a>
        </span>
      </Layout>
    </>
  );
};
export async function getServerData() {
  const res = await fetch(`https://quotes.rest/qod.json`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  };
};

export default connect(mapStateToProps)(IndexPage);
