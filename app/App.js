import React from "react";
import ReactDOM from "react-dom";

import Container from "./components/Container";
import Leaderboard from "./components/Leaderboard";

// Creating an App component which renders a ListContainer inside of a Container
const App = () => (
  <Container>
    <Leaderboard />
  </Container>
);


ReactDOM.render(<App />, document.getElementById("app"));
