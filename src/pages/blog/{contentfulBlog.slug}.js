import * as React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

// import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  heading,
  quote,
  bold,
  alignedText,
  postImage,
} from "./contentful.module.css";

const BlogPost = ({ data }) => {
  const Bold = ({ children }) => <span className={bold}>{children}</span>;
  const Text = ({ children }) => <p className={alignedText}>{children}</p>;
  const post = data.contentfulBlog;
  const content = post.body?.childMarkdownRemark?.html;
  const img_src = getImage(post.thumbnail.gatsbyImageData);
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
      [BLOCKS.HEADING_1]: (node, text) => <h1 className={heading}>{text}</h1>,
      [BLOCKS.HEADING_2]: (node, text) => <h2 className={heading}>{text}</h2>,
      [BLOCKS.QUOTE]: (text) => (
        <blockquote className={quote}>{text}</blockquote>
      ),
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
  const contentRef = React.useRef();
  React.useEffect(() => {
    contentRef.current.innerHTML = content;
  });
  return (
    <Layout title="Freckled's blog posts">
      <h1>{post.title}</h1>
      <GatsbyImage image={img_src} alt={post.topic} className={postImage} />
      <div className={alignedText}>
        <i>Published on: {post.published} </i>
        <br />
        <p>Author: {post.author}</p>
        <p ref={contentRef}></p>
      </div>
    </Layout>
  );
};
export const postQuery = graphql`
  query ($id: String) {
    contentfulBlog(id: { eq: $id }) {
      author
      title
      topic
      published
      body {
        childMarkdownRemark {
          html
        }
      }
      slug
      node_locale
      thumbnail {
        gatsbyImageData
      }
      updatedAt
    }
  }
`;

export default BlogPost;
