import React, { Component } from "react";
// import { hot } from "react-hot-loader";
import "./App.css";
import logo from "./assets/logo192.png";

class App extends Component {
    render() {
        return (
            <div className="App" style={{textAlign: "center"}}>
                <img src={logo} alt="" />
                <h1> Hello, World!!! </h1>
            </div>
        );
    }
}

export default App;
// export default hot(module)(App);
