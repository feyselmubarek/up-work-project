/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import Props from "../../children";
import {ChangeEventHandler, FocusEventHandler, MouseEventHandler, KeyboardEventHandler} from "react";
import Warning from "/public/icons/warning.svg";
import Img from "../Img/Img";


interface TextInputProps extends Props {
    label?: string,
    id:string,
    icon: any,
    iconTitle: string,
    onIconClick? : MouseEventHandler
    error?: string,
    placeHolder?: string
    size?: number
    type?: string
    onKeyPress?: KeyboardEventHandler
    onKeyDown?: KeyboardEventHandler
    onKeyUp?: KeyboardEventHandler
    onClick?: MouseEventHandler
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
    onChange?: ChangeEventHandler<HTMLInputElement>
};

export default function TextInput({children,
    size=40, type="text", placeHolder="", label="", ...props}:TextInputProps)
{
    console.log(props.onIconClick);
    return (
        <div className={"field"} data-check={props.error?'error':''}>
            <input type={type}
                   defaultValue={placeHolder}
                   id={props.id}
                   name={props.id}
                   size={size}
                   {...(props.onChange?{onChange: props.onChange} : {})}
                   {...(props.onKeyUp?{onKeyUp: props.onKeyUp} : {})}
                   {...(props.onKeyDown?{onKeyDown: props.onKeyDown} : {})}
                   {...(props.onKeyPress?{onKeyPress: props.onKeyPress} : {})}
                   {...(props.onClick?{onClick: props.onClick} : {})}
            />
            { (label != "")?<label htmlFor={props.id}>{label}</label>:null }
            { props.error? <div className={"error"}>{props.error} </div>:null }
            <div className={"iconArea"}>
                {  props.error? <Img src={Warning} title={props.error}/>:null }
                {  props.icon?
                    <Img src={props.icon} title={props.iconTitle} {...(props.onIconClick?{onClick: props.onIconClick} : {})}  />
                    :
                    null
                }
            </div>
        </div>
    );

};