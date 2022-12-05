/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import React from "react";
import Props from '../../children'
import DefaultAvatar from './generic_avatar.png';
import Img from '../Img/Img';
import styles from './Avatar.module.css';


interface AvatarProps extends Props {
    src?: any
    userName?: string;
    className?: string;
}


export default function Avatar({ children, src=DefaultAvatar, ...props }:AvatarProps) {
    return (
        <div className={styles.avatar}>
            <Img
                className={props.className}
                src={src}
                alt={props.userName}
                title={props.userName}
            />
        </div>
    )
}