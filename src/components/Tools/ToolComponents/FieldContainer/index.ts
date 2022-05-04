import { FieldProps, FlexJustify } from '../../../../types/index'

export { default } from './FieldContainer'
export interface FieldContainerProps extends FieldProps {
  orientation: 'horizontal' | 'vertical'
  justify: FlexJustify
}
