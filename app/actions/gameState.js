"use strict";

const NEW_ROUND = "NEW_ROUND";
const ANSWER = "ANSWER";

const newRound = () => {
    return { type: NEW_ROUND };
};

const answer = (answer) => {
    return { type: ANSWER, payload: answer };
};

export {
    NEW_ROUND,
    ANSWER,
    newRound,
    answer
};
