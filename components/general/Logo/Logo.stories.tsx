import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Logo from './Logo';

export default {
  title: 'General/Logo',
  component: Logo,
  argTypes: {
    inverse: { control: 'boolean' },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  inverse: false,
  width: "200px"
};


export const Inverse = Template.bind({});
Inverse.args = {
  inverse: true,
  width: "200px"
};
