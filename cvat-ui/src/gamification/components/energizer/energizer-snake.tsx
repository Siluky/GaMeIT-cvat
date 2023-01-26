// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import _ from 'lodash';
import './snake-styles.scss';
import { Button } from 'antd';
import { CombinedState } from 'reducers/interfaces';
import { addLeaderboardEntry } from 'gamification/actions/energizer-actions';
import { EnergizerType, LeaderboardEntry } from 'gamification/gamif-interfaces';
import { connect } from 'react-redux';

interface EnergizerProps {
    showLeaderboard: (show: boolean) => void;
    width?: number;
    height?: number;
    username: string;
    userId: number;
    addEntry(entry: LeaderboardEntry): void;
}

interface StateToProps {
    username: string;
    userId: number
}

interface DispatchToProps {
    addEntry(entry: LeaderboardEntry): void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { username, userId } = state.gamifuserdata;
    return { username, userId };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        addEntry: (entry: LeaderboardEntry): void => dispatch(addLeaderboardEntry(entry)),
    };
}

interface State {
    speed: number;
    direction: string;
    size: number;
    position: number[][];
    apple: number[];
}

const initialState: State = {
    speed: 250,
    direction: 'right',
    size: 10,
    position: [
        [6, 0],
        [5, 0],
        [4, 0],
    ],
    apple: [0, 0],
};

const width = 300;
const height = 300;
const timeLimit = 60000;

const getSurfaceWidth = (): number => width / initialState.size;

const getSurfaceHeight = (): number => height / initialState.size;

const getSnakeDirection = (position: number[][]): string => {
    const [first, second] = position;
    if (first[0] < second[0]) return 'left';
    if (first[0] > second[0]) return 'right';
    if (first[1] < second[1]) return 'up';
    if (first[1] > second[1]) return 'down';
    return '';
};

class Snake extends React.Component<EnergizerProps, State> {
    private canvas!: HTMLCanvasElement;
    private gameLoopInterval!: ReturnType<typeof setInterval>;
    private inputRef: React.RefObject<HTMLInputElement>;
    private time!: number;
    private timerInterval!: ReturnType<typeof setInterval>;
    private startTime!: number;
    private gameOver!: boolean;

    constructor(props: EnergizerProps) {
        super(props);
        this.state = initialState;
        console.log('1');
        // this.canvasRef = React.createRef();
        // this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // const context = null;
        // console.log(`context: ${context}`);
        this.context = null;
        this.inputRef = React.createRef();
    }

    componentDidMount(): void {
        // this.context = this.canvas.getContext('2d');
        // const a: React.RefObject<HTMLInputElement> = this.refs.canvas;
        // this.context = a.getContext('2d');
        console.log('2');
        this.init();
        console.log(`context :${this.context}`);
    }

    componentWillUnmount(): void {
        clearInterval(this.gameLoopInterval);
        clearInterval(this.timerInterval);
    }

    // getContainerSize = (): any => {
    //     const { width, height } = this.props;
    //     return {
    //         width: width || window.innerWidth,
    //         height: height || window.innerHeight,
    //     };
    // };

    calcPosition = (direction: string, pos: number[]): number[] => {
        const surfaceWidth: number = getSurfaceWidth();
        const surfaceHeight: number = getSurfaceHeight();

        switch (direction) {
            case 'left':
                if (pos[0] - 1 === -1) {
                    return [surfaceWidth - 1, pos[1]];
                }
                return [pos[0] - 1, pos[1]];
            case 'up':
                if (pos[1] - 1 === -1) {
                    return [pos[0], surfaceHeight - 1];
                }
                return [pos[0], pos[1] - 1];
            case 'right':
                if (pos[0] + 1 > surfaceWidth - 1) {
                    return [0, pos[1]];
                }
                return [pos[0] + 1, pos[1]];
            case 'down':
                if (pos[1] + 1 > surfaceHeight - 1) {
                    return [pos[0], 0];
                }
                return [pos[0], pos[1] + 1];
            default:
                return pos;
        }
    };

