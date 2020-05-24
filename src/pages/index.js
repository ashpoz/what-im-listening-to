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
        <div className="row">
          <div className="col-12 text-center">
            <h3>What I'm listening to right now:</h3>
          </div>
          <div className="col-12">
                <ul>
                  <li className="latest-track">
                    <a href="">
                      <div>
                      <Img fluid={data.spotifyRecentTrack.track.image.localFile.childImageSharp.fluid} 
                            objectFit="fill"
                            objectPosition="50% 50%"
                              />
                        <p>{data.spotifyRecentTrack.track.name}</p>
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
