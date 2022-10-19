// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { connect, useDispatch } from 'react-redux';
// import { SketchOutlined } from '@ant-design/icons';
import { ShopItem } from 'gamification/gamif-interfaces';
import { setSelectedItem } from 'gamification/actions/shop-actions';
import { CombinedState } from 'reducers/interfaces';
import { AnnotationCoinNoBorderIcon } from 'icons';

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

const itemPrice = (item: ShopItem): JSX.Element => {
    if (item.bought) { return <>PURCHASED</>; }
    if (item.id === 15 || item.id === 25) { return <>???</>; }
    return (
        <>
            {item.price}
            <div style={{ minWidth: '25px', display: 'flex' }}>
                {/* <SketchOutlined /> */}
                <AnnotationCoinNoBorderIcon />
            </div>
        </>
    );
};

function ShopItemComponent(props: ShopItemProps): JSX.Element {
    const { item, selected } = props;
    const dispatch = useDispatch();
    const cardStyle = selected ? 'gamif-shop-item-card-selected' : '';

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className={`gamif-shop-item-card ${cardStyle}`}
            role='button'
            onClick={() => dispatch(setSelectedItem(item.id))}
            tabIndex={item.id}
        >
            <div className='gamif-shop-item-card-top'>
                <div className='gamif-shop-item-icon'>
                    {item.icon}
                </div>
                <div className='gamif-shop-item-title'>{item.title}</div>
            </div>
            <div className='gamif-shop-item-footer'>
                {itemPrice(item)}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ShopItemComponent);
