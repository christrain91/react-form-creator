import React from 'react'

import CheckboxIcon from '@mui/icons-material/CheckBox'
import TextField, { TextFieldProps } from './ToolComponents/TextField'
import Alignment from './OptionFields/Alignment'
import HeaderSelector from './OptionFields/HeaderSelector'
import { Tool } from '@pcs/react-form-creator-core'

import TextFieldsIcon from '@mui/icons-material/TextFields'
import NumberIcon from '@mui/icons-material/Numbers'
import TitleIcon from '@mui/icons-material/Title'
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import DateRangeIcon from '@mui/icons-material/DateRange'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import Items from './OptionFields/Items'
import DateSelector, { DateSelectorProps } from './ToolComponents/DateSelector'
import OrientationSelector from './OptionFields/OrientationSelector'
import FieldContainer, {
  FieldContainerProps
} from './ToolComponents/FieldContainer'
import CheckboxField, {
  CheckboxFieldProps
} from './ToolComponents/CheckboxField'
import Header, { HeaderProps } from './ToolComponents/Header'
import NumberField, { NumberFieldProps } from './ToolComponents/NumberField'
import Paragraph, { ParagraphProps } from './ToolComponents/Paragraph'
import DropdownField, {
  DropdownFieldProps
} from './ToolComponents/DropdownField'
import RadioButtons, { RadioButtonsProps } from './ToolComponents/RadioButtons'
import FileUpload, {
  FileUploadProps
} from './ToolComponents/FileUpload/FileUpload'
import FieldContainerEditor from './ToolComponents/FieldContainer/FieldContainerEditor'
import FlexJustifySelector from './OptionFields/FlexJustifySelector'
import FileUploadEditor from './ToolComponents/FileUpload/FileUploadEditor'

const iconProps = {
  fontSize: 'large'
} as { fontSize: 'large' }

export const textField: Tool<TextFieldProps> = {
  title: 'Text Field',
  toolType: 'text',
  icon: <TextFieldsIcon {...iconProps} />,
  options: {
    label: 'Text Field',
    placeholder: 'Enter your text here...',
    required: false,
    multiline: false,
    prefix: '',
    suffix: ''
  },
  optionFields: {},
  component: TextField
}

export const numberField: Tool<NumberFieldProps> = {
  title: 'Number Field',
  toolType: 'number',
  icon: <NumberIcon {...iconProps} />,
  options: {
    label: 'Number Field',
    min: 0,
    max: 100,
    required: false,
    prefix: '',
    suffix: ''
  },
  component: NumberField
}

export const checkboxField: Tool<CheckboxFieldProps> = {
  title: 'Checkbox',
  toolType: 'checkbox',
  icon: <CheckboxIcon {...iconProps} />,
  options: {
    label: 'Checkbox Field',
    defaultChecked: false
  },
  component: CheckboxField
}

export const header: Tool<HeaderProps> = {
  title: 'Header',
  toolType: 'header',
  icon: <TitleIcon {...iconProps} />,
  requireName: false,
  options: {
    content: 'Header',
    headerType: 'h2',
    align: 'center'
  },
  optionFields: {
    align: Alignment,
    headerType: HeaderSelector
  },
  component: Header
}

export const paragraph: Tool<ParagraphProps> = {
  title: 'Paragraph',
  toolType: 'paragraph',
  icon: <FormatIndentIncreaseIcon {...iconProps} />,
  requireName: false,
  options: {
    content: 'Paragraph',
    align: 'left'
  },
  optionFields: {
    align: Alignment
  },
  component: Paragraph
}

export const dropdown: Tool<DropdownFieldProps> = {
  title: 'Dropdown',
  toolType: 'dropdown',
  icon: <ArrowDropDownCircleIcon {...iconProps} />,
  options: {
    label: 'Dropdown',
    required: false,
    items: [
      { value: 'option_1', text: 'First Option' },
      { value: 'option_2', text: 'Second Option' },
      { value: 'option_3', text: 'Third Option' }
    ]
  },
  optionFields: {
    items: Items
  },
  component: DropdownField
}

export const radioButton: Tool<RadioButtonsProps> = {
  title: 'Radio Buttons',
  toolType: 'radio',
  icon: <RadioButtonCheckedIcon {...iconProps} />,
  options: {
    label: 'Radio',
    items: [
      { value: 'option_1', text: 'First Option' },
      { value: 'option_2', text: 'Second Option' },
      { value: 'option_3', text: 'Third Option' }
    ]
  },
  optionFields: {
    items: Items
  },
  component: RadioButtons
}

export const dateField: Tool<DateSelectorProps> = {
  title: 'Date Field',
  toolType: 'date',
  icon: <DateRangeIcon {...iconProps} />,
  component: DateSelector,
  options: {
    label: 'Date'
  }
}

export const fileUpload: Tool<FileUploadProps> = {
  title: 'File Upload',
  toolType: 'file',
  icon: <FileUploadIcon {...iconProps} />,
  component: FileUpload,
  disableDefaultDroppable: true,
  editComponent: FileUploadEditor,
  options: {
    label: 'File Upload'
  }
}

export const fieldContainer: Tool<FieldContainerProps> = {
  title: 'Container',
  toolType: 'container',
  icon: <SplitscreenIcon {...iconProps} />,
  requireName: false,
  disableDefaultDroppable: true,
  options: {
    orientation: 'horizontal',
    justify: 'justify-center'
  },
  optionFields: {
    orientation: OrientationSelector,
    justify: FlexJustifySelector
  },
  component: FieldContainer,
  editComponent: FieldContainerEditor
}

const tools = [
  header,
  textField,
  dropdown,
  numberField,
  checkboxField,
  radioButton,
  paragraph,
  dateField,
  fileUpload,
  fieldContainer
]

export default tools
