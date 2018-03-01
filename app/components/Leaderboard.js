import React, {Component} from 'react';

class Leaderboard extends Component {

  constructor() {
    super();
    this.state = {
      topAll: [],
      topRecent: [],
      category: 'all' //set default
    }

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
export default Leaderboard;
