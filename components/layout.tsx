/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Props from './children'

export default function Layout({ children, ...props }:Props) {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}