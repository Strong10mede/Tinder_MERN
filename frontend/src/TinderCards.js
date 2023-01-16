import axios from "./axios";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
function TinderCards() {
  // initialize with empty array
  //   const [people, setPeople] = useState([]);

  const [people, setPeople] = useState([]);

  //   when tinder cards component loads it will run this piece code once, and not run it again
  // add var to bottom bracket, whenever var name changes it's actually gonna refile this code
  useEffect(() => {
    async function fetchData() {
      //cuz base url already set up in axios.js
      const req = await axios.get("/tinder/cards");

      setPeople(req.data);
    }
    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
