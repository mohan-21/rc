import React, { Component } from 'react';
import Router from './page/Router';
import Nav from './page/Nav';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} className="App-logo" alt="logo" />
                    <p>Master</p>

                    <Nav/>
                    <Router/>
                </header>
            </div>
        );
    }
}

export default App;