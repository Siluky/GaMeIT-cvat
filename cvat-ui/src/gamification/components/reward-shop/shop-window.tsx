// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React from 'react';
import 'gamification/gamif-styles.scss';
import 'gamification/gamif-profile-styles.scss';
import { Row, Col, Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { ShopItem } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { purchaseItem } from 'gamification/actions/shop-actions';
import {
    setAdditionalClassNames,
    setColor, setProfileBackground, setProfileBackgroundEffects, setProfileBorder,
} from 'gamification/actions/social-actions';
// import { upgradeBadgeTier } from 'gamification/actions/badge-actions';
// import { incrementEnergy } from 'gamification/actions/energizer-actions';
// import { addChallenge } from 'gamification/actions/challenge-actions';
// import { SketchOutlined } from '@ant-design/icons';
import { AnnotationCoinNoBorderIcon } from 'icons';
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

    const useItem = (id: number): void => {
        dispatch(setProfileBackgroundEffects(0));
        dispatch(setProfileBackground(0));

        switch (id) {
            // case 1: dispatch(incrementEnergy(10)); break;
            // case 2: mysteryGift(); break;
            // case 3: dispatch(addChallenge()); break;
            // case 4: // TODO: Streak saver; break;
            // case 5: dispatch(upgradeBadgeTier(12)); break; // Money Badge
            case 6: {
                dispatch(setProfileBackground(1));
                dispatch(setAdditionalClassNames(0));
                dispatch(setColor('#1e3d59'));
                break;
            }
            case 7: dispatch(setProfileBackground(2)); break;
            case 8: dispatch(setProfileBackground(3)); break;
            case 9: dispatch(setProfileBackground(4)); break;
            case 10: {
                dispatch(setProfileBackground(0));
                dispatch(setAdditionalClassNames(1));
                break;
            }
            case 11:
                dispatch(setProfileBackground(0));
                dispatch(setAdditionalClassNames(2));
                break;
            case 12:
                dispatch(setProfileBackground(0));
                dispatch(setAdditionalClassNames(3));
                break;
            case 13:
                dispatch(setProfileBackground(0));
                dispatch(setAdditionalClassNames(4));
                break;
            case 14: {
                dispatch(setProfileBackground(0));
                dispatch(setAdditionalClassNames(5));
                dispatch(setProfileBackgroundEffects(1));
                break;
            }
            case 15: // TODO: Hidden profile background
            case 16: dispatch(setProfileBorder(0)); break;
            case 17: dispatch(setProfileBorder(1)); break;
            case 18: dispatch(setProfileBorder(2)); break;
            case 19: dispatch(setProfileBorder(3)); break;
            case 20:
                dispatch(setProfileBorder(0));
                dispatch(setAdditionalClassNames(6));
                break;
            case 21:
                dispatch(setProfileBorder(0));
                dispatch(setAdditionalClassNames(7));
                break;
            case 22: {
                dispatch(setAdditionalClassNames(8));
                break;
            }
            case 23: {
                dispatch(setAdditionalClassNames(9));
                break;
            }
            case 24:
                dispatch(setAdditionalClassNames(10));
                break;
            case 25: /* TODO: hidden */ break;
            default: break;
        }
    };

    return (
        <div className='gamif-shop-window'>
            <div className='gamif-shop-window-header'>
                <Button
                    className='gamif-shop-window-button'
                    onClick={() => {
                        dispatch(purchaseItem(selectedItemId));
                    }}
                >
                    Buy
                </Button>
                <Button
                    className='gamif-shop-window-button'
                    onClick={() => useItem(selectedItemId)}
                >
                    Use
                </Button>
                <div className='gamif-shop-balance-display'>
                    <h3>
                        <span>Current Balance: </span>
                        &nbsp;
                        {currentBalance}
                        {/* <SketchOutlined /> */}
                        <Button
                            icon={<AnnotationCoinNoBorderIcon />}
                            type='text'
                        />
                    </h3>
                </div>
            </div>
            <div className='gamif-shop-window-items-wrapper'>
                <Row className='gamif-shop-window-items-row'>
                    {items.map((_item, index) => (_item.bought || _item.visible) && (
                        <Col flex={1} key={index}>
                            <ShopItemComponent key={index} item={_item} selected={selectedItemId === _item.id} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ShopWindow);
