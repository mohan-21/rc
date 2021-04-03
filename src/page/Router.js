import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import MarriageDivorce from './MarriageDivorce';

class Router extends Component {
    render() {
        return (
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/contact' component={Contact}/>
              <Route path='/marriage-divorce' component={MarriageDivorce}/>
          </Switch>
        );
    }
}

export default Router;
