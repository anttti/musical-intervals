import React, {
    StyleSheet,
    View
} from "react-native";
import Button from "apsl-react-native-button";

const AnswerButtons = ({ isDisabled, onPress }) => {
    return <View style={styles.answerButtons}>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(0)}
            isDisabled={isDisabled}>
            Unison
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(1)}
            isDisabled={isDisabled}>
            Min 2nd
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(2)}
            isDisabled={isDisabled}>
            Maj 2nd
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(3)}
            isDisabled={isDisabled}>
            Min 3rd
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(4)}
            isDisabled={isDisabled}>
            Maj 3rd
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(5)}
            isDisabled={isDisabled}>
            Perfect 4th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(6)}
            isDisabled={isDisabled}>
            Aug 4th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(7)}
            isDisabled={isDisabled}>
            Perfect 5th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(8)}
            isDisabled={isDisabled}>
            Min 6th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(9)}
            isDisabled={isDisabled}>
            Maj 6th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(10)}
            isDisabled={isDisabled}>
            Min 7th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(11)}
            isDisabled={isDisabled}>
            Maj 7th
        </Button>
        <Button
            style={[styles.answerButton, styles.btn]}
            onPress={() => onPress(12)}
            isDisabled={isDisabled}>
            Octave
        </Button>
    </View>;
};

const styles = StyleSheet.create({
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
    btn: {
        backgroundColor: "#ff00ff",
        borderColor: "#ff00ff",
        margin: 10
    }
});

export default AnswerButtons;
