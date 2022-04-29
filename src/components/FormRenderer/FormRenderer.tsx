import React from 'react'
import { FormStructure, Tool } from 'types/index'
import { FormEventHandler } from 'react'
import Button from '@mui/material/Button'

interface FormRendererProps {
  className?: string
  tools: Tool<any>[]
  items: FormStructure['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRenderer = (props: FormRendererProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formProps = Object.fromEntries(
      formData as unknown as Iterable<readonly any[]>
    )

    props.onSubmit(formProps)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={props.className}
    >
      {props.items.map((item) => {
        const matchingTool = props.tools.find(
          (t) => t.toolType === item.toolType
        )

        if (!matchingTool) return null

        const Component = matchingTool.component

        return (
          <Component
            name={item.name}
            {...item.options}
          />
        )
      })}
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default FormRenderer
