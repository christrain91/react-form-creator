import React from 'react'
import { Story, Meta } from '@storybook/react'

import FormEditor, { FormEditorProps } from './FormEditor'
import { FormDefinition } from '../../types'
import tools from '../Tools'

export default {
  title: 'FormEditor',
  component: FormEditor,
  argTypes: {}
} as Meta<typeof FormEditor>

interface HeaderProps {
  onSave: (performSave: (data: Pick<FormDefinition, 'items'>) => FormDefinition) => void
}

const Header = (_props: HeaderProps) => {
  return null
}

const Template: Story<FormEditorProps> = (args) => <FormEditor {...args} header={Header} />

export const DefaultTools = Template.bind({})
DefaultTools.args = {
  tools: tools
}