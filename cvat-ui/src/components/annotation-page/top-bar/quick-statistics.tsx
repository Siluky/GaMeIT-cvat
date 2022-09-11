// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';
// import { CheckCircleOutlined, FieldTimeOutlined, TagOutlined } from '@ant-design/icons';
import {
    AndroidFilled, AndroidOutlined, CheckCircleOutlined, QuestionOutlined,
} from '@ant-design/icons';
import { CombinedState } from 'reducers/interfaces';
import { connect, useSelector } from 'react-redux';
import { mapIdtoFieldName } from 'gamification/components/statistics/statisticslist-component';
// import { ImageIcon } from 'icons';

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

export const mapStatisticIdtoIcon = (id: number): JSX.Element => {
    switch (id) {
        case 1: return <AndroidFilled />;
        case 2: return <AndroidOutlined />;
        case 3: return <QuestionOutlined />;
        default: return <CheckCircleOutlined />;
    }
};

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
                                value={userdata[mapIdtoFieldName(stat.id)]}
                                icon={mapStatisticIdtoIcon(stat.id)}
                                hoverOverText={stat.hoverOverText ? stat.hoverOverText : 'Tooltip missing'}
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
