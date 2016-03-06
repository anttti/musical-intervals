"use strict";

import React, {
    Component,
    StyleSheet,
    View,
    Text
} from "react-native";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import Button from "apsl-react-native-button";
import notes from "../constants/Notes";
import * as GameStateActions from "../actions/gameState";

class MainView extends Component {
    constructor() {
        super();
        this._onPlay = this._onPlay.bind(this);
        this._onAnswer = this._onAnswer.bind(this);
        this._onNewRound = this._onNewRound.bind(this);
    }

    componentWillMount() {
        this.sounds = [];
        notes.forEach(note => {
            this.sounds.push({
                note: note.note,
                relativePitch: note.relativePitch,
                sound: new Sound(note.fileName, Sound.MAIN_BUNDLE, error => {
                    if (error) {
                        console.log("Failed to load", note, error);
                    } else {
                        console.log("Loaded", note);
                    }
                })
            })
        });
    }

    _onPlay() {
        const root = this.sounds[0];
        const interval = this.sounds[this.props.correctAnswer];
        root.sound.play(() => {
            interval.sound.play(() => {
                root.sound.play();
                interval.sound.play();
            });
        });
    }

    _onAnswer(answer) {
        this.props.dispatch(GameStateActions.answer(answer));
    }

    _onNewRound() {
        this.props.dispatch(GameStateActions.newRound());
    }

    render() {
        let status = "";
        if (!this.props.isPlaying) {
            status = "Hit New Round to start";
        } else {
            status = "So which is it?";
            if (this.props.isCorrect) {
                status = "Correct! Hit New Round to start";
            }
            if (this.props.isTooHigh) {
                status = "Too high!";
            }
            if (this.props.isTooLow) {
                status = "Too low!";
            }
            status += " (" + this.props.correctAnswer + ")";
        }
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.title}>
                        Musical Intervals (Round {this.props.roundsPlayed}, won {this.props.roundsWon})
                    </Text>
                    <Text style={styles.answer}>
                        {status}
                    </Text>
                    <Button style={styles.btn} onPress={this._onPlay}>
                        Play
                    </Button>
                    <Button style={styles.btn} onPress={this._onNewRound}>
                        New round
                    </Button>
                </View>
                <View style={styles.answerButtons}>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(0)}>
                        Unison
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(1)}>
                        Min 2nd
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(2)}>
                        Maj 2nd
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(3)}>
                        Min 3rd
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(4)}>
                        Maj 3rd
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(5)}>
                        Perfect 4th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(6)}>
                        Aug 4th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(6)}>
                        Perfect 5th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(7)}>
                        Min 6th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(8)}>
                        Maj 6th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(9)}>
                        Min 7th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(10)}>
                        Maj 7th
                    </Button>
                    <Button style={[styles.answerButton, styles.btn]} onPress={() => this._onAnswer(11)}>
                        Octave
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    info: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    answerButtons: {
        flex: 0.6,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5
    },
    answerButton: {
        margin: 10,
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff00ff"
    },
    playButton: {
        padding: 10,
        backgroundColor: "#ff00ff"
    },
    btn: {
        backgroundColor: "#ff00ff",
        borderColor: "#ff00ff",
        margin: 10
    }
});

const select = store => {
    return {
        isPlaying: store.gameState.get("isPlaying"),
        isCorrect: store.gameState.getIn(["answer", "isCorrect"]),
        isAttemptedAtLeastOnce: store.gameState.getIn(["answer", "isAttemptedAtLeastOnce"]),
        isTooHigh: store.gameState.getIn(["answer", "isTooHigh"]),
        isTooLow: store.gameState.getIn(["answer", "isTooLow"]),
        correctAnswer: store.gameState.getIn(["question", "relativePitch"]),
        roundsPlayed: store.gameState.get("roundsPlayed"),
        roundsWon: store.gameState.get("roundsWon")
    }
};

export default connect(select)(MainView);
