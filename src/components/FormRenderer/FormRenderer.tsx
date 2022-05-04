import React from 'react'
import { FormStructure, Tool } from '../../types'
import { FormEventHandler } from 'react'
import Button from '@mui/material/Button'

interface FormRendererProps {
  className?: string
  tools: Tool<any>[]
  items: FormStructure['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRenderer = (props: FormRendererProps) => {
  return null
}

export default FormRenderer
