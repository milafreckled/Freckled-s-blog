import * as React from 'react';
import Layout from '../components/layout'
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BlogPage = ({ data }) => {
    
    return (
      <Layout pageTitle="Freckled's blog">
            { 
                    data.allMdx.nodes.map((node) => (
                      <article key={node.id}>
                        <h2>{node.frontmatter.title}</h2>
                        <p>Posted: {node.frontmatter.date}, author: {node.frontmatter.author}</p>
                        <MDXRenderer>{node.body}</MDXRenderer>
                      </article>
            ))}
        </Layout>
    )
  }
  export const pageQuery = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        id
        body
        frontmatter {
          title
          date
          author
        }
      }
    }
  }
  
  `

  export default BlogPage