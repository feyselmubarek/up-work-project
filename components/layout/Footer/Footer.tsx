/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import React from "react";
import Props from '../../children'
import {useTranslation} from 'next-i18next';
import styles from './Footer.module.css';

export default function Footer({ children, ...props }:Props) {
    const {t} = useTranslation('common');
    return (
        <div className={styles.footer}>
            {t('legal.copyright.notice')}
        </div>
    )
}