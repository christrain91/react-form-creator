import { FormStructure, Tool, FieldProps, ToolInstance } from 'types'

function formatItemsToToolInstances(
  items: FormStructure['items'],
  tools: Tool<FieldProps>[]
): ToolInstance<FieldProps>[] {
  const topLevelItems = items.filter((item) => !item.parent)
  return formatItemsToToolInstancesResursive(items, topLevelItems, tools)
}

function formatItemsToToolInstancesResursive(
  allItems: FormStructure['items'],
  itemsToFormat: FormStructure['items'],
  tools: Tool<FieldProps>[]
): ToolInstance<FieldProps>[] {
  return itemsToFormat.map((item) => {
    const tool = tools.find((t) => t.toolType === item.toolType)
    if (!tool) {
      throw new Error(`Could not find tool for type ${item.toolType}`)
    }
    return {
      ...tool,
      name: item.name,
      children: formatItemsToToolInstancesResursive(
        allItems,
        allItems.filter((iteratee) => iteratee.parent === item.name),
        tools
      ),
      parent: item.parent,
      options: {
        ...tool.options,
        ...item.options
      }
    }
  })
}

// add unit test for function formatItemsToToolInstances

export default formatItemsToToolInstances