    timer = (): void => {
        const delta = Date.now() - this.startTime;
        let time = timeLimit - delta;
        // console.log(time);

        if (!(time > 0)) this.gameOver = true;

        // if (!(time > 0)) {
        //   console.log("timeout");
        //   this.setState({
        //     ...this.state,
        //     gameOver: true,
        //   });
        //   // this.setState(state => ({...state, gameOver: true}));
        //   console.log(this.state.gameOver);
        // }

        time = Math.round(time / 1000);
        const timer = document.getElementById('timer');
        if (timer) {
            // eslint-disable-next-line no-unsanitized/property
            timer.innerHTML = String(`Time: ${time}`);
        }
    };

    init = (): void => {
        console.log('3');
        this.focusInput();
        this.setState({
            ...initialState,
            apple: this.generateApplePosition(),
        });
        this.gameOver = false;
        this.startTime = Date.now();

        this.timerInterval = setInterval(() => this.timer(), 1000);

        const { speed } = this.state;

        this.gameLoopInterval = setInterval(this.gameLoop, speed);
    };

    handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        event.preventDefault();
        const keys: any = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
        };

        const { position } = this.state;

        const inputdir = keys[event.which];
        console.log('🚀 ~ file: energizer-snake.tsx:209 ~ Snake ~ inputdir', inputdir);

        if (inputdir) {
            const { direction } = this.state;
            if (
                (direction === 'left' && inputdir === 'right') ||
                (direction === 'up' && inputdir === 'down') ||
        (direction === 'right' && inputdir === 'left') ||
        (direction === 'down' && inputdir === 'up')
            ) {
                return;
            }
            const snakeDirection = getSnakeDirection(position);
            if (
                (snakeDirection === 'left' && inputdir === 'right') ||
        (snakeDirection === 'up' && inputdir === 'down') ||
        (snakeDirection === 'right' && inputdir === 'left') ||
        (snakeDirection === 'down' && inputdir === 'up')
            ) {
                return;
            }
            console.log('🚀 ~ file: energizer-snake.tsx:231 ~ Snake ~ ...this.state', this.state);
            this.setState({ ...this.state, direction: inputdir });
            console.log('🚀 ~ file: energizer-snake.tsx:231 ~ Snake ~ ...this.state', this.state);
            // this.setState(() => ({...this.state}), direction );
        }
    };

    focusInput = (): void => {
        console.log('focusing input');
        console.log('🚀 ~ file: energizer-snake.tsx:238 ~ Snake ~ this.inputRef.current', this.inputRef.current);
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    };

    drawApple = (): void => {
        const { size, apple } = this.state;
        this.context = this.canvas.getContext('2d');

        this.context.save();
        this.context.fillStyle = '#6DC983';
        this.context.beginPath();
        const radius = size / 2;
        const x = apple[0] * size + radius;
        const y = apple[1] * size + radius;
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fill();
        this.context.restore();
    };

    drawElement = (position: number[]): void => {
        const { size } = this.state;
        this.context = this.canvas.getContext('2d');

        const x = size * position[0];
        const y = size * position[1];
        // this.context.fillRect(x, y, size, size);
        this.context.beginPath();
        this.context.roundRect(x, y, size, size, 2);
        this.context.stroke();
    };

    drawSnake = (): void => {
        const { position } = this.state;
        // console.log('🚀 ~ file: energizer-snake.tsx:234 ~ Snake ~ this.context', this.context);
        this.context = this.canvas.getContext('2d');
        // console.log('🚀 ~ file: energizer-snake.tsx:234 ~ Snake ~ this.context', this.context);
        this.context.save();
        this.context.fillStyle = '#7377CF';

        position.forEach(this.drawElement);

        this.context.restore();
    };

    drawCleanUpSnake = (last_element: number[]): void => {
        this.context = this.canvas.getContext('2d');
        this.context.save();
        this.context.fillStyle = '#000000';
        this.drawElement(last_element);
        this.context.restore();
    };

    generateApplePosition = (): number[] => {
        const surfaceWidth = getSurfaceWidth();
        const surfaceHeight = getSurfaceHeight();

        const x = Math.floor(Math.random() * surfaceWidth);
        const y = Math.floor(Math.random() * surfaceHeight);

        const { position } = this.state;

        let applePos: number[] = [x, y];
        position.forEach((element) => {
            if (_.isEqual(applePos, element)) {
                // console.log("game should be over");
                console.log('generate apple conflict');
                console.log(applePos);
                console.log(position);
                applePos = this.generateApplePosition();

                // this.setState({ ...this.state, gameOver: true });
                // console.log("game over state: " + this.state.gameOver);
            }
        });

        return applePos;
    };

    advance = (): void => {
        // console.log("begin state position: " + this.state.position);

        const { direction } = this.state;
        const position = this.state.position.slice(
            0,
            this.state.position.length - 1,
        );

        // console.log("local pos: " + position);
        const newPosition = this.calcPosition(direction, position[0]);
        // let isGameOver = this.state.gameOver;

        // console.log("new local pos: " + newPosition);

        if (_.isEqual(newPosition, this.state.apple)) {
            this.setState({
                ...this.state,
                apple: this.generateApplePosition(),
                position: [newPosition, ...this.state.position],
            });
        } else {
            position.forEach((element) => {
                if (_.isEqual(newPosition, element)) {
                    // console.log("game should be over");
                    this.gameOver = true;

                    // this.setState({ ...this.state, gameOver: true });
                    // console.log("game over state: " + this.state.gameOver);
                }
            });
            // console.log("state before :" + JSON.stringify(this.state));

            this.setState({
                ...this.state,
                position: [newPosition, ...position],
                // gameOver: isGameOver
            });

            // console.log("position after: " + JSON.stringify(this.state));
        }
    };

    gameLoop = (): void => {
        // const size = this.getContainerSize();
        // const surfaceWidth = parseInt(size.width, 10);
        // // const surfaceHeight = parseInt(size.height, 10);
        // const surfaceWidth = getSurfaceWidth();
        // const surfaceHeight = getSurfaceHeight();
        // const { size } = this.state;

        // const a = this.canvas;
        // console.log('4');
        this.context = this.canvas.getContext('2d');
        // console.log('🚀 ~ file: energizer-snake.tsx:337 ~ Snake ~ this.context', this.context);

        // eslint-disable-next-line react/destructuring-assignment
        this.context.clearRect(0, 0, width, height);
        // console.log('🚀 ~ file: energizer-snake.tsx:341 ~ Snake ~ this.context', this.context);
        // console.log(JSON.stringify(this.context));
        this.advance();
        this.drawSnake();
        // this.drawCleanUpSnake(last_element);
        this.drawApple();

        // console.log("is game over? " + this.state.gameOver);
        if (this.gameOver) {
            // console.log("game is over");
            clearInterval(this.timerInterval);
            clearInterval(this.gameLoopInterval);
        }
    };

    // const { showLeaderboard } = props;

    render(): JSX.Element {
        // const size = this.getContainerSize();
        const { position } = this.state;

        return (
            <div className='snake-container'>
                <div className='snake'>
                    <input
                        style={{
                            position: 'absolute',
                            width: 0,
                            height: 0,
                            outline: '0 !important',
                            border: 'none',
                            zIndex: -999,
                        }}
                        ref={this.inputRef}
                        type='text'
                        onKeyDown={this.handleKeyDown}
                    />
                    {this.gameOver && (
                        <div className='game-over'>
                            <div>GAME OVER</div>
                            <div>
                                <b>
                                    Score:
                                    {' '}
                                    {position.length - 3}
                                    {' '}
                                </b>
                            </div>
                            <Button onClick={this.init}>Reset</Button>
                            <Button onClick={
                                () => {
                                    const {
                                        showLeaderboard, addEntry, username, userId,
                                    } = this.props;
                                    const entry: LeaderboardEntry = {
                                        userId,
                                        username,
                                        energizer: EnergizerType.SNAKE,
                                        score: position.length - 3,
                                    };
                                    addEntry(entry);
                                    showLeaderboard(true);
                                }
                            }
                            >
                                Leaderboard
                            </Button>
                        </div>
                    )}
                    <div className='timer' id='timer'>
                        <span>
                            Time:
                            {' '}
                            {timeLimit / 1000}
                        </span>
                    </div>
                    <canvas
                        className='playingField'
                        // ref='canvas'
                        ref={(c: HTMLCanvasElement) => { this.canvas = c; }}
                        onKeyDown={this.handleKeyDown}
                        onClick={this.focusInput}
                        width={width}
                        height={height}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snake);
