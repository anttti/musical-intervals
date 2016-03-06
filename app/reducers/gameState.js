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
        isCorrect: false,
        isTooHigh: false,
        isTooLow: false
    },
    question: null
});

const initialState = Immutable.fromJS({
    roundsPlayed: 0,
    roundsWon: 0
}).merge(initialRoundState);

const getQuestion = () => {
    const index = Math.floor(Math.random() * Notes.length);
    console.log(index, Notes.length);
    return Immutable.fromJS(Notes[index]);
};

export default function gameState(state = initialState, action) {
    switch (action.type) {
        case NEW_ROUND:
            return state.merge(initialRoundState)
                .set("isPlaying", true)
                .set("question", getQuestion())
                .update("roundsPlayed", rounds => rounds + 1);
        case ANSWER:
            const correctAnswer = state.getIn(["question", "relativePitch"]);
            if (action.payload === correctAnswer) {
                return state
                    .set("isPlaying", false)
                    .setIn(["answer", "isCorrect"], true)
                    .update("roundsWon", rounds => rounds + 1);
            } else {
                return state
                    .setIn(["answer", "isTooHigh"], (action.payload > correctAnswer))
                    .setIn(["answer", "isTooLow"], (action.payload < correctAnswer))
                    .setIn(["answer", "isAttemptedAtLeastOnce"], true);
            }
        default:
            return state;
    }
}
