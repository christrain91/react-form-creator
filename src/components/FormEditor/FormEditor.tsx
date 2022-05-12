import React, { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Toolbox from './components/Toolbox'
import ToolOptions from './components/ToolOptions'

import FormArea from './components/FormArea'
import {
  EditorWrapper,
  useTools,
  formatToolInstancesToItems,
  FormStructure,
  Tool
} from '@pcs/react-form-creator-core'
import ContextProvider from 'components/ContextProvider/ContextProvider'

export interface FormEditorProps<T extends FormStructure> {
  header: React.FC<{
    initialValue: T
    onSave: (performSave: (data: Pick<T, 'items'>) => T) => void
  }>
  initialValue: T
  tools: Tool<any>[]
  onSave: (form: T) => void
}

const WrappedFormEditor = <T extends FormStructure>(
  props: FormEditorProps<T>
) => {
  return (
    <ContextProvider
      tools={props.tools}
      initialValue={props.initialValue}
    >
      <FormEditor {...props} />
    </ContextProvider>
  )
}

const FormEditor = <T extends FormStructure>(props: FormEditorProps<T>) => {
  const { toolInstances, selectedToolInstance } = useTools()

  const handleSave = (modifierFn: (form: Pick<T, 'items'>) => T) => {
    const form = modifierFn({
      items: formatToolInstancesToItems(toolInstances)
    })
    props.onSave(form)
  }

  const Header = props.header

  return (
    <div className="w-full h-full flex gap-x-3">
      <EditorWrapper>
        <div className="flex-1 flex flex-col">
          <Header
            initialValue={props.initialValue}
            onSave={handleSave}
          />
          <FormArea />
        </div>
        <div className="w-1/5 min-w-64 flex flex-col h-full">
          <Typography
            variant="h5"
            className="text-center mb-3"
          >
            Toolbox
          </Typography>
          <Toolbox className="overflow-y-auto flex-1" />
          {selectedToolInstance && (
            <div className="flex-1 mt-4">
              <Typography
                variant="h5"
                className="text-center mb-3"
              >
                {selectedToolInstance.title} Settings
              </Typography>
              <ToolOptions
                className="overflow-y-auto flex-1"
                toolInstance={selectedToolInstance}
              />
            </div>
          )}
        </div>
      </EditorWrapper>
    </div>
  )
}

export default WrappedFormEditor
