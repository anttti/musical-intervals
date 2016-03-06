"use strict";

import React, {
    StyleSheet,
    View
} from "react-native";
import Button from "./Button";

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
        padding: 10
    },
    button: {
        flex: 1,
        backgroundColor: "#50E3C2",
        borderWidth: 0,
        borderRadius: 100,
        marginBottom: 0
    }
});

export default AnswerButton;
