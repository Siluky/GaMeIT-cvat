// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';
import { CombinedState } from 'reducers/interfaces';
import { connect, useSelector } from 'react-redux';
import { mapStatisticIdtoFieldName } from 'gamification/gamif-items';
import { mapStatisticIdtoIcon } from 'gamification/gamif-setup';

interface StateToProps {
    ids: number[];
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { statistics } = state;
    return {
        ids: statistics.selectedStatistics,
    };
}

interface QuickStatisticGroupProps {
    ids: number[];
}

export function QuickStatisticsPanel(props: QuickStatisticGroupProps): JSX.Element {
    // const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;
    const { ids } = props;
    const stats = useSelector((state: CombinedState) => state.statistics);
    const userdatastate = useSelector((state: CombinedState) => state.gamifuserdata);
    const userdata = userdatastate.userdata_total;

    return (
        <Col className='cvat-annotation-header-quick-statistics-group'>
            <Row className='cvat-annotation-header-quick-statistics'>
                {ids.map((id: number) => {
                    const stat = stats.statistics.find((statistic) => statistic.id === id);
                    if (stat) {
                        return (
                            <QuickStatistic
                                key={id}
                                value={userdata[mapStatisticIdtoFieldName(stat.id)]}
                                icon={mapStatisticIdtoIcon(stat.id)}
                                hoverOverText={stat.tooltip_total ? stat.tooltip_total : 'Tooltip missing'}
                            />
                        );
                    }
                    return null;
                })}
            </Row>
            <Row justify='center'>
                <ProgressBar />
            </Row>
        </Col>
    );
}
export default connect(mapStateToProps)(QuickStatisticsPanel);
