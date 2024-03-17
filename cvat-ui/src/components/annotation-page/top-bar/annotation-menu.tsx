// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Text from 'antd/lib/typography/Text';
import InputNumber from 'antd/lib/input-number';
import Checkbox from 'antd/lib/checkbox';
import Collapse from 'antd/lib/collapse';

// eslint-disable-next-line import/no-extraneous-dependencies
import { MenuInfo } from 'rc-menu/lib/interface';

import CVATTooltip from 'components/common/cvat-tooltip';
import LoadSubmenu from 'components/actions-menu/load-submenu';
import getCore from 'cvat-core-wrapper';
import { CombinedState, JobStage } from 'reducers/interfaces';
import Button from 'antd/lib/button';
import { useSelector } from 'react-redux';

const core = getCore();

interface Props {
    taskMode: string;
    loaders: any[];
    dumpers: any[];
    loadActivity: string | null;
    jobInstance: any;
    onClickMenu(params: MenuInfo): void;
    onUploadAnnotations(format: string, file: File): void;
    stopFrame: number;
    removeAnnotations(startnumber: number, endnumber: number, delTrackKeyframesOnly:boolean): void;
    setForceExitAnnotationFlag(forceExit: boolean): void;
    saveAnnotations(jobInstance: any, afterSave?: () => void): void;
}

export enum Actions {
    LOAD_JOB_ANNO = 'load_job_anno',
    EXPORT_TASK_DATASET = 'export_task_dataset',
    REMOVE_ANNO = 'remove_anno',
    OPEN_TASK = 'open_task',
    FINISH_JOB = 'finish_job',
    RENEW_JOB = 'renew_job',
}

