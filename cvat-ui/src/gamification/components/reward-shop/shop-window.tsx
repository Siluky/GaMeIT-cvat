// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT
import React, { useEffect, useState } from 'react';
import 'gamification/gamif-styles.scss';
import 'gamification/gamif-profile-styles.scss';
import {
    Row, Col, Button,
} from 'antd';
import { connect, useDispatch } from 'react-redux';
import CvatTooltip from 'components/common/cvat-tooltip';
import { ShopItem } from 'gamification/gamif-interfaces';
import { CombinedState } from 'reducers/interfaces';
import { purchaseItem, setShopOverlayMessage } from 'gamification/actions/shop-actions';
import {
    setAdditionalClassNames,
    setColor, setProfileBackground, setProfileBackgroundEffects, setProfileBorder,
} from 'gamification/actions/social-actions';
// import { upgradeBadgeTier } from 'gamification/actions/badge-actions';
// import { incrementEnergy } from 'gamification/actions/energizer-actions';
// import { addChallenge } from 'gamification/actions/challenge-actions';
// import { SketchOutlined } from '@ant-design/icons';
import { Popup } from 'gamification/gamifconsts';
import { addGamifLog } from 'gamification/actions/user-data-actions';
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
        // IF item is not bought, return.
        const relevantItem = items.find((item) => item.id === id) ?? items[5];
        if (!relevantItem.bought) return;

        /*
        Options:
        setAdditionalClassNames(): For complex background effects
        setProfileBackground(): Sets background
        setProfileBorder(): Sets border
        setProfileBackgroundEffects(): For complex background effects
        */

        switch (id) {
            case 6: {
                dispatch(setProfileBackground(1));
                dispatch(setProfileBackgroundEffects(0));
                dispatch(setProfileBorder(0));
                dispatch(setAdditionalClassNames(0));
                dispatch(setColor('#1e3d59'));
                break;
            }
            case 7:
                dispatch(setProfileBackgroundEffects(0));
                dispatch(setProfileBackground(2));

                break;
            case 8:
                dispatch(setProfileBackgroundEffects(0));
                dispatch(setProfileBackground(3));

                break;
            case 9:
                dispatch(setProfileBackgroundEffects(0));
                dispatch(setProfileBackground(4));

                break;
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
                dispatch(setProfileBackgroundEffects(1));
                dispatch(setAdditionalClassNames(5));
                break;
            }
            case 15: {
                dispatch(setProfileBackground(5));
                dispatch(setProfileBackgroundEffects(2));

                break;
            }
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
            case 25: {
                dispatch(setProfileBorder(0));
                dispatch(setAdditionalClassNames(11));
                break;
            }
            default: break;
        }
    };

    // show Overlay every time the message changes (i.e., when an item that needs a message gets bought)
    useEffect(() => {
        if (overlayMessage !== '') { toggleOverlay(true); }
    }, [overlayMessage]);

    useEffect(() => {
        toggleOverlay(false);
    }, []);

    return (
        <>
            <div className='gamif-shop-window'>
                {overlayVisible ?
                    (
                        // <div className='gamif-shop-overlay'>
                        <Popup>
                            <h2 style={{ color: 'black' }}>{overlayMessage}</h2>
                            <Button onClick={() => {
                                dispatch(setShopOverlayMessage(''));
                                toggleOverlay(false);
                            }}
                            >
                                Close
                            </Button>
                        </Popup>
                        /* </div> */
                    ) : null}
                <div className='gamif-shop-window-header'>
                    Reward Shop
                </div>
                <div className='gamif-shop-window-buttons'>
                    <Button
                        className='gamif-shop-window-button'
                        disabled={overlayVisible}
                        onClick={() => {
                            dispatch(purchaseItem(selectedItemId));
                            dispatch(addGamifLog(`Bought item: ${selectedItemId}`));
                            // toggleModal(true);
                        }}
                    >
                        Buy
                    </Button>
                    <Button
                        className='gamif-shop-window-button'
                        disabled={overlayVisible}
                        onClick={() => useItem(selectedItemId)}
                    >
                        Use
                    </Button>
                    {/* <Button
                        className='gamif-debug-button'
                        onClick={() => toggleOverlay(!overlayVisible)}
                    >
                        Overlay
                    </Button> */}
                    <div className='gamif-shop-window-button gamif-shop-balance-display'>
                        <CvatTooltip overlay='Current Balance'>
                            <h3>
                                {/* <span>Current Balance: </span> */}
                                {/* &nbsp; */}
                                {currentBalance}
                                {/* <SketchOutlined /> */}
                                <div style={{ width: '25px', height: '25px' }}>
                                    <AnnotationCoinNoBorderIcon />
                                </div>
                                {/* <Button
                                    icon={<AnnotationCoinNoBorderIcon />}
                                    type='text'
                                /> */}
                            </h3>
                        </CvatTooltip>
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
