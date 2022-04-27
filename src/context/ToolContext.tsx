import React, { createContext, useState, useEffect, useMemo } from 'react'
import { cloneDeep } from 'lodash'
import { Tool, ToolInstance } from '../types'
import generateLabelForFieldName from '../utils/generateLabelForFieldName'
import { v4 as uuidv4 } from 'uuid'
import { arrayMove } from '@dnd-kit/sortable'
import ToolNameDialog from '../components/FormEditor/components/ToolNameDialog'

interface ToolContextExport {
  tools: Tool<any>[],
  toolInstances: ToolInstance<any>[],
  selectedToolInstance: ToolInstance<any> | null,
  createToolInstance: (tool: Tool<any>, index?: number, parent?: string) => void,
  removeToolInstance: (instance: ToolInstance<any>) => void,
  moveToolInstance: (toolInstanceName: string, newIndex: number) => void,
  updateToolInstance: (instance: ToolInstance<any>) => void
  selectToolInstance: (toolInstance: ToolInstance<any>) => void
  clearSelectedToolInstance: () => void
}

const Context = createContext<ToolContextExport | null>(null)

const ToolContextProvider: React.FC<{ tools: Tool<any>[], defaultToolInstances: ToolInstance<any>[], children: React.ReactChild }> = ({ children, tools, defaultToolInstances }) => {
  const [toolInstances, setToolInstances] = useState<ToolInstance<any>[]>(defaultToolInstances)
  const [selectedToolInstanceName, setSelectedToolInstanceName] = useState<string | null>(null)
  const [pendingAddTool, setPendingAddTool] = useState<{ tool: Tool<any>, index?: number, parent?: string } | null>(null)

  // If the default tool instances change, then we should update the tool instances
  useEffect(() => setToolInstances(defaultToolInstances), [defaultToolInstances, setToolInstances])

  const createToolInstance = (tool: Tool<any>, index?: number, parent?: string) => {
    if (tool.requireName === false) {
      addToolInstance({ ...tool, parent, name: generateToolName() }, index)
      return
    }

    setPendingAddTool({ tool, index, parent })
  }

  const addToolInstance = (toolInstance: ToolInstance<any>, index?: number) => {
    if (toolInstances.find(t => t.name === toolInstance.name)) {
      return `There is already a tool with the name ${toolInstance.name}`
    }
    if (tools.find(t => t.toolType === toolInstance.name)) {
      return `The name "${toolInstance.name}" is reserved and can not be used`
    }

    if (toolInstance.options.label) {
      toolInstance.options.label = generateLabelForFieldName(toolInstance.name)
    }

    setToolInstances((toolInstances) => {
      const newToolInstances = cloneDeep(toolInstances)
      const insertAt = index || newToolInstances.length
      newToolInstances.splice(insertAt, 0, toolInstance)
      return newToolInstances
    })

    setSelectedToolInstanceName(toolInstance.name)

    return true
  }

  const removeToolInstance = (instance: ToolInstance<any>) => {
    setSelectedToolInstanceName(null)
    setToolInstances(instances => instances.filter(i => i.name !== instance.name))
  }

  const moveToolInstance = (toolInstanceName: string, newIndex: number) => {
    setToolInstances((toolInstances) => {
      const oldIndex = toolInstances.findIndex((instance) => instance.name === toolInstanceName)
      return arrayMove(toolInstances, oldIndex, newIndex);
    })
  }

  const updateToolInstance = (instance: ToolInstance<any>) => {
    setToolInstances(toolInstances => {
      const newToolInstances = [...toolInstances]
      const toolIndex = toolInstances.findIndex(t => t.name === instance.name)
      newToolInstances[toolIndex] = instance
      return newToolInstances
    })
  }

  const selectToolInstance = (toolInstance: ToolInstance<any>) => {
    setSelectedToolInstanceName(toolInstance.name)
  }

  const selectedToolInstance = useMemo(() => {
    let selectedToolInstance: ToolInstance<any> | null = null

    if (selectedToolInstanceName) {
      selectedToolInstance = toolInstances.find(t => t.name === selectedToolInstanceName) || null
    }

    return selectedToolInstance
  }, [
    selectedToolInstanceName,
    toolInstances
  ])

  const clearSelectedToolInstance = () => {
    setSelectedToolInstanceName(null)
  }

  const exposed = {
    tools,
    toolInstances,
    createToolInstance,
    removeToolInstance,
    moveToolInstance,
    updateToolInstance,
    selectedToolInstance,
    selectToolInstance,
    clearSelectedToolInstance
  }

  return <Context.Provider value={exposed}>
    <ToolNameDialog pendingTool={pendingAddTool} onAdd={addToolInstance} onClose={() => setPendingAddTool(null)} />
    {children}
  </Context.Provider>
}

export const useTools = () => {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error('useTools must be used within a ToolContextProvider')
  }
  return context
}

function generateToolName(): string {
  return uuidv4()
}

export default ToolContextProvider
