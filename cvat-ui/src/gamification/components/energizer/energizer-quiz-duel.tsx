// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import 'gamification/gamif-styles.scss';
import {
    Button,
} from 'antd';
import getCore from 'cvat-core-wrapper';
import { addLeaderboardEntry } from 'gamification/actions/energizer-actions';
import { useDispatch } from 'react-redux';
import { QuizDuelQuestion, EnergizerProps, EnergizerType } from '../../gamif-interfaces';

const cvat = getCore();

enum Answer {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    NONE = 'NONE',
}

const mapAnswertoIndex = (answer: Answer): number => {
    switch (answer) {
        case Answer.A: return 1;
        case Answer.B: return 2;
        case Answer.C: return 3;
        case Answer.D: return 4;
        default: return 0;
    }
};

// interface QuizDuelUniqueProps {
//     questions: QuizDuelQuestion[],
// }

// type QuizDuelProps = QuizDuelUniqueProps & EnergizerProps;

export default function QuizDuel(props: EnergizerProps): JSX.Element {
    const { showLeaderboard } = props;

    const [divStyle, setDivStyle] = useState([
        'quiz-duel-status-bar-element-empty',
        'quiz-duel-status-bar-element-empty',
        'quiz-duel-status-bar-element-empty',
    ]);

    const updateStatusBar = (index: number, correct: boolean): void => {
        const newStyles = [...divStyle];
        newStyles[index] = correct ? 'quiz-duel-status-bar-element-correct' : 'quiz-duel-status-bar-element-wrong';
        setDivStyle(newStyles);
    };

    const initialButtonState = [
        'quiz-duel-answer-button',
        'quiz-duel-answer-button',
        'quiz-duel-answer-button',
        'quiz-duel-answer-button',
    ];

    const [answerButtonStyle, setAnswerButtonStyle] = useState(initialButtonState);

    function styleAnswerButtons(givenAnswer: number, correctAnswer: number): void {
        const newStyles = [...answerButtonStyle];
        newStyles[givenAnswer] = 'quiz-duel-answer-button answer-wrong';
        newStyles[correctAnswer] = 'quiz-duel-answer-button answer-correct';
        setAnswerButtonStyle(newStyles);
    }

    const [progress, setProgress] = useState(1);
    const [readyToContinue, setContinue] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(Answer.NONE);

    // const questions = generateQuestions();
    const dummyQuestion: QuizDuelQuestion = {
        question: 'What is 2x2',
        answerA: '1',
        answerB: '2',
        answerC: '3',
        answerD: '4',
        correctAnswer: 4,
    };

    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([dummyQuestion]);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getEntries = async (): Promise<void> => {
            const questionsImport = await cvat.energizer.quizDuelQuestions();
            setLoading(false);
            console.log('🚀 ~ file: energizer-quiz-duel.tsx ~ line 127 ~ getEntries ~ questionsImport', questionsImport);
            setQuestions(questionsImport);
            setCurrentQuestion(questions[0]);
        };

        getEntries();
    }, []);

    return (
        <div className='gamif-energizer-modal-content-wrapper'>
            <div className='quiz-duel-heading'>
                <h2>{`Question ${progress}`}</h2>
            </div>
            <div className='quiz-duel-status-bar'>
                {divStyle.map((el) => <div className={el}> &nbsp;</div>)}
            </div>

            {loading ?
                <div> Loading </div> : (
                    <>
                        <div className='quiz-duel-question'>
                            <h1>{currentQuestion.question}</h1>
                        </div>
                        <div className='quiz-duel-answer-box'>
                            <div>
                                <Button
                                    className={answerButtonStyle[0]}
                                    onClick={(): void => {
                                        setCurrentAnswer(Answer.A);
                                    }}
                                >
                                    {currentQuestion.answerA}
                                </Button>
                                <Button
                                    className={answerButtonStyle[1]}
                                    onClick={(): void => {
                                        setCurrentAnswer(Answer.B);
                                    }}
                                >
                                    {currentQuestion.answerB}
                                </Button>

                            </div>
                            <div>
                                <Button
                                    className={answerButtonStyle[2]}
                                    onClick={(): void => {
                                        setCurrentAnswer(Answer.C);
                                    }}

                                >
                                    {currentQuestion.answerC}
                                </Button>
                                <Button
                                    className={answerButtonStyle[3]}
                                    onClick={(): void => {
                                        setCurrentAnswer(Answer.D);
                                    }}
                                >
                                    {currentQuestion.answerD}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            <Button
                className='gamif-energizer-continue-button'
                type='text'
                disabled={loading}
                onClick={(): void => {
                    // first button click: Check Answer + show correct answer + update Status Bar
                    if (currentAnswer !== Answer.NONE && !readyToContinue) {
                        console.log('First Button Press');
                        const answerCorrect = mapAnswertoIndex(currentAnswer) === currentQuestion.correctAnswer;
                        if (answerCorrect) { setScore(score + 1); }
                        updateStatusBar(progress - 1, answerCorrect);
                        styleAnswerButtons(mapAnswertoIndex(currentAnswer) - 1, currentQuestion.correctAnswer - 1);
                        setContinue(true);
                    }

                    // if on 3rd question and answer is checked --> show Leaderboard instead of
                    // continuing to the next question
                    if (progress === 3 && readyToContinue) {
                        showLeaderboard(true);
                        dispatch(addLeaderboardEntry(score, EnergizerType.QUIZ));

                    // second button click:
                    } else if (readyToContinue) {
                        console.log('Second Button Press');

                        setContinue(false);
                        setProgress(progress + 1);
                        setCurrentQuestion(questions[progress]);
                        setAnswerButtonStyle(initialButtonState);
                        setCurrentAnswer(Answer.NONE);
                    }
                }}
            >
                Continue
            </Button>
        </div>
    );
}
