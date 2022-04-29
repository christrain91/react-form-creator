import React, { createContext, useContext } from 'react'
import {
  UseFormRegister,
  FieldValues,
  useForm,
  FormState,
  UseFormWatch,
  UseFormHandleSubmit
} from 'react-hook-form'

interface FormContextExport {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  watch: UseFormWatch<FieldValues>
}

const FormContext = createContext<FormContextExport | null>(null)

export const FormContextProvider = (props: { children: React.ReactChild }) => {
  const { register, handleSubmit, watch, formState } = useForm()

  return (
    <FormContext.Provider value={{ register, handleSubmit, watch, formState }}>
      {props.children}
    </FormContext.Provider>
  )
}

export default FormContext
