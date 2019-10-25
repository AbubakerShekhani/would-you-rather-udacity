import { _saveQuestion, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA'
import { handleReceiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

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
        dispatch(showLoading())

        return _getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleAddQuestion(question) {



    return (dispatch) => {

        dispatch(showLoading())
        return _saveQuestion(question)
            .then(()=> {
                dispatch(handleReceiveUsers())
                dispatch(handleGetQuestions())
                dispatch(hideLoading())
            }

        )
    }
}

export function handleSaveQuestionAnswer(userAnswer) {

    return (dispatch) => {
        dispatch(showLoading())

        return _saveQuestionAnswer(userAnswer)
            .then(() => {
                dispatch(handleReceiveUsers())
                dispatch(handleGetQuestions())
                dispatch(hideLoading())
            }
                )

    }
}