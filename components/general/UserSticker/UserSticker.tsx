/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import Props from "../../children";
import Avatar from "../Avatar/Avatar";
import styles from "./UserSticker.module.css";

interface UserStickerProps extends Props {
    userName: string
    href?: string
}

UserSticker.defaultProps = {
    userName: 'Anonymous'

}

export default function UserSticker({ children,  ...props }:UserStickerProps) {
    return (
     <a href={props.href} className={styles.userSticker} >
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Avatar {...props} />
            <div style={{ paddingLeft: '0.5em' }}>{props.userName}</div>
        </div>
    </a>
    )
}

