// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import { Col } from 'antd/lib/grid';
import Icon from '@ant-design/icons';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import Tooltip from 'antd/lib/tooltip';
import Moment from 'react-moment';
import 'gamification/gamif-styles.scss';

import moment from 'moment';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
    FilterIcon, FullscreenIcon, InfoIcon, BrainIcon, ImageFinishedIcon,
} from 'icons';
import {
    CombinedState, DimensionType, Workspace, PredictorState,
} from 'reducers/interfaces';
import {
    addGamifLog, getImageStatusAsync, saveImageStatusesAsync, setFinishedStatus, updateUserData,
} from 'gamification/actions/user-data-actions';
import QuickStats from './quick-statistics';

interface Props {
    workspace: Workspace;
    predictor: PredictorState;
    isTrainingActive: boolean;
    showStatistics(): void;
    switchPredictor(predictorEnabled: boolean): void;
    showFilters(): void;
    changeWorkspace(workspace: Workspace): void;

    jobInstance: any;
    imageFinished: boolean;
}

interface StateToProps {
    imageFinished: boolean;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const frameNumber = state.annotation.player.frame.number;
    const jobId = state.annotation.job.requestedId;
    // const url = window.location.href;

    const { logs } = state.gamifuserdata.imagesFinished;
    const log = logs.find((l) => l.id === jobId);
    const status = log?.statuses.find((stat) => stat.id === frameNumber);

    return {
        imageFinished: !!status?.finished,
    };
}

function RightGroup(props: Props): JSX.Element {
    const {
        showStatistics,
        changeWorkspace,
        switchPredictor,
        workspace,
        predictor,
        jobInstance,
        isTrainingActive,
        showFilters,
        imageFinished,
    } = props;
    const annotationAmount = predictor.annotationAmount || 0;
    const mediaAmount = predictor.mediaAmount || 0;
    const formattedScore = `${(predictor.projectScore * 100).toFixed(0)}%`;
    const predictorTooltip = (
        <div className='cvat-predictor-tooltip'>
            <span>Adaptive auto annotation is</span>
            {predictor.enabled ? (
                <Text type='success' strong>
                    {' active'}
                </Text>
            ) : (
                <Text type='warning' strong>
                    {' inactive'}
                </Text>
            )}
            <br />
            <span>
                Annotations amount:
                {annotationAmount}
            </span>
            <br />
            <span>
                Media amount:
                {mediaAmount}
            </span>
            <br />
            {annotationAmount > 0 ? (
                <span>
                    Model mAP is
                    {' '}
                    {formattedScore}
                    <br />
                </span>
            ) : null}
            {predictor.error ? (
                <Text type='danger'>
                    {predictor.error.toString()}
                    <br />
                </Text>
            ) : null}
            {predictor.message ? (
                <span>
                    Status:
                    {' '}
                    {predictor.message}
                    <br />
                </span>
            ) : null}
            {predictor.timeRemaining > 0 ? (
                <span>
                    Time Remaining:
                    {' '}
                    <Moment date={moment().add(-predictor.timeRemaining, 's')} format='hh:mm:ss' trim durationFromNow />
                    <br />
                </span>
            ) : null}
            {predictor.progress > 0 ? (
                <span>
                    Progress:
                    {predictor.progress.toFixed(1)}
                    {' '}
                    %
                </span>
            ) : null}
        </div>
    );

    let predictorClassName = 'cvat-annotation-header-button cvat-predictor-button';
    if (!!predictor.error || !predictor.projectScore) {
        predictorClassName += ' cvat-predictor-disabled';
    } else if (predictor.enabled) {
        if (predictor.fetching) {
            predictorClassName += ' cvat-predictor-fetching';
        }
        predictorClassName += ' cvat-predictor-inprogress';
    }

    const filters = useSelector((state: CombinedState) => state.annotation.annotations.filters);
    const frameNumber = useSelector((state: CombinedState) => state.annotation.player.frame.number);
    const jobId = useSelector((state: CombinedState) => state.annotation.job.requestedId) ?? 0;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImageStatusAsync());
    }, [jobId]);

    return (
        <Col className='cvat-annotation-header-right-group'>
            <Button
                className='gamif-debug-button'
                onClick={() => dispatch(saveImageStatusesAsync())}
            >
                Save
            </Button>
            <Button
                className='gamif-debug-button'
                onClick={() => dispatch(getImageStatusAsync())}
            >
                Get
            </Button>

            <Button
                className={`gamif-images-finished-button-wrapper ${imageFinished ? 'green' : 'grey'}`}
                style={{ height: '40px', width: '40px', margin: 'auto' }}
                onClick={() => {
                    // setImageFinished(!imageFinished);
                    dispatch(updateUserData('images_annotated',
                        (imageFinished ? -1 : 1)));
                    dispatch(setFinishedStatus(jobId, frameNumber, !imageFinished));
                    dispatch(saveImageStatusesAsync());
                    if (imageFinished) {
                        dispatch(addGamifLog('Image Finished'));
                    }
                }}
                // icon={!imageFinished ? <CheckSquareOutlined /> : <CloseSquareOutlined />}
                icon={<ImageFinishedIcon />}
            />
            <div>
                <QuickStats />
            </div>
            {isTrainingActive && (
                <Button
                    type='link'
                    className={predictorClassName}
                    onClick={() => {
                        switchPredictor(!predictor.enabled);
                    }}
                >
                    <Tooltip title={predictorTooltip}>
                        <Icon component={BrainIcon} />
                    </Tooltip>
                    {annotationAmount ? `mAP ${formattedScore}` : 'not trained'}
                </Button>
            )}
            <Button
                type='link'
                className='cvat-annotation-header-button'
                onClick={(): void => {
                    if (window.document.fullscreenEnabled) {
                        if (window.document.fullscreenElement) {
                            window.document.exitFullscreen();
                        } else {
                            window.document.documentElement.requestFullscreen();
                        }
                    }
                }}
            >
                <Icon component={FullscreenIcon} />
                Fullscreen
            </Button>
            <Button type='link' className='cvat-annotation-header-button' onClick={showStatistics}>
                <Icon component={InfoIcon} />
                Info
            </Button>
            <Button
                type='link'
                className={`cvat-annotation-header-button ${filters.length ? 'filters-armed' : ''}`}
                onClick={showFilters}
            >
                <Icon component={FilterIcon} />
                Filters
            </Button>
            <div>
                <Select
                    dropdownClassName='cvat-workspace-selector-dropdown'
                    className='cvat-workspace-selector'
                    onChange={changeWorkspace}
                    value={workspace}
                >
                    {Object.values(Workspace).map((ws) => {
                        if (jobInstance.dimension === DimensionType.DIM_3D) {
                            if (ws === Workspace.STANDARD) {
                                return null;
                            }
                            return (
                                <Select.Option disabled={ws !== Workspace.STANDARD3D} key={ws} value={ws}>
                                    {ws}
                                </Select.Option>
                            );
                        }
                        if (ws !== Workspace.STANDARD3D) {
                            return (
                                <Select.Option key={ws} value={ws}>
                                    {ws}
                                </Select.Option>
                            );
                        }
                        return null;
                    })}
                </Select>
            </div>
        </Col>
    );
}

export default connect(mapStateToProps)(RightGroup);
