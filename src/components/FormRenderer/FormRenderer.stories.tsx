import React from 'react'
import { Story, Meta } from '@storybook/react'
import FormRenderer, { FormRendererProps } from './FormRenderer'
import tools from '../Tools'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default {
  title: 'Form Renderer',
  component: FormRenderer,
  argTypes: {}
} as Meta<typeof FormRenderer>

const Template: Story<FormRendererProps> = (args) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormRenderer {...args} />
  </LocalizationProvider>
)

export const DefaultTools = Template.bind({})
DefaultTools.args = {
  tools: tools,
  items: [
    {
      toolType: 'header',
      name: 'header_1',
      options: {
        content: 'Form Title'
      }
    },
    {
      toolType: 'paragraph',
      name: 'paragraph_1',
      options: {
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
