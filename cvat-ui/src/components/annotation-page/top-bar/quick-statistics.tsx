// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import QuickStatistic from 'gamification/components/statistics/quick-statistics-component';
import ProgressBar from 'gamification/components/progressbar-component';
// import { CheckCircleOutlined, FieldTimeOutlined, TagOutlined } from '@ant-design/icons';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CombinedState } from 'reducers/interfaces';
import { connect, useSelector } from 'react-redux';
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

export function QuickStatisticsPanel(props: QuickStatisticGroupProps): JSX.Element {
    // const iconSmall = <QuestionOutlined style={{ fontSize: '25px' }} />;
    const { ids } = props;
    const stats = useSelector((state: CombinedState) => state.statistics);

    return (
        <Col className='cvat-annotation-header-quick-statistics-group'>
            <Row className='cvat-annotation-header-quick-statistics'>
                {ids.map((id: number) => {
                    const x = stats.statistics.find((statistic) => statistic.id === id);
                    if (x) { return <QuickStatistic id={x.id} value={x.value} icon={<CheckCircleOutlined />} />; }
                    return null;
                })}
            </Row>
            <Row justify='center'>
                <ProgressBar />
            </Row>
        </Col>
    );
}
// TODO: include React.memo where appropriate
export default connect(mapStateToProps)(QuickStatisticsPanel);
