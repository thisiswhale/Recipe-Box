import React from "react";
import ReactDOM from "react-dom";
import './style.scss';

import Container from "./components/Container";
import RecipeCard from "./components/RecipeCard";

// Creating an App component which renders a ListContainer inside of a Container
const App = () => (
  <Container>
    <RecipeCard />
  </Container>
);


ReactDOM.render(<App />, document.getElementById("app"));
