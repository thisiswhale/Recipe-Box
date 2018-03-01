import React from "react";
import ReactDOM from "react-dom";
import './style.scss';

import Container from "./components/Container";
import Class1 from "./components/Class1";

// Creating an App component which renders a ListContainer inside of a Container
const App = () => (
  <Container>
    <Class1 />
  </Container>
);


ReactDOM.render(<App />, document.getElementById("app"));
