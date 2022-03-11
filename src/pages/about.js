import * as React from "react";
import Layout from "../components/layout";
import { authorImg, article } from "./base.module.css";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <StaticImage
        src="../images/author.png"
        alt="Author"
        placeholder="blurred"
        className={authorImg}
      />
      <article className={article}>
        Hi there! My name is Mila, and I am a proud creator of this blog!
      </article>
    </Layout>
  );
};

export default AboutPage;
