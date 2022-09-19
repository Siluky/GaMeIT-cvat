// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { connect, useDispatch } from 'react-redux';
import { SketchOutlined } from '@ant-design/icons';
import { ShopItem } from 'gamification/gamif-interfaces';
import { setSelectedItem } from 'gamification/actions/shop-actions';
import { CombinedState } from 'reducers/interfaces';

interface ShopItemProps {
    item: ShopItem;
    selectedId: number;
    selected: boolean;
}

interface StateToProps {
    selectedId: number;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { shop } = state;
    return { selectedId: shop.selectedItemId };
}

function ShopItemComponent(props: ShopItemProps): JSX.Element {
    const { item, selected } = props;
    const dispatch = useDispatch();
    const cardStyle = selected ? 'gamif-shop-item-card-selected' : 'gamif-shop-item-card';

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className={cardStyle}
            role='button'
            onClick={() => dispatch(setSelectedItem(item.id))}
            tabIndex={item.id}
        >
            <div className='gamif-shop-item-card-top'>
                <div className='gamif-shop-item-icon'>
                    {item.icon}
                    {/* TODO: Add proper icons based on path */}
                </div>
                <div className='gamif-shop-item-title'>{item.title}</div>
            </div>
            <div className='gamif-shop-item-footer'>
                {item.bought ? 'PURCHASED' : (
                    <>
                        {item.price}
                        <SketchOutlined />
                    </>
                )}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ShopItemComponent);
