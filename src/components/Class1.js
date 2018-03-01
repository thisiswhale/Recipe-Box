import React, {Component} from 'react';

class Class1 extends Component {

  constructor() {
    super();

  }
  hello = () => {
    return ( <h1> yikeas</h1>);
  }

  render() {
    return (
      <div>Hello
        {this.hello()}
      </div>
    );
  }
}
export default Class1;
