import { FlexJustify } from '../../../../types'
import { FieldProps } from '@pcs/react-form-creator-core'

export { default } from './FieldContainer'
export interface FieldContainerProps extends FieldProps {
  orientation: 'horizontal' | 'vertical'
  justify: FlexJustify
}
