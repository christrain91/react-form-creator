import React from 'react'
import { ChangeEventHandler, useState, FormEventHandler } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FieldProps, Tool, ToolInstance } from 'types/index'
import Alert from '@mui/material/Alert'
import { cloneDeep } from 'lodash'

interface ToolNameDialogProps {
  pendingTool: {
    tool: Tool<any>
    index?: number
    parent?: string
  } | null
  onClose: () => void
  onAdd: (
    tool: ToolInstance<any>,
    index?: number,
    parent?: string
  ) => true | string
}

const ToolNameDialog = (props: ToolNameDialogProps) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { tool, index, parent } = props.pendingTool || {}

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if (!tool || !name) return
    const result = props.onAdd(
      { ...cloneDeep(tool), name, parent, children: [] },
      index,
      parent
    )

    if (result === true) {
      onClose()
    } else {
      setError(result)
    }
  }

  const onClose = () => {
    setName('')
    setError('')
    props.onClose()
  }

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
    setError('')
  }

  if (!tool) return null

  return (
    <Dialog
      open={!!tool}
      onClose={onClose}
      maxWidth="xs"
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>Add {tool.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a unique name for the {tool.title.toLowerCase()} you want to
            add to the page.
          </DialogContentText>
          <div className="flex flex-col gap-y-4">
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              error={!!error}
              autoFocus
              margin="dense"
              label="Field Name"
              type="text"
              variant="standard"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            disabled={!name || !!error}
          >
            Add Tool
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ToolNameDialog
