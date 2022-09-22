// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { Row, Col, Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { ShopItem } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { purchaseItem, useItem } from 'gamification/actions/shop-actions';
import { SketchOutlined } from '@ant-design/icons';
import ShopItemComponent from './shop-item';

interface ShopWindowProps {
    items: ShopItem[];
    currentBalance: number;
    selectedItemId: number;
}

interface StateToProps {
    items: ShopItem[];
    currentBalance: number;
    selectedItemId: number;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { shop } = state;

    return {
        items: shop.availableItems,
        currentBalance: shop.currentBalance,
        selectedItemId: shop.selectedItemId,
    };
}

export function ShopWindow(props: ShopWindowProps): JSX.Element {
    const { items, currentBalance, selectedItemId } = props;
    const dispatch = useDispatch();

    return (
        <div className='gamif-shop-window'>
            <div className='gamif-shop-window-header'>
                <Button
                    className='gamif-shop-window-button'
                    onClick={() => { dispatch(purchaseItem(selectedItemId)); }}
                >
                    Buy
                </Button>
                <Button
                    className='gamif-shop-window-button'
                    onClick={() => dispatch(useItem(selectedItemId))}
                >
                    Use
                </Button>
                <div className='gamif-shop-balance-display'>
                    <h3>
                        <span>Current Balance: </span>
                        {currentBalance}
                        <SketchOutlined />
                    </h3>
                </div>
            </div>
            <div className='gamif-shop-window-items-wrapper'>
                <Row className='gamif-shop-window-items-row'>
                    {items.map((_item, index) => (_item.bought || _item.visible) && (
                        <Col span={6}>
                            <ShopItemComponent key={index} item={_item} selected={selectedItemId === _item.id} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ShopWindow);
