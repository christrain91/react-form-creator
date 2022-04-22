import React from 'react'
import { Story, Meta } from '@storybook/react'

import FormEditor, { FormEditorProps } from './FormEditor'

export default {
  title: 'FormEditor',
  component: FormEditor,
  argTypes: {}
} as Meta<typeof FormEditor>

const Template: Story<FormEditorProps> = (args) => <FormEditor {...args} />

export const Standard = Template.bind({})
Standard.args = {}