/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import React from "react";
import Props from '../../children'
import UserSticker from "../../general/UserSticker/UserSticker";
import Logo from '../../general/Logo/Logo';
import styles from './Header.module.css';

export default function Header({ children, ...props }:Props) {
    return (
        <div className={styles.header}>
           <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <Logo width="160px" inverse />
                   <div style={{display:"flex", justifyContent:"center", flex:"1"}}>
                       <div style={{display:"flex", justifyContent:"flex-end", flex:"1"}}>
                            <UserSticker href="/MyProfile" />
                       </div>
                   </div>
                </div>
       </div>
    )
}