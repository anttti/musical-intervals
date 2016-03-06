"use strict";

import _ from "lodash";
import React, {
    StyleSheet,
    View
} from "react-native";
import Button from "./AnswerButton";
import Notes from "../constants/Notes";

const notes = _.chunk(Notes, 3);

const AnswerButtons = ({ isDisabled, onPress }) => {
    return <View style={styles.buttons}>
        <View style={styles.row}>
            {notes[0].map(note =>
                <Button
                    key={note.relativePitch}
                    onPress={onPress}
                    isDisabled={isDisabled}
                    title={note.name}
                    relativePitch={note.relativePitch} />
            )}
        </View>
        <View style={styles.row}>
            {notes[1].map(note =>
                <Button
                    key={note.relativePitch}
                    onPress={onPress}
                    isDisabled={isDisabled}
                    title={note.name}
                    relativePitch={note.relativePitch} />
            )}
        </View>
        <View style={styles.row}>
            {notes[2].map(note =>
                <Button
                    key={note.relativePitch}
                    onPress={onPress}
                    isDisabled={isDisabled}
                    title={note.name}
                    relativePitch={note.relativePitch} />
            )}
        </View>
        <View style={styles.row}>
            {notes[3].map(note =>
                <Button
                    key={note.relativePitch}
                    onPress={onPress}
                    isDisabled={isDisabled}
                    title={note.name}
                    relativePitch={note.relativePitch} />
            )}
        </View>
        <View style={styles.row}>
            {notes[4].map(note =>
                <Button
                    key={note.relativePitch}
                    onPress={onPress}
                    isDisabled={isDisabled}
                    title={note.name}
                    relativePitch={note.relativePitch} />
            )}
        </View>
    </View>;
};

const styles = StyleSheet.create({
    buttons: {
        flex: 0.6,
        padding: 10
    },
    row: {
        flex: 0.2,
        flexDirection: "row",
    }
});

export default AnswerButtons;
