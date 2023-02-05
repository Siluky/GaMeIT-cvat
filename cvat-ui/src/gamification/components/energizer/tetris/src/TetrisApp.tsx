// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import './styles.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from 'reducers/interfaces';
import { EnergizerType, LeaderboardEntry } from 'gamification/gamif-interfaces';
import { addLeaderboardEntry } from 'gamification/actions/energizer-actions';
import { addGamifLog } from 'gamification/actions/user-data-actions';
import { updateEnergizerBadge } from 'gamification/actions/badge-actions';
import Tetris from './components/Tetris';

const Container = styled.div`
  margin: 1px auto 0;
  width: 100%;
  max-width: 800px;
`;

const Score = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 18px;
  color: #888;
`;

const LeftHalf = styled.div`
  display: inline-block;
  width: 88px;
`;

const TopMiddle = styled.div`
  display: inline-block;
  width: 200px;
  text-align: Center;
`;

const RightHalf = styled(LeftHalf)`
  text-align: right;
`;

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const LeftColumn = styled(Column)`
  width: 88px;
`;

const RightColumn = styled(LeftColumn)`
  padding-left: 15px;
`;

const MiddleColumn = styled(Column)`
  width: 200px;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 7px 18px 3px #d2d2d2;
`;

const Alert = styled.h2`
  color: #666;
  margin: 0;
`;

const Button = styled.button`
  border: 1px solid #666;
  background: none;
  margin-top: 12px;
  border-radius: 4px;
`;

const Digit = styled.span`
  font-family: monospace;
  padding: 1px;
  margin: 1px;
  font-size: 24px;
`;

type DigitsProps = {
    children: number;
    count?: number;
};
const Digits = ({ children, count = 4 }: DigitsProps): JSX.Element => {
    let str = children.toString();

    while (str.length < count) {
        str = `${0}${str}`;
    }

    return (
        <>
            {str.split('').map((digit, index) => (
                <Digit key={index}>{digit}</Digit>
            ))}
        </>
    );
};

interface TetrisProps {
    showLeaderboard(show: boolean): void;
}

// const TimeDigits = styled.span`
//   font-family: monospace;
//   padding: 1px;
//   margin: 1px;
//   font-size: 24px;
// `;

const TetrisApp = (props: TetrisProps): JSX.Element => {
    const userdata = useSelector((state: CombinedState) => state.gamifuserdata);
    const dispatch = useDispatch();

    return (
        <Container>
            <Tetris>
                {({
                    Gameboard,
                    HeldPiece,
                    PieceQueue,
                    points,
                    linesCleared,
                    state,
                    controller,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    Timer,
                    time,
                }) => (
                    <div className='tetris-container'>
                        <div style={{ opacity: state === 'PLAYING' ? 1 : 0.5 }}>
                            <div>
                                <Score>
                                    <LeftHalf>
                                        <p>
                                            points
                                            <br />
                                            <Digits>{points}</Digits>
                                        </p>
                                    </LeftHalf>
                                    <TopMiddle>
                                        <p>
                                            time
                                            <br />
                                            <Digits>{Math.round(time / 1000)}</Digits>
                                        </p>
                                        {/* <Timer /> */}
                                    </TopMiddle>
                                    <RightHalf>
                                        <p>
                                            lines
                                            <br />
                                            <Digits>{linesCleared}</Digits>
                                        </p>
                                    </RightHalf>
                                </Score>
                            </div>
                            <div>
                                <LeftColumn>
                                    <HeldPiece />
                                </LeftColumn>

                                <MiddleColumn>
                                    <Gameboard />
                                </MiddleColumn>

                                <RightColumn>
                                    <PieceQueue />
                                </RightColumn>
                            </div>

                            {/* <Controller controller={controller} /> */}
                        </div>
                        {state === 'PAUSED' && (
                            <Popup>
                                <Alert>Paused</Alert>
                                <Button onClick={controller.resume}>Resume</Button>
                            </Popup>
                        )}

                        {state === 'LOST' && (
                            <Popup>
                                <Alert>Game Over</Alert>
                                <Button onClick={controller.restart}>Restart</Button>
                                <Button onClick={() => {
                                    const { showLeaderboard } = props;
                                    const entry: LeaderboardEntry = {
                                        userId: userdata.userId,
                                        username: userdata.username,
                                        energizer: EnergizerType.TETRIS,
                                        score: points,
                                    };
                                    dispatch(addLeaderboardEntry(entry));
                                    if (points >= 20) {
                                        dispatch(updateEnergizerBadge(EnergizerType.TETRIS));
                                    }
                                    showLeaderboard(true);
                                    dispatch(addGamifLog(userdata.userId, 'Tetris ended'));
                                }}
                                >
                                    Leaderboard
                                </Button>
                            </Popup>
                        )}
                    </div>
                )}
            </Tetris>
        </Container>
    );
};

export default TetrisApp;
