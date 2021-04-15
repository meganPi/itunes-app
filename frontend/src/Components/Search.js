import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchResults from "./Results";

class Search extends Component {
  constructor(props) {
    super(props);
    this.mediaOnChange = this.mediaOnChange.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.state = {
      media: 'all',
      searchFor: '',
      searchResults: []
    };
  }

  //below code will fetch data from express server
  //when the user clicks search
  fetchSearchResults(e){
    e.preventDefault();
    fetch('/search', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        //data below is gonna be accessed by the server
        //which is going to specify the media type and 
        //what needs to be searched.
        media: this.state.media,
        searchFor: this.state.searchFor
      })
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        searchResults: result
      })
    })
    .catch(error => alert("Unable to connect to the server"))
  }

  searchOnChange(e) {
    this.setState({
      searchFor: e.target.value
    });
  }

  //component state changes based on user search
  mediaOnChange(e) {
    this.setState({
      media: e.target.value
    });
  }
  render() {
    return (
      <div>
        <Link to='/fav'>
          <button className="favouriteLink">Favourites</button>
        </Link>
        <form onSubmit={this.fetchSearchResults}>
          <select onChange={this.mediaOnChange}>
            <option>all</option>
            <option>music</option>
            <option>podcast</option>
            <option>movie</option>
            <option>tv show</option>
            <option>short film</option>
            <option>audiobook</option>
            <option>ebook</option>
            <option>software</option>
          </select>
          <br />
          <input required onChange={this.searchOnChange} type="text" />
          <button id="searchBtn">Search</button>
        </form>
        <SearchResults results={this.state.searchResults}/>
      </div>
    );
  }
}

export default Search;
