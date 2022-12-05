/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import Props from "../../children";
import {MouseEventHandler} from "react";

/**
 * Compatible image component that addresses Storybook's problem of handling statically imported local assets
 *
 */
interface ImgProps extends  Props {
    title?:string,
    width?:string,
    alt?:string,
    src: any,
    className?:string
    onClick?: MouseEventHandler

}


export default function Img({children,...props}:ImgProps) {
    var source = (typeof(props.src) == "object")?props.src.src:props.src;
    return (
        <img
            src={source}
            { ...(props.alt?{alt:props.alt}:{} ) }
            { ...(props.width?{width:props.width}:{} ) }
            { ...(props.title?{title:props.title}:{} ) }
            { ...(props.className?{className:props.className}:{} ) }
            {...(props.onClick?{onClick: props.onClick} : {})}
        />
    );

}