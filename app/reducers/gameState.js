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
                if (!state.getIn(["answer", "isAttemptedAtLeastOnce"])) {
                    return newState
                        .set("statusMessage", "Correct on the first try!")
                        .update("roundsWon", rounds => rounds + 1);
                }
                return newState
                    .set("statusMessage", "Finally! Try harder next time.");
            } else {
                return state
                    .set("statusMessage", action.payload > correctAnswer ?
                        "Too high!" :
                        "Too low!")
                    .setIn(["answer", "isAttemptedAtLeastOnce"], true);
            }
        default:
            return state;
    }
}
