import React from 'react'
import { Typography } from '@mui/material'
import { FieldProps } from '../../../types'

export interface HeaderProps extends FieldProps {
  content: string
  headerType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align: 'left' | 'center' | 'right' | 'justify'
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
