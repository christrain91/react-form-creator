import React from 'react'
import Typography from '@mui/material/Typography'
import { AlignmentValue } from '../../../types'
import { FieldProps } from '@pcs/react-form-creator-core'

export interface ParagraphProps extends FieldProps {
  content: string
  align: AlignmentValue
}

const Paragraph = (props: ParagraphProps) => {
  const { content, align } = props

  return (
    <Typography
      align={align}
      variant="body1"
    >
      {content}
    </Typography>
  )
}

export default Paragraph
