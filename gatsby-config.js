/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require(`path`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src/assets`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
    resolve: `gatsby-source-spotify`,
    options: {
      clientId: process.env.GATSBY_CLIENT_ID,
      clientSecret: process.env.GATSBY_CLIENT_SECRET,
      refreshToken: process.env.GATSBY_REFRESH_TOKEN,
  
      fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
      fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
      timeRanges: ['short_term', 'medium_term', 'long_term'], // optional. Set time ranges to be fetched
    },
  },
],
  
}
