import React from 'react'
import { Story, Meta } from '@storybook/react'

import FormEditor, { FormEditorProps } from './FormEditor'
import { FormStructure } from '../../types'
import tools, { header, paragraph } from '../Tools'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default {
  title: 'FormEditor',
  component: FormEditor,
  argTypes: {}
} as Meta<typeof FormEditor>

interface HeaderProps {
  onSave: (
    performSave: (data: Pick<FormStructure, 'items'>) => FormStructure
  ) => void
}

const Header = (_props: HeaderProps) => {
  return null
}

const Template: Story<FormEditorProps<FormStructure>> = (args) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormEditor
      {...args}
      header={Header}
    />
  </LocalizationProvider>
)

export const DefaultTools = Template.bind({})
DefaultTools.args = {
  tools: tools,
  initialValue: {
    items: [
      {
        ...header,
        name: 'header_1',
        options: {
          ...header.options,
          content: 'Form Title'
        }
      },
      {
        ...paragraph,
        name: 'paragraph_1',
        options: {
          ...paragraph.options,
          content: 'This is the contents of the first paragraph'
        }
      }
    ]
  }
}
