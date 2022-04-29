import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface FormStructure {
  items: Omit<ToolInstance<any>, 'children'>[]
}

type OptionFields<T> = {
  [Key in keyof T]?: React.FC<{
    value: T[Key]
    label: string
    onChange: (value: T[Key]) => void
  }>
}

export interface Tool<OptionsGeneric extends FieldProps> {
  title: string
  toolType: ToolType
  requireName?: boolean
  disableDefaultDroppable?: boolean
  icon: React.ReactElement
  options: Omit<OptionsGeneric, keyof FieldProps>
  optionFields?: OptionFields<Omit<OptionsGeneric, keyof FieldProps>>
  component: React.FC<OptionsGeneric>
  editComponent?: React.FC<OptionsGeneric>
}

export type ToolInstance<T extends FieldProps> = Tool<T> & {
  name: string
  parent?: string
  children: ToolInstance<any>[]
}

export type ToolType =
  | string
  | 'text'
  | 'number'
  | 'checkbox'
  | 'header'
  | 'paragraph'
  | 'dropdown'
  | 'radio'
  | 'date'
  | 'datetime'
  | 'time'
  | 'file'
  | 'container'

export interface FieldProps {
  name: string
  toolInstance: ToolInstance<any>
}
