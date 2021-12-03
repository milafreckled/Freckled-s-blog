import * as React from "react";
import Layout from "../../components/layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const BlogPage = ({ data }) => {
  const Bold = ({ children }) => <span className="bold">{children}</span>;
  const Text = ({ children }) => <p className="align-center">{children}</p>;
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      /* ANOTHER USEFUL BLOCKS */
      // [BLOCKS.HEADING_1]
      // [BLOCKS.HEADING_2]
      // [BLOCKS.UL_LIST]
      // [BLOCKS.QUOTE]
      // [BLOCKS.HR]
      // [INLINES.ASSET_HYPERLINK]
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
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
    renderText: (text) => text.substring(0, 100),
  };

  return (
    <Layout pageTitle="Freckled's blog">
      {data.allContentfulBlog.nodes.map((node) => (
        <div>
          <article key={node.id}>
            <Link to={`/blog/${node.slug}`}>
              <h2>{node.title}</h2>
            </Link>
            <p>
              Posted: {node.createdAt}, author: {node.author}
            </p>
            <p>
              {documentToHtmlString(node.body, options)}
              <Link to={`/blog/${node.slug}`}>Read more</Link>
            </p>
            <GatsbyImage image={getImage(node.thumbnail)} width="300" alt="" />
          </article>
        </div>
      ))}
    </Layout>
  );
};
export const pageQuery = graphql`
  query {
    allContentfulBlog {
      nodes {
        id
        slug
        createdAt(formatString: "dddd m, yyyy")
        author
        title
        thumbnail {
          gatsbyImageData
        }
        body {
          raw
        }
      }
    }
  }
`;
// allMdx(sort: {fields: frontmatter___title, order: DESC}) {
//   nodes {
//     id
//     slug
//     frontmatter {
//       title
//       date(formatString: "MM/DD/YYYY")
//     }
//   }
// }
export default BlogPage;
