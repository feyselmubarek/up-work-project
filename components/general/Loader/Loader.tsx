/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */


import Props from "../../children";
import styles from "./Loader.module.css";
import Flame from "./flame.png";
import Img from "../Img/Img";

export default function Loader({ children,  ...props }:Props) {
    return (
        <div className={styles.loader}>
            <Img src={Flame} width={"30"} className={styles.fixed}/>
            <div className={styles.face}>
                <div className={styles.circle}></div>
            </div>
            <div className={styles.face}>
                <div className={styles.circle}/>
            </div>
            <div className={styles.face}>
                <div className={styles.circle}></div>
            </div>
        </div>    )
}