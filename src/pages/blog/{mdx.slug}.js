import React from 'react'
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogPost = ({ data }) => {
    // useEffect(() => {
    //     console.log(pageContext);
    // }), []
    const post = data.mdx
    const image = getImage(data.mdx.frontmatter.hero_image);
    return (
        <Layout title="Freckled's blog posts">
                <h2>{post.frontmatter.title}</h2>
                <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
                 <p>Published on {post.frontmatter.date}</p>
                <MDXRenderer>{post.body}</MDXRenderer>

        </Layout>
    )
}
export const query = graphql`
query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }    
`
export default BlogPost;
