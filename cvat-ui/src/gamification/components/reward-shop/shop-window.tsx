// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'gamification/gamif-styles.scss';
import 'gamification/gamif-profile-styles.scss';
import {
    Row, Col, Button,
} from 'antd';
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
    overlayMessage: string;
}

interface StateToProps {
    items: ShopItem[];
    currentBalance: number;
    selectedItemId: number;
    overlayMessage: string;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const { shop } = state;

    return {
        items: shop.availableItems,
        currentBalance: shop.currentBalance,
        selectedItemId: shop.selectedItemId,
        overlayMessage: shop.overlayMessage,
    };
}

export function ShopWindow(props: ShopWindowProps): JSX.Element {
    const {
        items, currentBalance, selectedItemId, overlayMessage,
    } = props;
    const dispatch = useDispatch();
    const [overlayVisible, toggleOverlay] = useState(false);

    // const [modalShown, toggleModal] = useState(false);

    const useItem = (id: number): void => {
        dispatch(setProfileBackgroundEffects(0));
        dispatch(setProfileBackground(0));

        // Check if item is bought
        const relevantItem = items.find((item) => item.id === id) ?? items[5];
        if (!relevantItem.bought) return;

        switch (id) {
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

    // show Overlay every time the message changes (i.e., when an item that needs a message gets bought)
    useEffect(() => {
        toggleOverlay(true);
    }, [overlayMessage]);

    useEffect(() => {
        toggleOverlay(false);
    }, []);

    const Popup = styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 12px 24px;
        border-radius: 4px;
        text-align: center;
        box-shadow: 2px 7px 18px 3px #d2d2d2;
        color: black,
        z-index: 3,
        `;

    return (
        <>
            <div className='gamif-shop-window'>
                {overlayVisible ?
                    (
                        // <div className='gamif-shop-overlay'>
                        <Popup>
                            <h2>{overlayMessage}</h2>
                            <Button onClick={() => { toggleOverlay(false); }}> Close </Button>
                        </Popup>
                        /* </div> */
                    ) : null}
                <div className='gamif-shop-window-header'>
                    <Button
                        className='gamif-shop-window-button'
                        onClick={() => {
                            dispatch(purchaseItem(selectedItemId));
                            // toggleModal(true);
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
                    <Button
                        className='gamif-debug-button'
                        onClick={() => toggleOverlay(!overlayVisible)}
                    >
                        Overlay
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
            {/* <Modal visible={modalShown}>
                You got Item XY!
                <Button onClick={() => toggleModal(false)}> Exit</Button>
            </Modal> */}
        </>
    );
}

export default connect(mapStateToProps)(ShopWindow);
