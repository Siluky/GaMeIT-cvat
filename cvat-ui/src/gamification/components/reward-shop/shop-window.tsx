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
import { upgradeBadgeTier } from 'gamification/actions/badge-actions';
import { incrementEnergy } from 'gamification/actions/energizer-actions';
import { addChallenge } from 'gamification/actions/challenge-actions';
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

    const mysteryGift = (): void => {
        const random = Math.random() * 100;
        console.log('🚀 ~ file: shop-window.tsx ~ line 50 ~ mysteryGift ~ random', random);

        if (random > 95) {
            // buy secret item
        } else if (random > 90) {
            // buy secret item
        } else if (random > 50) {
            dispatch(incrementEnergy(10));
        } else if (random > 35) {
            dispatch(addChallenge());
        } else if (random > 20) {
            // add streak saver
        } else {
            // get nothing
        }
    };

    const useItem = (id: number): void => {
        dispatch(setProfileBackgroundEffects(0));

        switch (id) {
            case 1: dispatch(incrementEnergy(10)); break;
            case 2: mysteryGift(); break;
            case 3: dispatch(addChallenge()); break;
            case 4: // TODO: Streak saver; break;
            case 5: dispatch(upgradeBadgeTier(12)); break; // Money Badge
            case 6: {
                dispatch(setProfileBackground('#e6e6e6'));
                dispatch(setAdditionalClassNames(''));
                dispatch(setColor('#1e3d59'));
                break;
            }
            case 7: dispatch(setProfileBackground('#bbf1c4')); break;
            case 8: dispatch(setProfileBackground('#aec6cf')); break;
            case 9: dispatch(setProfileBackground('#ff6961')); break;
            case 10:
                dispatch(setProfileBackground(''));
                dispatch(setAdditionalClassNames('gamif-profile-tri-color-background-1'));
                break;
            case 11:
                dispatch(setProfileBackground(''));
                dispatch(setAdditionalClassNames('gamif-profile-tri-color-background-2'));
                break;
            case 12:
                dispatch(setProfileBackground(''));
                dispatch(setAdditionalClassNames('gamif-profile-tri-color-background-3'));
                break;
            case 13: {
                dispatch(setAdditionalClassNames('gamif-profile-blue-blackground'));
                break;
            }
            case 14: {
                dispatch(setProfileBackground(''));
                dispatch(setAdditionalClassNames('gamif-quick-profile-shooting-stars-background'));
                dispatch(setProfileBackgroundEffects(1));
                break;
            }
            case 15: // TODO: Hidden profile background
            case 16: dispatch(setProfileBorder('')); break;
            case 17: dispatch(setProfileBorder('4px solid #bbf1c4')); break;
            case 18: dispatch(setProfileBorder('4px solid #aec6cf')); break;
            case 19: dispatch(setProfileBorder('4px solid #ff6961')); break;
            case 20:
                dispatch(setProfileBorder(''));
                dispatch(setAdditionalClassNames('gamif-profile-anim-border-blue'));
                break;
            case 21:
                dispatch(setProfileBorder(''));
                dispatch(setAdditionalClassNames('gamif-profile-anim-border-red'));
                break;
            case 22:
                dispatch(setAdditionalClassNames('gamif-profile-rainbow-effect'));
                dispatch(setProfileBorder('#ff6961'));
                break;
            case 23: {
                dispatch(setAdditionalClassNames('gamif-profile-christmas-box'));
                break;
            }
            case 24: {
                dispatch(setAdditionalClassNames('gamif-profile-rainbow-box'));
                break;
            }
            case 25: /* TODO: hidden */ break;
            default: break;
        }
    };

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
                    onClick={() => useItem(selectedItemId)}
                >
                    Use
                </Button>
                <div className='gamif-shop-balance-display'>
                    <h3>
                        <span>Current Balance: </span>
                        &nbsp;
                        {currentBalance}
                        <SketchOutlined />
                    </h3>
                </div>
            </div>
            <div className='gamif-shop-window-items-wrapper'>
                <Row className='gamif-shop-window-items-row'>
                    {items.map((_item, index) => (_item.bought || _item.visible) && (
                        <Col flex={1}>
                            <ShopItemComponent key={index} item={_item} selected={selectedItemId === _item.id} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ShopWindow);
