/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import React from "react";
import Props from '../../children'
import {useTranslation} from 'next-i18next';
import Img from "../Img/Img";
import styles from "./AppCard.module.css";

interface AppCardProps extends Props {
    href: string;
    icon: string | object;
    title: string;
}

export default function AppCard({ children, ...props }:AppCardProps) {
    const {t} = useTranslation('common');
    return (
        <div className={styles.appCard}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <a href={props.href}>
                        <Img src={props.icon} alt={props.title} />
                    </a>
                </div>
                <div className={styles.title}>{props.title}</div>
            </div>
        </div>
    )
}