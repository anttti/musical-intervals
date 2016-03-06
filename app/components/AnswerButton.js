import React, {
    StyleSheet,
    View
} from "react-native";
import Button from "apsl-react-native-button";

const AnswerButton = ({ onPress, isDisabled, title, relativePitch }) => {
    return <View style={styles.buttonContainer}>
        <Button
            style={styles.button}
            onPress={() => onPress(relativePitch)}
            isDisabled={isDisabled}>
            {title}
        </Button>
    </View>;
};

const styles = StyleSheet.create({
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

export default AnswerButton;
