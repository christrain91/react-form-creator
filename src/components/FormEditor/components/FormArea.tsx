import React, { useState, FormEventHandler } from 'react'
import { Paper, Button } from '@mui/material'
import ToolInstanceContainer from './ToolInstanceContainer'
import FormSubmitDataDialog from './FormSubmitDataDialog'
import { SortableContext } from '@dnd-kit/sortable'
import { useTools } from '../../../context/ToolContext'


const FormArea = () => {
  const [showSubmitData, setShowSubmitData] = useState(false)
  const [submitData, setSubmitData] = useState<Record<string, unknown> | null>(null)
  const { toolInstances } = useTools()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form) as unknown as Iterable<readonly [PropertyKey, any]>
    const data = Object.fromEntries(formData);

    setSubmitData(data)
    setShowSubmitData(true)
  }

  const rootToolInstances = toolInstances.filter(ti => !ti.parent)

  return <>
    <FormSubmitDataDialog title="Form submitted with data:" data={submitData} open={showSubmitData} onClose={() => setShowSubmitData(false)} />
    <form className='flex-1' onSubmit={handleSubmit}>
      <Paper elevation={2} className="p-6 h-full overflow-y-auto flex justify-center">
        <div className="w-full max-w-2xl flex flex-col">
          <SortableContext items={toolInstances.map(instance => instance.name)}>
            {rootToolInstances.map((toolInstance, index) => (
              <ToolInstanceContainer
                key={toolInstance.name}
                toolInstance={toolInstance}
                index={index}
              />
            ))}
            {submitButton}
          </SortableContext>
        </div>
      </Paper>
    </form>
  </>
}

const submitButton = <div className="text-center">
  <Button variant="contained" color="primary" type="submit">Submit</Button>
</div>

export default FormArea