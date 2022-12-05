import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Avatar from "./Avatar";
import CustomAvatar from "/public/icons/female_avatar_1.jpg";

export default {
  title: 'General/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const WithCustomAvatar = () => <Avatar src={CustomAvatar} />;
WithCustomAvatar.storyName = 'With custom avatar image';

export const Default = Template.bind({});
