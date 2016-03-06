import React, {
    StyleSheet,
    View
} from "react-native";
import Button from "apsl-react-native-button";

const AnswerButtons = ({ isDisabled, onPress }) => {
    return <View style={styles.buttons}>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(0)}
                    isDisabled={isDisabled}>
                    Unison
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(1)}
                    isDisabled={isDisabled}>
                    Min 2nd
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(2)}
                    isDisabled={isDisabled}>
                    Maj 2nd
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(3)}
                    isDisabled={isDisabled}>
                    Min 3rd
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(4)}
                    isDisabled={isDisabled}>
                    Maj 3rd
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(5)}
                    isDisabled={isDisabled}>
                    Perfect 4th
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(6)}
                    isDisabled={isDisabled}>
                    Aug 4th
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(7)}
                    isDisabled={isDisabled}>
                    Perfect 5th
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(8)}
                    isDisabled={isDisabled}>
                    Min 6th
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(9)}
                    isDisabled={isDisabled}>
                    Maj 6th
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(10)}
                    isDisabled={isDisabled}>
                    Min 7th
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(11)}
                    isDisabled={isDisabled}>
                    Maj 7th
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={() => onPress(12)}
                    isDisabled={isDisabled}>
                    Octave
                </Button>
            </View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    buttons: {
        flex: 0.6
    },
    row: {
        flex: 0.2,
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 0.3333333,
    },
    button: {
        flex: 1,
        backgroundColor: "#ff00ff",
        borderColor: "#ff00ff",
        borderRadius: 0,
        marginBottom: 0
    }
});

export default AnswerButtons;
