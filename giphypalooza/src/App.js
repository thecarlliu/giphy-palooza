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
                    this.resetScore();
                    this.resetClicked();
                }
                else {
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
                <div className="jumbotron">
                    <h1 className="title">Giphy-Palooza!</h1>
                    <p className="lead subtitle">Click on a gif to score points!</p>
                    <p className="lead subtitle">Don't click on the same gif twice, or you'll have to start over!</p>
                    <hr className="my-4"/>
                    <p className="scores">Score: {this.state.score}  Highscore: {this.state.highScore}</p>
                    <hr className="my-4"/>
                    <div className="gallery">
                        {
                            this.state.gifs.map((gif) => (
                                <img
                                    id={gif.id}
                                    key={gif.id}
                                    alt={gif.name}
                                    src={gif.image}
                                    className="gif"
                                    width="auto"
                                    height="150px"
                                    onClick={() => this.update(gif.name)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default App;