"use strict";
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import Sound from "react-native-sound";

const samples = [
  { note: "C", fileName: "C.wav" },
  { note: "C#", fileName: "C#.wav" },
  { note: "D", fileName: "D.wav" },
  { note: "D#", fileName: "D#.wav" },
  { note: "E", fileName: "E.wav" },
  { note: "F", fileName: "F.wav" },
  { note: "F#", fileName: "F#.wav" },
  { note: "G", fileName: "G.wav" },
  { note: "G#", fileName: "G#.wav" },
  { note: "A", fileName: "A.wav" },
  { note: "A#", fileName: "A#.wav" },
  { note: "B", fileName: "B.wav" }
];

class MusicalIntervals extends Component {
  constructor() {
    super();
    this._onPlay = this._onPlay.bind(this);
  }
  componentWillMount() {
    this.sounds = [];
    samples.forEach(sample => {
      this.sounds.push({
        note: sample.note,
        sound: new Sound(sample.fileName, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log("Failed to load", sample);
          } else {
            console.log("Loaded", sample);
          }
        })
      })
    });
  }
  _onPlay() {
    const sample = this.sounds[Math.floor(Math.random() * this.sounds.length)];
    console.log("Playing", sample.note);
    sample.sound.play();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Musical Intervals
        </Text>
        <TouchableHighlight activeOpacity={0.5} onPress={this._onPlay}>
          <Text>
            Play
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

AppRegistry.registerComponent("MusicalIntervals", () => MusicalIntervals);
