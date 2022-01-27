require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.freckledblog.studio",
    title: "Freckled's blog",
    locales: ["uk-UA", "en-US"],
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    //
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FreckledBlog`,
        short_name: `FB`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },

    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/components/layout.js"),
          default: require.resolve("./src/components/layout.js"),
        },
        extensions: [`.mdx`, `.md`],
      },
    },

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: "c9hw3pub0ugj",
        accessToken: "S94Poq0wRFP19srQeBP46_EU29tEU6-cCMTUVfIqwkA",
        host: "preview.contentful.com",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
};
