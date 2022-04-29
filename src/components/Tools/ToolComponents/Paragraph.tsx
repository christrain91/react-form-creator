import React from 'react'
import Typography from '@mui/material/Typography'
import { AlignmentValue } from '../OptionFields/Alignment'
import { FieldProps } from '../../../types'

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
