// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
} from 'antd';
import { QuizDuelQuestion } from '../../gamif-interfaces';

/**
 * TODO: Database call to draw out questions.
 * @returns 3 Questions for use in the quiz duel energizer
 */
const generateQuestions = (): QuizDuelQuestion[] => {
    const dummyQuestions = [{
        question: 'What is 2x2',
        answerA: '1',
        answerB: '2',
        answerC: '3',
        answerD: '4',
        correctAnswer: 4,
    },
    {
        question: 'Who is the current president of the US',
        answerA: 'Biden',
        answerB: 'Trump',
        answerC: 'Merkel',
        answerD: 'Me',
        correctAnswer: 1,
    }];

    return dummyQuestions;
};

export default function QuizDuel(): JSX.Element {
    const [progress, setProgress] = useState(1);
    const [readyToContinue, setContinue] = useState(false);

    const questions = generateQuestions();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

    return (
        <div className='gamif-energizer-modal-content-wrapper'>
            <div className='quiz-duel-heading'>
                <h2>{`Question ${progress}`}</h2>
            </div>
            <div className='quiz-duel-status-bar'>
                {/* TODO: Set div style based on answers given */}
                <div className='quiz-duel-status-bar-element-empty'> &nbsp;</div>
                <div className='quiz-duel-status-bar-element-correct'> &nbsp;</div>
                <div className='quiz-duel-status-bar-element-wrong'> &nbsp;</div>
            </div>
            <div className='quiz-duel-question'>
                <h1>{currentQuestion.question}</h1>
            </div>
            <div className='quiz-duel-answer-box'>
                <div>
                    <Button className='quiz-duel-answer-button'>
                        {currentQuestion.answerA}
                    </Button>
                    <Button className='quiz-duel-answer-button'>
                        {currentQuestion.answerB}
                    </Button>

                </div>
                <div>
                    <Button className='quiz-duel-answer-button'>
                        {currentQuestion.answerC}
                    </Button>
                    <Button className='quiz-duel-answer-button'>
                        {currentQuestion.answerD}
                    </Button>
                </div>
            </div>
            <Button
                className='gamif-energizer-continue-button'
                type='text'
                disabled={readyToContinue}
                onClick={(): void => {
                    setProgress(progress + 1);
                    setContinue(false);
                    setCurrentQuestion(questions[progress - 1]);
                    // TODO: Show leaderboard + wrap up when finished
                    // TODO: Show correct answer!
                }}
            >
                Continue
            </Button>
        </div>
    );
}
