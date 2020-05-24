import React from "react";
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';

const Tracks = ({data}) => {

  return (
    <Layout pageName="tracks">
      <Helmet>
        <title>Tracks Page</title>
      </Helmet>
    <Header />
      <section className="container">
        <div className="row">
          <div className="tracks col-md-6">
            <h2>Current</h2>
              <ul>
                {data.current.edges.map(edge => {
                    return(
                        <li key={edge.node.id}>
                            <a href={edge.node.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {edge.node.name}
                            {edge.node.artists.map((artist, i) => {
                                if (i > 0 && i === edge.node.artists.length - 1) {
                                    return ` and ${artist.name}`;
                                } else if (i > 0 && i !== edge.node.artists.length - 1) {
                                    return `, ${artist.name}`;
                                } else {
                                    return ` - ${artist.name}`;  
                                }
                            })}
                            </a>
                        </li>
                    )
                  }
                )}
              </ul>
          </div>
          <div className="tracks col-md-6">
            <h2>All time</h2>
              <ul>
                {data.allTime.edges.map(edge => {
                    return(
                      <li key={edge.node.id}>
                          <a href={edge.node.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {edge.node.name}
                            {edge.node.artists.map((artist, i) => {
                                if (i > 0 && i === edge.node.artists.length - 1) {
                                    return ` and ${artist.name}`;
                                } else if (i > 0 && i !== edge.node.artists.length - 1) {
                                    return `, ${artist.name}`;
                                } else {
                                    return ` - ${artist.name}`;  
                                }
                            })}
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
  query tracksPageQuery {
    current: allSpotifyTopTrack(
      filter: { time_range: { eq: "short_term" } }
      sort: { fields: order }
    ) {
      edges {
        node {
          id
          name
          artists {
              name
          }
          external_urls {
            spotify
          }
        }
      }
    }
    allTime: allSpotifyTopTrack(
      filter: { time_range: { eq: "long_term" } }
      sort: { fields: order }
    ) {
      edges {
        node {
          id
          name
          artists {
              name
          }
          external_urls {
            spotify
          }
        }
      }
    }
}
`

export default Tracks;
