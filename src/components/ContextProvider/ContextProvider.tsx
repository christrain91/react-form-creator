import React from 'react'
import ToolNameDialog from 'components/FormEditor/components/ToolNameDialog'
import {
  Tool,
  CoreContextProvider,
  FormStructure
} from '@pcs/react-form-creator-core'

interface ContextProviderProps<T extends FormStructure> {
  children: React.ReactNode | React.ReactNode[]
  tools: Tool<any>[]
  initialValue: T
}

const ContextProvider = <T extends FormStructure>(
  props: ContextProviderProps<T>
) => {
  const { tools } = props
  return (
    <CoreContextProvider
      tools={tools}
      initialValue={props.initialValue}
      pendingToolDialog={ToolNameDialog}
    >
      {props.children}
    </CoreContextProvider>
  )
}

export default ContextProvider
