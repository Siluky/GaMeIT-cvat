// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Button } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectStatistic } from 'gamification/actions/statistics-actions';
import CvatTooltip from 'components/common/cvat-tooltip';
import { Statistic } from 'gamification/gamif-interfaces';
import { updateUserData } from 'gamification/actions/user-data-actions';
import { mapStatisticIdtoFieldName, mapStatisticIdtoIcon } from 'gamification/gamif-items';
import { CombinedState } from 'reducers/interfaces';

interface Props {
    // id: number;
    statistic: Statistic;
    inc: boolean;
    allTime: boolean;
}

interface StateToProps {
    statistic: Statistic;
}

function mapStateToProps(state: CombinedState, ownProps: Props): StateToProps {
    const uData = state.gamifuserdata;

    const { statistic, allTime } = ownProps;
    const val = (allTime ? uData.userdata_total[mapStatisticIdtoFieldName(statistic.id)] :
        uData.userdata_session[mapStatisticIdtoFieldName(statistic.id)]) as number;

    return {
        statistic: {
            ...statistic,
            value: val,
        },
    };
}

const formatValue = (stat: Statistic): string => {
    if (stat.id === 5 || stat.id === 3) {
        if (stat.value > 3600) {
            const seconds = Math.floor((Math.floor(stat.value % 3600)) / 60);
            const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${Math.floor((stat.value / 3600))}:${secondsString} hrs`;
            // return `${Math.floor(stat.value / 3600)}:${stat.value % 60} min`;
        }

        if (stat.value > 60) {
            const seconds = Math.floor(stat.value % 60);
            const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${Math.floor((stat.value / 60))}:${secondsString} min`;
            // return `${Math.floor(stat.value / 60)}:${stat.value % 60} min`;
        }
    }

    return `${stat.value} ${stat.unit}`;
};

export function StatisticComponent(props: Props): JSX.Element {
    const {
        statistic, inc, allTime,
    } = props;
    const dispatch = useDispatch();
    const relevantId = allTime ? statistic.id : statistic.id + 100;
    const { selecting, selectedStatistics } = useSelector((state: CombinedState) => state.statistics);

    return (
        <CvatTooltip
            overlay={allTime ? statistic.tooltip_total : statistic.tooltip_session}
        >
            <Button
                className={
                    `
                    statistic-button
                    ${(selecting && selectedStatistics.find((s) => s === relevantId)) ? 'selected' : ''}
                    `
                }
                type='default'
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(selectStatistic(relevantId));
                    if (inc) {
                        dispatch(updateUserData(mapStatisticIdtoFieldName(statistic.id), 1));
                    }
                }}
            >
                <div className='statistic-button-left'>
                    {mapStatisticIdtoIcon(statistic.id)}
                </div>
                <div className='statistic-button-right'>
                    {/* {statistic.value} */}
                    {formatValue(statistic)}
                </div>
            </Button>
        </CvatTooltip>
    );
}

export default connect(mapStateToProps)(StatisticComponent);
