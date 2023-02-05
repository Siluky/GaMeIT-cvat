// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import { connect, useDispatch } from 'react-redux';
// import { SketchOutlined } from '@ant-design/icons';
import { ShopItem, UserDataState } from 'gamification/gamif-interfaces';
import { setSelectedItem } from 'gamification/actions/shop-actions';
import { CombinedState } from 'reducers/interfaces';
import {
    AnnotationCoinNoBorderIcon, MoneyManBronze, MoneyManGold, MoneyManSilver,
} from 'icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getCVATStore } from 'cvat-store';
// import { getBadgeIcon } from 'gamification/gamif-items';

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
    // Mystery items
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

const itemIcon = (item: ShopItem): JSX.Element => {
    // if not dealing with the mystery items, just return the normal icon
    if (item.id !== 25 && item.id !== 15 && item.id !== 5) { return item.icon; }

    // Money badge extra handling
    if (item.id === 5) {
        const state = getCVATStore().getState();
        const userDataState: UserDataState = state.gamifuserdata;
        switch (userDataState.userdata_total.money_badge_tier) {
            case 0: return <MoneyManBronze />;
            case 1: return <MoneyManSilver />;
            case 2: return <MoneyManGold />;
            default: return <MoneyManGold />;
        }
    }

    // assert: we are dealing with mystery item
    if (item.bought) {
        return item.icon;
    }
    // if item is not bought, return mystery icon
    return <QuestionCircleOutlined />;
};

function ShopItemComponent(props: ShopItemProps): JSX.Element {
    const { item, selected } = props;
    const dispatch = useDispatch();
    // const shop = useSelector((state: CombinedState) => state.shop);
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
                    {itemIcon(item)}
                    {/* {item.id !== 5 ? item.icon : getBadgeIcon(12, shop.moneyBadgeTier)} */}
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
