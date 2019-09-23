import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  async componentDidMount() {
    let randomJokes = [];
    let idArr = [];
    for (let i = 0; i < 10; i++) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });

      let { id, joke } = response.data;
      let jokeObj = { joke, id, score: 0 };
      if (idArr.includes(jokeObj.id)) {
        i--;
      } else {
        idArr.push(jokeObj.id);
        randomJokes.push(jokeObj);
      }
    }

    this.setState({ jokes: randomJokes }, () =>
      console.log("STATE OF JOKE", this.state.jokes)
    );
  }

  upvote(idx) {
    let updatedJokes = [...this.state.jokes];
    updatedJokes[idx].score++;
    this.setState({
      jokes: updatedJokes
    });
    this.sortJokes();
  }

  downvote(idx) {
    let updatedJokes = [...this.state.jokes];
    updatedJokes[idx].score--;
    this.setState({
      jokes: updatedJokes
    });
    this.sortJokes();
  }

  sortJokes() {
    let sortJokes = [...this.state.jokes];
    sortJokes.sort(this.compareScores);
    this.setState({ jokes: sortJokes });
  }

  compareScores(a, b) {
    return b.score - a.score;
  }

  render() {
    return (
      <div className="Jokelist">
        <h1> JOKES ON YOU! </h1>
        {!this.state.jokes.length ? (
          <div className="lds-hourglass"></div>
        ) : (
          this.state.jokes.map((joke, idx) => {
            return (
              <Joke
                key={joke.id}
                text={joke.joke}
                id={joke.id}
                score={joke.score}
                upvote={() => this.upvote(idx)}
                downvote={() => this.downvote(idx)}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default JokeList;
