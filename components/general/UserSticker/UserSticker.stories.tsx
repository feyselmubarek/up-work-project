import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import CustomAvatar from "/public/icons/female_avatar_1.jpg";
import UserSticker from "./UserSticker";

export default {
  title: 'General/UserSticker',
  component: UserSticker,
  args: { userName:"Jane Doe", src: CustomAvatar}
} as ComponentMeta<typeof UserSticker>;

const Template: ComponentStory<typeof UserSticker> = (args) => <UserSticker {...args} />;


export const Default = Template.bind({});
