import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';
import Img from "gatsby-image";

const Home = ({data}) => {

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
    <Header />
      <section className="container">
        <div className="row" style={{ maxWidth: "600px", margin: "auto" }}>
          <div className="col-12 padbot-3">
                <ul>
                  <li className="latest-track">
                    <a href={data.spotifyRecentTrack.track.external_urls.spotify} target="_blank">
                      <div>
                      <h4 style={{ paddingBottom: "15px" }}>{data.spotifyRecentTrack.track.name} by {data.spotifyRecentTrack.track.artistString}</h4>
                      <Img fluid={data.spotifyRecentTrack.track.image.localFile.childImageSharp.fluid} 
                            objectFit="fill"
                            objectPosition="50% 50%"
                              />
                      </div>
                    </a>
                  </li>
                </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query homePageQuery {
    spotifyRecentTrack(order: {eq: 0}) {
      played_at
      track {
        name
        is_local
        uri
        artistString
        external_urls {
          spotify
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
}
`

export default Home;
