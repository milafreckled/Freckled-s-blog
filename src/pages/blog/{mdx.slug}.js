import React, {useEffect} from 'react'
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPost = ({ data }) => {
    // useEffect(() => {
    //     console.log(pageContext);
    // }), []
    const post = data.mdx
    return (
        <Layout title="Frecled's blog posts">
                <h2>{post.frontmatter.title}</h2>
                 <p>Published on {post.frontmatter.date}</p>
                <MDXRenderer>{post.body}</MDXRenderer>

        </Layout>
    )
}
export const query = graphql`
    query($id: String) {
        mdx(id: {eq: $id}) {
        frontmatter {
            title
            date
        }
        body
        }
    }
  
`
export default BlogPost;
