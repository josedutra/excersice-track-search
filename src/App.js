import React, { Component } from "react";
import axios from "axios";

//import logo from './logo.svg';
import "./App.css";

var CLIENT_ID = "2302af1ebb9047c8b85d893612476ed0";
var REDIRECT = "http:%2F%2Flocalhost:3000%2Fcallback";
var SCOPE = "user-read-private";
var RESPONSE_TYPE = "token";

class App extends Component {
    constructor(props) {
        super(props);
        const hash = this.getAuthToken();
        this.state = {
            isAuthorised: hash != null,
            token: hash == null ? null : hash.access_token,
        };
    }

    handleLogInWithSpotifyClick() {
        let authURL =
            "https://accounts.spotify.com/authorize?client_id=" +
            CLIENT_ID +
            "&redirect_uri=" +
            REDIRECT +
            "&scope=" +
            SCOPE +
            "&response_type=" +
            RESPONSE_TYPE;
        window.location = authURL;
    }

    getAuthToken() {
        if (window.location.hash !== "") {
            const hash = window.location.hash
                .substring(1)
                .split("&")
                .reduce(function (initial, item) {
                    if (item) {
                        var parts = item.split("=");
                        initial[parts[0]] = decodeURIComponent(parts[1]);
                    }
                    return initial;
                }, {});

            window.location.hash = "";
            return hash;
        }
        return null;
    }

    render() {
        const authStatus =
            "Estado de autorización: " +
            (this.state.isAuthorised ? "AUTORIZADO" : "NO AUTORIZADO");
        return (
            <div className="App">
                <div className="App-login">
                    {authStatus}
                    <br />
                    <button className="loginBtn" onClick={this.handleLogInWithSpotifyClick}>
                        Login con Spotify
          </button>
                </div>
                <br />
                {
                    !this.state.isAuthorised ? 
                        <br />
                        : <h1>Loggueado a Spotify! Y ahora?</h1>
                    }
                <br />
            </div>
        );
    }
}

export default App;
