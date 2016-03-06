"use strict";

import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import Button from "../components/Button";
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
            <TouchableOpacity onPress={this._onPlay}>
                <Image style={styles.playButton} source={require("../../images/play.png")} />
            </TouchableOpacity> :
            <Button style={styles.newRoundButton} onPress={this._onNewRound}>
                NEW ROUND
            </Button>;

        const scores = this.props.isPlaying ?
            <Text style={[styles.status, styles.text]}>
                Score: {this.props.roundsWon}, round: {this.props.roundsPlayed} / 10
            </Text> :
            <Text style={[styles.status, styles.text]}></Text>;

        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Image style={styles.bgNote} source={require("../../images/note.png")} />
                    {scores}
                    <Text style={[styles.title, styles.text]}>
                        {this.props.roundsPlayed === 0 ?
                            "Musical Intervals" :
                            `Round ${this.props.roundsPlayed}, won ${this.props.roundsWon}`
                        }
                    </Text>
                    <Text style={[styles.answer, styles.text]}>
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
    text: {
        backgroundColor: "transparent",
        fontFamily: "Avenir Next"
    },
    container: {
        flex: 1
    },
    info: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    playButton: {
        height: 100,
        width: 100
    },
    bgNote: {
        height: 300,
        width: 300,
        position: "absolute",
        top: 20,
        right: 0
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    newRoundButton: {
        margin: 10,
        width: 100
    }
});

const select = store => {
    return {
        isPlaying: store.gameState.get("isPlaying"),
        isCorrect: store.gameState.getIn(["answer", "isCorrect"]),
        isAttemptedAtLeastOnce: store.gameState.getIn(["answer", "isAttemptedAtLeastOnce"]),
        attempts: store.gameState.getIn(["answer", "attempts"]),
        correctAnswer: store.gameState.getIn(["question", "relativePitch"]),
        roundsPlayed: store.gameState.get("roundsPlayed"),
        roundsWon: store.gameState.get("roundsWon"),
        statusMessage: store.gameState.get("statusMessage")
    }
};

export default connect(select)(MainView);
