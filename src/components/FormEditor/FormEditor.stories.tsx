import React from 'react'
import { Story, Meta } from '@storybook/react'

import FormEditor, { FormEditorProps } from './FormEditor'
import { FormStructure } from '@pcs/react-form-creator-core'
import tools, { header, paragraph } from '../Tools'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import enGBLocale from 'date-fns/locale/en-GB'

export default {
  title: 'FormEditor',
  component: FormEditor,
  argTypes: {}
} as Meta<typeof FormEditor>

interface CustomFormStructure extends FormStructure {
  name: string
}

interface HeaderProps {
  initialValue: CustomFormStructure
  onSave: (
    performSave: (
      data: Pick<CustomFormStructure, 'items'>
    ) => CustomFormStructure
  ) => void
}

const Header: React.FC<HeaderProps> = (props) => {
  return <p>{props.initialValue.name}</p>
}

const Template: Story<FormEditorProps<FormStructure>> = (args) => (
  <LocalizationProvider
    dateAdapter={AdapterDateFns}
    locale={enGBLocale}
  >
    <FormEditor
      {...args}
      initialValue={args.initialValue as CustomFormStructure}
      header={Header}
    />
  </LocalizationProvider>
)

export const DefaultTools = Template.bind({})
DefaultTools.args = {
  tools: tools,
  initialValue: {
    name: 'The name of my form',
    items: [
      {
        toolType: 'header',
        name: 'header_1',
        options: {
          ...header.options,
          content: 'Form Title'
        }
      },
      {
        toolType: 'paragraph',
        name: 'paragraph_1',
        options: {
          ...paragraph.options,
          content: 'This is the contents of the first paragraph'
        }
      },
      {
        toolType: 'file',
        name: 'yes',
        options: {
          label: 'Yes'
        }
      },
      {
        toolType: 'text',
        name: 'caption',
        options: {
          label: 'Caption'
        },
        parent: 'yes'
      }
    ]
  }
}
