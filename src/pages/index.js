import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';
import Img from "gatsby-image";

const axios = require("axios");


const Home = ({data}) => {


  const getSpotifyData = (token) => {
    axios({
        method: "GET",
        url: "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": 'application/x-www-form-urlencoded',
        }
    })
    .then(res => console.log(res)) // parse JSON from request
    .catch(err => err);
}

const getAccessToken = () => {
    axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: "grant_type=client_credentials",
        headers: {
            "Authorization": "Basic " + (new Buffer(process.env.GATSBY_CLIENT_ID + ":" + process.env.GATSBY_CLIENT_SECRET).toString('base64')),
            "Content-Type": "application/x-www-form-urlencoded", 
        }
    })
    .then(res => {
      console.log(res)
      getSpotifyData(res.data.access_token)

    }) // parse JSON from request
    // .then(result => {
    //   console.log(result.access_token);
    //   getSpotifyData(result.access_token)
    // }) 

    .catch(err => err);
}

// const send = body => {
//     callback(null, {
//         statusCode: 200,
//         body: JSON.stringify(body)
//     });
// }

// fn calls
getAccessToken();

    // TODO: move this to functions folder 
    
    // authorize and receive access token
    // fetch(`https://accounts.spotify.com/api/token`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Basic ' + (new Buffer(process.env.GATSBY_CLIENT_ID + ':' + process.env.GATSBY_CLIENT_SECRET).toString('base64')),
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: `grant_type=client_credentials`
    // })
    //   .then(response => response.json()) // parse JSON from request
    //   .then(resultData => {
    //     let accessToken = resultData.access_token;
    //     console.log(accessToken);

    //     fetch(`https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl`, {
    //       method: 'GET',
    //       headers: {
    //         'Authorization': 'Bearer ' + accessToken,
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       }
    //   }) 
    //   .then(body => body.json()) // parse JSON from request
    //   .then(data => console.log(data))
    // })

    

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
