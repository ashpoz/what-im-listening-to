import React from "react";
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';
import Img from "gatsby-image";

const Artists = ({data}) => {

  return (
    <Layout pageName="artists">
      <Helmet>
        <title>Artists Page</title>
      </Helmet>
    <Header />
      <section className="container">
        <div className="row">
          <div className="artists col-md-6">
            <h2>Current</h2>
              <ul>
                {data.current.edges.map(edge => {
                    console.log(edge)
                    return(
                      <li className="artist" key={edge.node.id}>
                          <a href={edge.node.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                              <div>
                                <Img fixed={edge.node.image.localFile.childImageSharp.fixed} 
                                     objectFit="cover"
                                     objectPosition="50% 50%"/>
                                <p>{edge.node.name}</p>
                              </div>
                          </a>
                      </li>
                    )
                  }
                )}
              </ul>
          </div>
          <div className="artists col-md-6">
            <h2>All time</h2>
              <ul>
                {data.allTime.edges.map(edge => {
                    console.log(edge)
                    return(
                      <li className="artist" key={edge.node.id}>
                          <a href={edge.node.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                              <div>
                                <Img fixed={edge.node.image.localFile.childImageSharp.fixed} />
                                <p>{edge.node.name}</p>
                              </div>
                          </a>
                      </li>
                    )
                  }
                )}
              </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query artistsPageQuery {
    current: allSpotifyTopArtist(
      filter: { time_range: { eq: "short_term" } }
      sort: { fields: order }
    ) {
      edges {
        node {
          id
          name
          genres
          image {
            localFile {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          external_urls {
            spotify
          }
        }
      }
    }
    allTime: allSpotifyTopArtist(
      filter: { time_range: { eq: "long_term" } }
      sort: { fields: order }
    ) {
      edges {
        node {
          id
          name
          genres
          image {
            localFile {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          external_urls {
            spotify
          }
        }
      }
    }
}
`

export default Artists;
