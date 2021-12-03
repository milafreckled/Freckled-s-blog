import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { heading, quote, bold }  from './contentful.module.css'
const BlogPost = ({ data }) => {
  const Bold = ({ children }) => <span className={bold}>{children}</span>;
  const Text = ({ children }) => <p>{children}</p>;
  const post = data.contentfulBlog;
  const document = {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "embedded-entry-block",
        data: {},
        content: [
          {
            nodeType: "text",
            value: post.body.raw,
            marks: [],
          },
        ],
      },
    ],
  };
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.HEADING_1]: (text) => <h2 className={heading}>{text}</h2>,
      [BLOCKS.QUOTE]: (text) => <blockquote className={quote}>{text}</blockquote>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        return (
          <>
            <h2>Embedded Asset</h2>
            <pre>
              <code>{JSON.stringify(node, null, 2)}</code>
            </pre>
          </>
        );
      },
    },
  };
  return (
    <Layout title="Frecled's blog posts">
      <h1>{post.title}</h1>
      {/* <GatsbyImage image={pos} alt={data.mdx.frontmatter.hero_image_alt} /> */}
      <img src={post.thumbnail.fluid.src} alt={post.title} />
      <p>Published on {post.createdAt}</p>
      {renderRichText(post.body, options)}
    </Layout>
  );
};
export const query = graphql`
  query ($id: String) {
    contentfulBlog(id: { eq: $id }) {
      body {
        raw
      }
      createdAt(formatString: "dddd m, yyyy")
      title
      thumbnail {
        fluid {
          src
        }
      }
      topic
      slug
      author
    }
  }
`;
export default BlogPost;
