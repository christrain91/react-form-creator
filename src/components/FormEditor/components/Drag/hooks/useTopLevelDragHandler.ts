import { useCallback } from 'react'
import { useTools } from 'context/ToolContext'
import getToolInstanceSiblings from 'utils/getToolInstanceSiblings'
import { DragEndEvent } from '@dnd-kit/core'

function useTopLevelDragHandler() {
  const { tools, toolInstances, createToolInstance, moveToolInstance } =
    useTools()

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
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
          createToolInstance({ tool, index: newIndex })
        }
        return
      }

      if (active.id === over?.id) return

      const toolInstanceSiblings = getToolInstanceSiblings(
        over.id,
        toolInstances
      )
      const newIndex = toolInstanceSiblings.findIndex(
        (instance) => instance.name === over.id
      )

      moveToolInstance(active.id, newIndex)
    },
    [toolInstances]
  )

  return handleDragEnd
}

export default useTopLevelDragHandler
