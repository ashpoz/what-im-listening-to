import React from "react";
import Search from "../components/search";

class Home extends React.Component {
    componentDidMount() {
        console.log("test");
    }
    render() {
        return(
            <>
                <h1>My site!</h1>
                <Search />
            </>
        )
    }
} 

export const pageQuery = graphql`
  query HomePageQuery {
  allSpotifyTopArtist(
    filter: { time_range: { eq: "medium_term" } }
    sort: { fields: order }
  ) {
    edges {
      node {
        name
        genres

      }
    }
  }
}
`

export default Home;
