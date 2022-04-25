import React from 'react'
import { FormDefinition, Tool } from '../../types'
import { FormEventHandler } from 'react'
import Button from '@mui/material/Button'
import { Fragment } from 'react'


interface FormRendererProps {
  className?: string
  tools: Tool[]
  items: FormDefinition['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRenderer = (props: FormRendererProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData as unknown as Iterable<readonly any[]>);

    props.onSubmit(formProps)
  }

  return <form onSubmit={handleSubmit} className={props.className}>
    {props.items.map(item => {
      const matchingTool = props.tools.find(t => t.tool_type === item.item_type)

      if (!matchingTool) return null

      return <Fragment key={item.name}>{matchingTool.render({ ...(item.options || {}), name: item.name })}</Fragment>
    })}
    <div className="flex justify-center">
      <Button type="submit" variant="contained">Submit</Button>
    </div>
  </form >
}

export default FormRenderer