function AnnotationMenuComponent(props: Props & RouteComponentProps): JSX.Element {
    const udata = useSelector((state: CombinedState) => state.gamifuserdata);
    const { userId } = udata;
    const SURVEY_URL = `https://www.soscisurvey.de/cvat_eval/?act=SenrPcnqaSDDmONMFEefpjXN&r=${userId}-4`;
    const {
        loaders,
        loadActivity,
        jobInstance,
        stopFrame,
        history,
        onClickMenu,
        onUploadAnnotations,
        removeAnnotations,
        setForceExitAnnotationFlag,
        saveAnnotations,
    } = props;

    const jobStage = jobInstance.stage;
    const jobState = jobInstance.state;
    const taskID = jobInstance.taskId;
    const { JobState } = core.enums;

    function onClickMenuWrapper(params: MenuInfo): void {
        function checkUnsavedChanges(_params: MenuInfo): void {
            if (jobInstance.annotations.hasUnsavedChanges()) {
                Modal.confirm({
                    title: 'The job has unsaved annotations',
                    content: 'Would you like to save changes before continue?',
                    className: 'cvat-modal-content-save-job',
                    okButtonProps: {
                        children: 'Save',
                    },
                    cancelButtonProps: {
                        children: 'No',
                    },
                    onOk: () => {
                        saveAnnotations(jobInstance, () => onClickMenu(_params));
                    },
                    onCancel: () => {
                        // do not ask leave confirmation
                        setForceExitAnnotationFlag(true);
                        setTimeout(() => {
                            onClickMenu(_params);
                        });
                    },
                });
            } else {
                onClickMenu(_params);
            }
        }

        if (params.key === Actions.REMOVE_ANNO) {
            let removeFrom: number;
            let removeUpTo: number;
            let removeOnlyKeyframes = false;
            const { Panel } = Collapse;
            Modal.confirm({
                title: 'Remove Annotations',
                content: (
                    <div>
                        <Text>You are going to remove the annotations from the client. </Text>
                        <Text>It will stay on the server till you save the job. Continue?</Text>
                        <br />
                        <br />
                        <Collapse bordered={false}>
                            <Panel header={<Text>Select Range</Text>} key={1}>
                                <Text>From: </Text>
                                <InputNumber
                                    min={0}
                                    max={stopFrame}
                                    onChange={(value) => {
                                        removeFrom = value;
                                    }}
                                />
                                <Text>  To: </Text>
                                <InputNumber
                                    min={0}
                                    max={stopFrame}
                                    onChange={(value) => { removeUpTo = value; }}
                                />
                                <CVATTooltip title='Applicable only for annotations in range'>
                                    <br />
                                    <br />
                                    <Checkbox
                                        onChange={(check) => {
                                            removeOnlyKeyframes = check.target.checked;
                                        }}
                                    >
                                        Delete only keyframes for tracks
                                    </Checkbox>
                                </CVATTooltip>
                            </Panel>
                        </Collapse>
                    </div>
                ),
                className: 'cvat-modal-confirm-remove-annotation',
                onOk: () => {
                    removeAnnotations(removeFrom, removeUpTo, removeOnlyKeyframes);
                },
                okButtonProps: {
                    type: 'primary',
                    danger: true,
                },
                okText: 'Delete',
            });
        } else if (params.key.startsWith('state:')) {
            Modal.confirm({
                title: 'Do you want to change current job state?',
                content: `Job state will be switched to "${params.key.split(':')[1]}". Continue?`,
                okText: 'Continue',
                cancelText: 'Cancel',
                className: 'cvat-modal-content-change-job-state',
                onOk: () => {
                    checkUnsavedChanges(params);
                },
            });
        } else if (params.key === Actions.FINISH_JOB) {
            Modal.confirm({
                title: 'The job stage is going to be switched',
                content: (
                    <div>
                        <p>Stage will be changed to &quot;acceptance&quot;. Would you like to continue?</p>
                        <p><b>Please remember to fill out the survey if this is your last job for this day.</b></p>
                        <div className='gamif-survey-button-notif'>
                            <Button
                                className='gamif-energizer-popup-start-energizer-button'
                                style={{ marginBottom: '0' }}
                                type='link'
                                href={SURVEY_URL}
                                onClick={(event: React.MouseEvent): void => {
                                    event.preventDefault();
                                    // false alarm
                                    // eslint-disable-next-line security/detect-non-literal-fs-filename
                                    window.open(SURVEY_URL, '_blank');
                                }}
                            >
                                Go to Survey
                            </Button>
                        </div>
                    </div>
                ),
                okText: 'Continue',
                cancelText: 'Cancel',
                className: 'cvat-modal-content-finish-job',
                onOk: () => {
                    checkUnsavedChanges(params);
                },
            });
        } else if (params.key === Actions.RENEW_JOB) {
            Modal.confirm({
                title: 'Do you want to renew the job?',
                content: 'Stage will be set to "in progress", state will be set to "annotation". Would you like to continue?',
                okText: 'Continue',
                cancelText: 'Cancel',
                className: 'cvat-modal-content-renew-job',
                onOk: () => {
                    onClickMenu(params);
                },
            });
        } else {
            onClickMenu(params);
        }
    }

    const computeClassName = (menuItemState: string): string => {
        if (menuItemState === jobState) return 'cvat-submenu-current-job-state-item';
        return '';
    };

    return (
        <Menu onClick={(params: MenuInfo) => onClickMenuWrapper(params)} className='cvat-annotation-menu' selectable={false}>
            {LoadSubmenu({
                loaders,
                loadActivity,
                onFileUpload: (format: string, file: File): void => {
                    if (file) {
                        Modal.confirm({
                            title: 'Current annotation will be lost',
                            content: 'You are going to upload new annotations to this job. Continue?',
                            className: 'cvat-modal-content-load-job-annotation',
                            onOk: () => {
                                onUploadAnnotations(format, file);
                            },
                            okButtonProps: {
                                type: 'primary',
                                danger: true,
                            },
                            okText: 'Update',
                        });
                    }
                },
                menuKey: Actions.LOAD_JOB_ANNO,
                taskDimension: jobInstance.dimension,
            })}
            <Menu.Item key={Actions.EXPORT_TASK_DATASET}>Export task dataset</Menu.Item>
            <Menu.Item key={Actions.REMOVE_ANNO}>Remove annotations</Menu.Item>
            <Menu.Item key={Actions.OPEN_TASK}>
                <a
                    href={`/tasks/${taskID}`}
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        history.push(`/tasks/${taskID}`);
                        return false;
                    }}
                >
                    Open the task
                </a>
            </Menu.Item>
            <Menu.SubMenu popupClassName='cvat-annotation-menu-job-state-submenu' key='job-state-submenu' title='Change job state'>
                <Menu.Item key={`state:${JobState.NEW}`}>
                    <Text className={computeClassName(JobState.NEW)}>{JobState.NEW}</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.IN_PROGRESS}`}>
                    <Text className={computeClassName(JobState.IN_PROGRESS)}>{JobState.IN_PROGRESS}</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.REJECTED}`}>
                    <Text className={computeClassName(JobState.REJECTED)}>{JobState.REJECTED}</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.COMPLETED}`}>
                    <Text className={computeClassName(JobState.COMPLETED)}>{JobState.COMPLETED}</Text>
                </Menu.Item>
            </Menu.SubMenu>
            {[JobStage.ANNOTATION, JobStage.REVIEW].includes(jobStage) ?
                <Menu.Item key={Actions.FINISH_JOB}>Finish the job</Menu.Item> : null}
            {jobStage === JobStage.ACCEPTANCE ?
                <Menu.Item key={Actions.RENEW_JOB}>Renew the job</Menu.Item> : null}
        </Menu>
    );
}

export default withRouter(AnnotationMenuComponent);
