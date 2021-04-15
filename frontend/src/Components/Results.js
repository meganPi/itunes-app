import React from "react";
import uuid from "react-uuid";
import Card from 'react-bootstrap/Card';
import "../App.css";

const SearchResults = props => {
  //empty array created for all the search results
  let items = [];
  let results = props.results;
  //Gets URL for the bigger size image
  const ImageEnhancer = url => {
		let index=url.lastIndexOf('/');
		return url.slice(0,index)+'/500x500bb.jpg'
  };
  //if statement to check props passed down is not equal to zero
  //so that the loop can run to display the search results
  if (results.length !== 0) {
    for (let i = 0; i < results.results.length; i++) {
      //loop through data passed as props
      let link = results.results[i].collectionViewUrl
      let name = results.results[i].artistName;
      let itemTitle = results.results[i].trackCensoredName;
      let imgThumbnail = ImageEnhancer(results.results[i].artworkUrl100);
      //push loop in array
      items.push(
      //Card styles from Bootstrap
      <div className="card-item">
        <Card key={uuid()}>
          <Card.Img variant="top" src={imgThumbnail} className="card-image"/>
          <Card.Body>
            <Card.Title key={uuid()}>{itemTitle}</Card.Title>
              <Card.Subtitle className="itemTitle" key={uuid()}>{name}:</Card.Subtitle>
                <a rel="noopener noreferrer" className="viewItem" target="_blank" href={link} key={uuid()}>View</a>
                <br/>
                <br/>
                <a href="" className="favouriteAdd" onClick={()=> addFavourite(name, itemTitle, link, imgThumbnail)}>Add to favourites</a>
          </Card.Body>
          </Card>
      </div>
      );
    }
  }

  //add items to favourites
  const addFavourite = (name, itemTitle, link, imgThumbnail) => {
    //store to session storage if favouriteList is set to null
    if (sessionStorage.getItem('favouriteList') === null) {
      //empty array created for all the favourites
      const favs = [];
      sessionStorage.setItem('favouriteList', JSON.stringify(favs));
    }
    let addfav = JSON.parse(sessionStorage.getItem('favouriteList'));
     //create a new favourite object
     const newFav = {
      id: uuid(),
      imgThumbnail: imgThumbnail,
      itemTitle: itemTitle,
      name: name,
      link:link,
    };
    
    //add favourite to sessionStorage
    addfav.push(newFav);
    //alert when item successfully added
    sessionStorage.setItem('favouriteList', JSON.stringify(addfav));
    alert("Added to Favourites");
  };

  return (
    <div>
      <h1>Top Results:</h1>
      <div className="resultsCard">
      {items}
      </div>
    </div>
  );
};

export default SearchResults;
