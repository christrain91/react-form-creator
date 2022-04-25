import React from 'react'
import Typography from '@mui/material/Typography'
import Toolbox from './components/Toolbox'
import { useState, useEffect, useMemo, FormEventHandler } from 'react'
import Paper from '@mui/material/Paper'
import ToolOptions from './components/ToolOptions'
import ToolInstanceContainer from './components/ToolInstanceContainer'
import { ToolInstance, FormDefinition, Tool } from '../../types'
import Button from '@mui/material/Button'
import { compact, cloneDeep } from 'lodash'
import generateLabelForFieldName from '../../utils/generateLabelForFieldName'

export interface FormEditorProps {
  defaultToolInstances?: ToolInstance[]
  defaultFormDefinition?: FormDefinition
  tools: Tool[]
  header: React.FC<{ onSave: (performSave: (data: Pick<FormDefinition, 'items'>) => FormDefinition) => void }>
  onSave: (form: FormDefinition) => void
}

const FormBuilder = (props: FormEditorProps) => {
  const [toolInstances, setToolInstances] = useState<ToolInstance[]>(cloneDeep(props.defaultToolInstances || []))
  const [selectedToolName, setSelectedToolName] = useState<string | null>(null)

  const [showSubmitData, setShowSubmitData] = useState(false)
  const [submitData, setSubmitData] = useState<Record<string, unknown> | null>(null)

  const { defaultFormDefinition, tools } = props

  useEffect(() => {
    if (!defaultFormDefinition) return
    const defaultToolInstances: (ToolInstance | null)[] = defaultFormDefinition.items.map(item => {
      const matchingTool = tools.find(tool => tool.tool_type === item.item_type)

      if (!matchingTool) return null

      return {
        ...matchingTool,
        name: item.name,
        options: item.options
      } as ToolInstance
    })

    setToolInstances(compact(defaultToolInstances))
  }, [setToolInstances, defaultFormDefinition])

  const onAddTool = (tool: ToolInstance) => {
    const toolWithSameName = toolInstances.find((t) => t.name === tool.name)

    if (toolWithSameName) {
      return `There is already a tool with the name: "${tool.name}"`
    }

    if (tool.options.label) {
      tool.options.label = generateLabelForFieldName(tool.name)
    }

    setToolInstances(currentTools => [...currentTools, tool])
    setSelectedToolName(tool.name)
    return true
  }

  const onRemoveTool = (toolInstance: ToolInstance) => {
    setSelectedToolName(null)
    setToolInstances(currentToolInstances => currentToolInstances.filter(t => t.name !== toolInstance.name))
  }

  const onUpdateTool = (toolInstance: ToolInstance) => {
    setToolInstances(toolInstances => {
      const newToolInstances = [...toolInstances]
      const toolIndex = toolInstances.findIndex(t => t.name === toolInstance.name)
      newToolInstances[toolIndex] = toolInstance
      return newToolInstances
    })
  }

  const onSelectTool = (tool: ToolInstance) => {
    const isSelected = selectedToolName === tool.name
    if (isSelected) {
      setSelectedToolName(null)
    } else {
      setSelectedToolName(tool.name)
    }
  }

  const moveToolUp = (toolInstance: ToolInstance) => {
    const toolIndex = toolInstances.findIndex(t => t.name === toolInstance.name)
    moveToolToNewIndex(toolInstance, toolIndex - 1)
  }

  const moveToolDown = (toolInstance: ToolInstance) => {
    const toolIndex = toolInstances.findIndex(t => t.name === toolInstance.name)
    moveToolToNewIndex(toolInstance, toolIndex + 1)
  }

  const moveToolToNewIndex = (toolInstance: ToolInstance, newIndex: number) => {
    const toolIndex = toolInstances.findIndex(t => t.name === toolInstance.name)
    if (toolIndex === newIndex || newIndex < 0 || newIndex >= toolInstances.length) return

    const newTools = [...toolInstances]
    newTools.splice(newIndex, 0, newTools.splice(toolIndex, 1)[0])
    setToolInstances(newTools)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form) as unknown as Iterable<readonly [PropertyKey, any]>
    const data = Object.fromEntries(formData);

    setSubmitData(data)
    setShowSubmitData(true)
  }

  const selectedTool = useMemo(() => toolInstances.find(t => t.name === selectedToolName), [selectedToolName, toolInstances])

  const handleSave = (modifierFn: (form: Pick<FormDefinition, 'items'>) => FormDefinition) => {
    const items = toolInstances.map((toolInstance, index) => ({
      name: toolInstance.name,
      item_type: toolInstance.tool_type,
      options: toolInstance.options,
      position: index
    }))

    const form = modifierFn({ items })
    props.onSave(form)
  }

  const Header = props.header

  return <div className="w-full h-full flex gap-x-3">
    <div className="flex-1 flex flex-col">
      <Header onSave={handleSave} />
      <form className='flex-1' onSubmit={handleSubmit}>
        <Paper elevation={2} className="p-6 h-full overflow-y-auto flex justify-center">
          <div className="w-full max-w-2xl flex flex-col">
            {toolInstances.map(toolInstance => {
              const isSelected = selectedToolName === toolInstance.name
              return <ToolInstanceContainer key={toolInstance.name} tool={toolInstance} isSelected={isSelected} onRemoveClick={onRemoveTool} onEditClick={onSelectTool} onMoveUpClick={moveToolUp} onMoveDownClick={moveToolDown} />
            })}
            <div className="text-center">
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </div>
          </div>
        </Paper>
      </form>
    </div>
    <div className="w-1/5 min-w-64 flex flex-col h-full">
      <Typography variant="h5" className="text-center mb-3">Toolbox</Typography>
      <Toolbox className="overflow-y-auto flex-1" tools={props.tools} onAddTool={onAddTool} />
      {selectedTool && <div className="flex-1">
        <Typography variant="h5" className="text-center mb-3">{selectedTool.title} Settings</Typography>
        <ToolOptions className="overflow-y-auto flex-1" tool={selectedTool} onChange={onUpdateTool} onRemove={onRemoveTool} />
      </div>}
    </div>
  </div>
}


export default FormBuilder