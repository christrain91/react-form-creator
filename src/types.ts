export interface FormDefinition {
  id?: number
  name: string
  description?: string
  items: ToolInstance<any>[]
}

type OptionsFields<T> = {
  [Key in keyof T]?: React.FC<{
    value: T[Key]
    label: string
    onChange: (value: T[Key]) => void
  }>
}

export interface Tool<OptionsGeneric> {
  title: string
  toolType: ToolType
  requireName?: boolean
  disableDefaultDroppable?: boolean
  icon: React.ReactElement
  options: Omit<OptionsGeneric, 'name'>
  optionFields?: OptionsFields<Omit<OptionsGeneric, 'name'>>
  component: React.FC<OptionsGeneric & { name: string }>
  editComponent?: React.FC<OptionsGeneric & { name: string }>
}

export type ToolInstance<T> = Tool<T> & { name: string; parent?: string }

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
