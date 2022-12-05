/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */


import Props from "../../children";
import ClearLogoImage from './Logo_Clear_256_105.png';
import InverseLogoImage from './Logo_Inverse_256_105.png';
import Img from '../Img/Img';


interface LogoProps extends Props {
    inverse: boolean
    width?: string
    href?:string
}

export default function Logo({
    children,
    inverse=false,
    width="128",
    href="https://my.agoraspeakers.org",
    ...props} : LogoProps) {
    return (
        <Img src={inverse?InverseLogoImage:ClearLogoImage} width={width} title={"Agora Speakers International"} />
    );

}