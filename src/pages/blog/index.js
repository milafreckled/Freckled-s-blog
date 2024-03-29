import * as React from "react";
import Layout from "../../components/layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  postImage,
  localeButton,
  activeButton,
  buttonsContainer,
  quote,
} from "./contentful.module.css";
const document = {
  nodeType: "document",
  content: [
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value: "Hello",
          marks: [{ type: "bold" }],
        },
        {
          nodeType: "text",
          value: " world!",
          marks: [{ type: "italic" }],
        },
      ],
    },
  ],
};
const BlogPage = (props) => {
  const { data, locale } = props;
  return (
    <>
      <Layout pageTitle="Freckled's blog">
        {locale === "uk-UA"
          ? data.ua.nodes.map((node) => (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} md={6}>
                  <GatsbyImage
                    image={getImage(node.thumbnail)}
                    className={postImage}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <article key={node.id}>
                    <h2>{node.title}</h2>
                    <em>Posted: {node.createdAt}</em>
                    <br />
                    <em>Author: {node.author}</em>
                    <br />
                    {node.body?.childMarkdownRemark.excerpt}

                    <Link to={`/blog/${node.slug}`}>Читати далі</Link>
                  </article>
                </Grid>
              </Grid>
            ))
          : data.en.nodes.map((node, idx) => (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} md={6}>
                  <GatsbyImage
                    image={getImage(node.thumbnail)}
                    className={postImage}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <article key={node.id}>
                    <h2>{node.title}</h2>
                    {node.body?.childMarkdownRemark.excerpt}
                    <em>Posted: {node.createdAt}</em>
                    <br />
                    <em>Author: {node.author}</em>
                    <br />

                    <p style={{ display: "inline" }}>
                      {node.body?.body}
                      <Link to={`/blog/${node.slug}`}>Read more</Link>
                    </p>
                  </article>
                </Grid>
                {idx+1 !== data.en.nodes.length && <hr />}
              </Grid>
       
            ))}
      </Layout>
    </>
  );
};
export const pageQuery = graphql`
  query {
    ua: allContentfulBlog(filter: { node_locale: { eq: "uk-UA" } }) {
      nodes {
        __typename
        author
        slug
        node_locale
        createdAt(formatString: "MMMM DD, YYYY")
        title
        id
        thumbnail {
          gatsbyImageData
        }
        body {
          childMarkdownRemark {
            html
            excerpt
          }
        }
      }
    }
    en: allContentfulBlog(filter: { node_locale: { eq: "en-US" } }) {
      __typename
      nodes {
        __typename
        author
        slug
        node_locale
        createdAt(formatString: "MMMM DD, YYYY")
        title
        id
        thumbnail {
          gatsbyImageData
        }
        body {
          childMarkdownRemark {
            html
            excerpt
          }
        }
      }
    }
  }
`;
const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  };
};
export default connect(mapStateToProps)(BlogPage);
