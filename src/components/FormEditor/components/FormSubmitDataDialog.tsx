import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

interface FormSubmitDataDialogProps {
  open: boolean
  title: string
  data: Record<string, unknown> | null
  onClose: () => void
}

const FormSubmitDataDialog = (props: FormSubmitDataDialogProps) => {
  return <Dialog fullWidth open={props.open} onClose={props.onClose}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <pre className="p-6 m-1 rounded-xl bg-slate-200">
        {JSON.stringify(props.data || {}, null, 2)}
      </pre>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={props.onClose}>Close</Button>
    </DialogActions>
  </Dialog>
}

export default FormSubmitDataDialog