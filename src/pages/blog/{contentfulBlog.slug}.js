import * as React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { bold, alignedText, postImage } from "./contentful.module.css";

const BlogPost = ({ data }) => {
  const post = data.contentfulBlog;
  const content = post.body?.childMarkdownRemark?.html;
  const img_src = getImage(post.thumbnail.gatsbyImageData);

  const contentRef = React.useRef();
  React.useEffect(() => {
    contentRef.current.innerHTML = content;
  });
  const getRate = (rate) => {
    let stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(i);
    }
    return stars;
  };
  return (
    <>
      <Layout title="Freckled's blog posts">
        <h1>{post.title}</h1>
        <GatsbyImage image={img_src} alt={post.topic} className={postImage} />
        <div className={alignedText}>
          <i>
            {post.node_locale === "uk-UA" ? "Опубліковано:" : "Published on:"}{" "}
            {post.published}{" "}
          </i>
          <br />
          <p>
            {post.node_locale === "uk-UA" ? "Автор:" : "Author:"} {post.author}
          </p>
          <p ref={contentRef}></p>
          <p>{post.node_locale === "uk-UA" ? "Оцінка:" : "Rate:"}</p>
          {getRate(post.rate).map((_, idx) => (
            <span key={`star-${idx}`}>⭐️</span>
          ))}
        </div>
      </Layout>
    </>
  );
};
export const postQuery = graphql`
  query ($id: String) {
    contentfulBlog(id: { eq: $id }) {
      author
      title
      rate
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
