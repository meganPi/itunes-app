import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Card from 'react-bootstrap/Card';
import "../App.css";

function Favourites() {
  //empty array created for all the favourite results
  let displayfavs = [];
  let favourites = JSON.parse(sessionStorage.getItem("favouriteList"));
  //if statement to check that the favouritesList from sessionStorage
  //is not equal to null
  if (favourites !== null) {
    for (let i = 0; i < favourites.length; i++) {
      let id = favourites[i].id;
      let name = favourites[i].name;
      let title = favourites[i].itemTitle;
      let thumbnail = favourites[i].imgThumbnail;
      let link = favourites[i].link;
      
      displayfavs.push(
        <div className="card-item">
          <Card key={uuid()}>
            <Card.Img variant="top" src={thumbnail} className="card-image"/>
            <Card.Body>
            <Card.Title key={uuid()}>{title}</Card.Title>
            <Card.Subtitle className="itemTitle" key={uuid()}>{name}:</Card.Subtitle>
            <a rel="noopener noreferrer" className="viewItem" target="_blank" href={link} key={uuid()}>View</a>
            <br/>
            <br/>
            <a href="" className="deleteItem"onClick={() => deletefav(id)}>Delete</a>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
  //below function will allow the user to delete a favourite
  const deletefav = id => {
    let favourites = JSON.parse(sessionStorage.getItem("favouriteList"));
    //filter out the item that the user doesn't want
    //on their list...
    let filtered = favourites.filter((value, index, arr) => {
      return value.id !== id;
    });
    sessionStorage.setItem("favouriteList", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div>
      <Link to="/">
        <p className="homeLink">Home</p>
      </Link>
      <h1>Favourites</h1>
      <div className="resultsCard">
      {displayfavs}
      </div>
    </div>
  );
}

export default Favourites;
