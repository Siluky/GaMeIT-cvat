// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
// import ProgressBar from 'gamification/components/progressbar-component';
import { CombinedState } from 'reducers/interfaces';
import { connect, useSelector } from 'react-redux';
import { mapStatisticIdtoFieldName, mapStatisticIdtoIcon } from 'gamification/gamif-items';

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
    const userdata = useSelector((state: CombinedState) => state.gamifuserdata);

    return (
        <Col className='cvat-annotation-header-quick-statistics-group'>
            <Row className='cvat-annotation-header-quick-statistics'>
                {ids.map((id: number) => {
                    const session = id > 100;
                    const val = !session ? userdata.userdata_total[mapStatisticIdtoFieldName(id)] :
                        userdata.userdata_session[mapStatisticIdtoFieldName(id - 100)];
                    const relevantId = session ? id - 100 : id;
                    const stat = stats.statistics.find((statistic) => statistic.id === relevantId);
                    if (stat) {
                        return (
                            <QuickStatistic
                                key={id}
                                value={val}
                                icon={mapStatisticIdtoIcon(stat.id)}
                                tooltip={session ? stat.tooltip_session : stat.tooltip_total ?? 'Tooltip missing'}
                            />
                        );
                    }
                    return null;
                })}
            </Row>
            {/* <Row justify='center'>
                <ProgressBar />
            </Row> */}
        </Col>
    );
}
export default connect(mapStateToProps)(QuickStatisticsPanel);
