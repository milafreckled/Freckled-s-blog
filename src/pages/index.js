import * as React from "react";
import Layout from "../components/layout";
import { article, homeQuote, quoteText, authorName } from "./base.module.css";
import OpenQuote from "../svg/lapki-up.svg";
import CloseQuote from "../svg/lapki-down.svg";
import { connect } from "react-redux";

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
