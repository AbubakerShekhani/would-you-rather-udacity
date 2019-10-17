import { _saveQuestion, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function saveAnswer(answer) {
    return {
        type: SAVE_ANSWER,
        answer
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function handleGetQuestions() {
    return (dispatch) => {
        return _getQuestions()
            .then((questions) =>
                dispatch(receiveQuestions(questions)))
    }
}