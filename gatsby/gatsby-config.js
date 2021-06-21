import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Gatsby Pizza`,
    siteUrl: process.env.SANITY_SITE_URL,
    description: `A sample site showcasing Gatsby with Sanity CMS`,
    twitter: '@SlicksSlices',
  },
  plugins: [
    // can give just the name or an object with options
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      // name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
