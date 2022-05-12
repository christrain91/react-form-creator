import React from 'react'
import { Typography } from '@mui/material'
import { FieldProps } from '@pcs/react-form-creator-core'
import { HeaderType, AlignmentValue } from '../../../types'

export interface HeaderProps extends FieldProps {
  content: string
  headerType: HeaderType
  align: AlignmentValue
}

const Header = (props: HeaderProps) => {
  const { content, headerType, align } = props
  return (
    <Typography
      variant={headerType}
      align={align}
    >
      {content}
    </Typography>
  )
}

export default Header
