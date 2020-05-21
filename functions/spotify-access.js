const axios = require("axios");

exports.handler = (event, _context, callback) => {
    // TODO: 

    // ** IMPORTANT ** looks like a need the authorization code flow in order
    // to view my own listening patterns. See if you can do this. 
    
    // 1. get most recent track
    // 2. get top 10 current + all time artists
    // 3. get top 10 current + all time tracks

    const getSpotifyData = (token) => {
        axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/player",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        .then(res => send(res.data)) // parse JSON from request
        .catch(err => send(err));
    }

    const getAccessToken = () => {
        axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "Authorization": "Basic " + (new Buffer(process.env.GATSBY_CLIENT_ID + ":" + process.env.GATSBY_CLIENT_SECRET).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded", 
            },
            data: "grant_type=client_credentials",
        })
        .then(res => {
            getSpotifyData(res.data.access_token)
        }) 
        .catch(err => send(err));
    }

    const send = body => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        });
    }

    // fn calls
    getAccessToken();

};