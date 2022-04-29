import React, { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Toolbox from './Toolbox/Toolbox'
import ToolOptions from './ToolOptions'
import { FormStructure } from '../../../types'
import FormArea from './FormArea'
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
  DragStartEvent
} from '@dnd-kit/core'
import { useTools } from 'context/ToolContext'
import getToolInstanceByName from '../../../../dist/esm/types/utils/getToolInstanceByName';
import getToolInstanceSiblings from 'utils/getToolInstanceSiblings'

export interface FormEditorViewProps<T extends FormStructure> {
  header: React.FC<{
    onSave: (performSave: (data: Pick<T, 'items'>) => T) => void
  }>
  onSave: (form: T) => void
}

const FormEditorView = <T extends FormStructure>(
  props: FormEditorViewProps<T>
) => {
  const {
    tools,
    toolInstances,
    selectedToolInstance,
    createToolInstance,
    moveToolInstance
  } = useTools()

  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const activeDraggingTool = useMemo(
    () => tools.find((t) => t.toolType === activeDragId),
    [activeDragId, tools]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event

    if (!over || !active) return

    const overToolInstance = toolInstances.find((ti) => ti.name === over.id)

    if (overToolInstance && overToolInstance.disableDefaultDroppable) {
      return
    }

    const itemType = active.data.current?.type as 'tool' | undefined

    if (itemType === 'tool') {
      const newIndex = toolInstances.findIndex(
        (instance) => instance.name === over.id
      )
      const tool = tools.find((t) => t.toolType === active.id)
      if (tool) {
        createToolInstance(tool, newIndex)
      }
      return
    }

    if (active.id === over?.id) return

    const toolInstanceSiblings = getToolInstanceSiblings(over.id, toolInstances)
    const newIndex = toolInstanceSiblings.findIndex(
      (instance) => instance.name === over.id
    )

    moveToolInstance(active.id, newIndex)

  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id)
  }

  const handleSave = (modifierFn: (form: Pick<T, 'items'>) => T) => {
    const form = modifierFn({ items: toolInstances })
    props.onSave(form)
  }

  const Header = props.header

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="w-full h-full flex gap-x-3">
        <div className="flex-1 flex flex-col">
          <Header onSave={handleSave} />
          <FormArea />
        </div>
        <div className="w-1/5 min-w-64 flex flex-col h-full">
          <Typography
            variant="h5"
            className="text-center mb-3"
          >
            Toolbox
          </Typography>
          <Toolbox
            className="overflow-y-auto flex-1"
            activeDraggingTool={activeDraggingTool}
          />
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
      </div>
    </DndContext>
  )
}

export default FormEditorView
