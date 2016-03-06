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
import AnswerButtons from "../components/AnswerButtons";
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
        const actionButton = this.props.isPlaying ?
            <Button style={styles.btn} onPress={this._onPlay} isDisabled={!this.props.isPlaying}>
                Play Interval
            </Button> :
            <Button style={styles.btn} onPress={this._onNewRound}>
                New Round
            </Button>
        const scores = this.props.isPlaying ?
            <Text style={styles.status}>
                Score: {this.props.roundsWon}, round: {this.props.roundsPlayed} / 10
            </Text> :
            <Text style={styles.status}></Text>;

        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    {scores}
                    <Text style={styles.title}>
                        {this.props.roundsPlayed === 0 ?
                            "Musical Intervals" :
                            `Round ${this.props.roundsPlayed}, won ${this.props.roundsWon}`
                        }
                    </Text>
                    <Text style={styles.answer}>
                        {this.props.statusMessage}
                    </Text>
                    {actionButton}
                </View>
                <AnswerButtons isDisabled={!this.props.isPlaying} onPress={this._onAnswer} />
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
        correctAnswer: store.gameState.getIn(["question", "relativePitch"]),
        roundsPlayed: store.gameState.get("roundsPlayed"),
        roundsWon: store.gameState.get("roundsWon"),
        statusMessage: store.gameState.get("statusMessage")
    }
};

export default connect(select)(MainView);
