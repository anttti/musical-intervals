"use strict";

import Immutable from "immutable";
import Notes from "../constants/Notes";
import {
    NEW_ROUND,
    ANSWER
} from "../actions/gameState";

const initialRoundState = Immutable.fromJS({
    isPlaying: false,
    answer: {
        isAttemptedAtLeastOnce: false,
        attempts: 0,
        isCorrect: false
    },
    question: null
});

const initialState = Immutable.fromJS({
    roundsPlayed: 0,
    roundsWon: 0,
    statusMessage: "Hit New Round to start!"
}).merge(initialRoundState);

const getQuestion = () => {
    const index = Math.floor(Math.random() * Notes.length);
    return Immutable.fromJS(Notes[index]);
};

const getWrongAnswerStatusMessage = (answer, correctAnswer, attempts) => {
    const dir = answer > correctAnswer ? "Too high!" : "Too low!";

    switch (attempts) {
        case 1:
            return "Nope!";
        case 2:
            return "No, that's not it!";
        case 3:
            return "That would be incorrect!";
        default:
            return `${dir} This was guess number ${attempts} already...`;
    }
};

export default function gameState(state = initialState, action) {
    switch (action.type) {
        case NEW_ROUND:
            return state.merge(initialRoundState)
                .set("isPlaying", true)
                .set("question", getQuestion())
                .set("statusMessage", " ")
                .update("roundsPlayed", rounds => rounds + 1);
        case ANSWER:
            const correctAnswer = state.getIn(["question", "relativePitch"]);
            if (action.payload === correctAnswer) {
                const newState = state
                    .set("isPlaying", false)
                    .setIn(["answer", "isCorrect"], true);
                if (state.getIn(["answer", "attempts"]) === 0) {
                    return newState
                        .set("statusMessage", "Correct on the first try!")
                        .update("roundsWon", rounds => rounds + 1);
                }
                return newState
                    .set("statusMessage", "Finally! Try harder next time.");
            } else {
                return state
                    .set("statusMessage", getWrongAnswerStatusMessage(
                        action.payload,
                        correctAnswer,
                        state.getIn(["answer", "attempts"])))
                    .updateIn(["answer", "attempts"], attempts => attempts + 1);
            }
        default:
            return state;
    }
}
