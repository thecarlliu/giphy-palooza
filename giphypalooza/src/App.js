import React, {Component} from "react";
import gifs from "./gifs.json";
import "./App.css";

//If a user clicks on an image:
//  If the image has already been clicked on:
//      Then score resets, and the board shuffles
//  If the image has yet to be clicked on:
//      If the score is lower than the top score
//          Then the score increments, and the board shuffles
//      If the score is equal to the top score
//          Then the top score and the score increment, and the board shuffles

class App extends Component {

    state = {
        gifs: gifs,
        score: 0,
        highScore: 0
    };

    carlRandomize = () => {
        gifs.sort(() => Math.random() - 0.5);
        this.setState({gifs: gifs});
    };
    incrementScore() {
        if (this.state.highScore <= this.state.score) {
            this.setState({score: this.state.score + 1});
            this.setState({highScore: this.state.highScore + 1});
        }
        else {
            this.setState({score: this.state.score + 1});
        }
    };
    resetScore() {
        this.setState({score: 0});
    };
    resetClicked() {
        this.state.gifs.forEach((gif) => {
            gif.isClicked = "false";
        });
        this.setState({gifs});
    };
    update = (gifName) => {
        gifs.forEach((gif) => {
            if (gif.name === gifName) {
                if (gif.isClicked === "true") {
                    alert("REEEE");
                    this.resetScore();
                    this.resetClicked();
                }
                else {
                    alert("correct");
                    gif.isClicked = "true";
                    this.setState({gifs: gifs});
                    this.incrementScore();
                }
            }
        });
        this.carlRandomize();
        console.log(this.state.gifs);
    };

    render() {
        return (
            <div>
                <h1 className="title">Giphy-Palooza!</h1>
                <h2 className="currentScore">Score: {this.state.score}</h2>
                <h2 className="highScore">High Score: {this.state.highScore}</h2>
                <div className="gallery">
                {
                    this.state.gifs.map((gif) => (
                        <img
                            id={gif.id}
                            key={gif.id}
                            alt={gif.name}
                            src={gif.image}
                            width="auto"
                            height="150px"
                            onClick={() => this.update(gif.name)}
                        />
                    ))
                }
                </div>
            </div>
        )
    }
}

export default App;