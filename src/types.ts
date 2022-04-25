export interface FormDefinition {
  id?: number
  name: string
  description?: string
  items: (Pick<ToolInstance, 'name' | 'options'> & {
    id?: number
    position: number
    item_type: string
  })[]
}

export interface Tool<T = Record<string, unknown>> {
  title: string
  tool_type: ToolType
  icon: React.ReactElement
  options: T
  optionsFields?: Record<
    keyof T,
    (props: {
      value: unknown
      label: string
      onChange: (value: unknown) => void
    }) => React.ReactElement
  >
  render: (options: T) => React.ReactElement
}

export type ToolInstance = Tool & { name: string }

export type ToolType =
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
