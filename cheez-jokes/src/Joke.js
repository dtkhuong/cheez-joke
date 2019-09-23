import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <p className="text">{this.props.text}</p>
        <p className="score">{this.props.score}</p>
        <button onClick={this.props.upvote}>^</button>
        <button onClick={this.props.downvote}>v</button>
      </div>
    );
  }
}

export default Joke;
