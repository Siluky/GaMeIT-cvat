// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { useDispatch } from 'react-redux';
import { AndroidOutlined } from '@ant-design/icons';
import { ShopItem } from 'gamification/gamif-interfaces';
import { AnnotationCoinIcon } from 'icons';
import { setSelectedItem } from 'gamification/actions/shop-actions';

interface ShopItemProps {
    item: ShopItem;
}

export function ShopItemComponent(props: ShopItemProps): JSX.Element {
    const { item } = props;
    const dispatch = useDispatch();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className='gamif-shop-item-card'
            role='button'
            onClick={() => dispatch(setSelectedItem(item.id))}
            tabIndex={item.id}
        >
            <div className='gamif-shop-item-card-top'>
                <div className='gamif-shop-item-icon'>
                    <AndroidOutlined />
                </div>
                <div className='gamif-shop-item-title'>{item.title}</div>
            </div>
            <div className='gamif-shop-item-footer'>
                {item.bought ? 'PURCHASED' : (
                    <>
                        {item.price}
                        <AnnotationCoinIcon />
                    </>
                )}
            </div>
        </div>
    );
}
