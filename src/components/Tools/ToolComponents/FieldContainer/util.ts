import { FieldContainerProps } from '.'

export function getClassNameFromProps(props: FieldContainerProps): string {
  const flexDirection =
    props.orientation === 'vertical' ? 'flex-col' : 'flex-row'

  const justifyContent = props.justify || 'center'

  const className = `flex p-6 ${flexDirection} gap-y-2 gap-x-2 items-center justify-center align-middle`

  return className
}
