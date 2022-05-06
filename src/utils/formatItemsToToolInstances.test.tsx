import React from 'react'
import formatItemsToToolInstances from './formatItemsToToolInstances'
import { FieldProps, Tool } from '../types/index'

const TestTool: Tool<any> = {
  title: 'Test Tool',
  toolType: 'test_tool',
  icon: <p>Icon</p>,
  requireName: false,
  options: {
    label: ''
  },
  component: () => <p>Test Tool</p>
}

const tools: Tool<any>[] = [TestTool]

describe('formatItemsToToolInstances', () => {
  it('Should format the items to tool instances', () => {
    const items = [
      {
        toolType: 'test_tool',
        name: 'top',
        options: {
          label: 'Top'
        }
      },
      {
        toolType: 'test_tool',
        name: 'inner',
        options: {
          label: 'Inner'
        },
        parent: 'top'
      }
    ]

    const result = formatItemsToToolInstances(items, tools)

    expect(result).toEqual([
      {
        ...TestTool,
        name: 'top',
        options: {
          label: 'Top'
        },
        parent: undefined,
        children: [
          {
            ...TestTool,
            name: 'inner',
            parent: 'top',
            options: {
              label: 'Inner'
            },
            children: []
          }
        ]
      }
    ])
  })
})
