export type AlignmentValue = 'left' | 'center' | 'right' | 'justify'

export type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export interface SelectorItem {
  value: string
  text: string
}

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
