/*
 * Copyright (c) 2022. Agora Speakers International.  All rights reserved.
 * This file is subject to the terms and conditions defined in the  'LICENSE.txt' file which is part of this source code package.
 *
 * Author: Alexander Hristov
 */

import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppCard from "./AppCard";
import Agenda from "/public/icons/agenda.svg";

export default {
    title: 'General/AppCard',
    component: AppCard,
    args:{ icon: Agenda, title:"Agenda"}
} as ComponentMeta<typeof AppCard>;

const Template: ComponentStory<typeof AppCard> = (args) => <AppCard {...args} />;

export const Default = Template.bind({});
