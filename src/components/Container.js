import React from "react";

const Title = () => (
  <h2 className='title'>Recipe Box</h2>
);

const Container = props => (

  <div className="container">
      <Title />
        {props.children}
  </div>
);


export default Container;
