import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TextInput from "./TextInput";
import Agenda from "/public/icons/agenda.svg";

export default {
  title: 'General/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  id: "userName",
  label: `label`,
  placeHolder:"Placeholder"
}

export const WithError = Template.bind({});
WithError.args = {
  id: "userName",
  label: `Enter the selected username`,
  placeHolder:"peter31",
  error:"User already exists"
}

function test() {
  alert("icon clicked")
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  id: "userName",
  label: `label`,
  placeHolder:"Placeholder",
  onIconClick:test,
  icon: Agenda
}
WithIcon.storyName="With clickable icon";

export const Default = Template.bind({});
