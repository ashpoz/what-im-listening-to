import React from "react"

class Search extends React.Component {
    render() {
        return(
            <form>
                <label htmlFor="">Search:</label>
                <input type="text"/>
                <button type="submit">Submit</button>
            </form>
        )
    }
} 

export default Search;
