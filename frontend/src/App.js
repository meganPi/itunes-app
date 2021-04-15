import React, { Component } from 'react'
import "./App.css";
import Search from "./Components/Search";
import { BrowserRouter, Route} from "react-router-dom";
import Favourites from './Components/Favourites';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <h1>Welcome to iTunes</h1>
            <p className="welcomeBanner">Browse through our selection of music, movies, podcasts and more</p>
            <Route
              path="/"
              exact={true}
              render={props => (
                <React.Fragment>
                <Search />
                </React.Fragment>
              )}
            />
            <Route path="/fav" component={Favourites}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
