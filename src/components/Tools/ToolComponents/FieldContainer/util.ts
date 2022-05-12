import { FlexJustify } from 'types'
import { FieldContainerProps } from '.'

export function getClassNameFromProps(props: FieldContainerProps): string {
  const flexDirection =
    props.orientation === 'vertical' ? 'flex-col' : 'flex-row'

  const justifyContent: FlexJustify = props.justify || 'justify-center'

  const className = `flex p-6 ${flexDirection} ${justifyContent} gap-y-2 gap-x-2 items-center justify-center align-middle`

  return className
}
