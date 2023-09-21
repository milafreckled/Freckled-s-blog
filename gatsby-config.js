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
    // `gatsby-plugin-netlify`
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
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `blog`,
    //     path: `${__dirname}/src/pages/blog`,
    //   },
    // },

    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/blog`,
    //   },
    // },
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
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        // host: "preview.contentful.com",
        localeFilter: locale => locale.code === 'en-US' || locale.code === 'uk-UA',
        enableTags: "true"
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
    {
      resolve: "gatsby-plugin-react-redux",
      options: {
        pathToCreateStoreModule: "./src/redux/store.js",
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
  ],
};
