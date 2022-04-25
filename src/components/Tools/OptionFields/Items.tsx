import React from 'react'
import { IconButton, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'

interface Item {
  value: string
  text: string
}

interface ItemsProps {
  value: Item[] | unknown
  onChange: (value: Item[]) => void
}

const Items = (props: ItemsProps) => {
  const { value } = props as { value: Item[] }

  const handleChange = (item: Item, index: number) => {
    const updatedValue = [...value]
    updatedValue[index] = item
    props.onChange(updatedValue)
  }

  const handleRemove = (index: number) => {
    const updatedValue = [...value]
    updatedValue.splice(index, 1)
    props.onChange(updatedValue)
  }

  return <>
    <InputLabel>
      Items
    </InputLabel>
    <div className="flex flex-col gap-y-2">
      {value.map((item, index) => {
        return <KeyValueItem key={index} item={item} onChange={(item) => handleChange(item, index)} onRemove={() => handleRemove(index)} />
      })}
      <Button onClick={() => props.onChange([...value, { value: '', text: '' }])}>Add Item</Button>
    </div>
  </>
}

interface KeyValueItemProps {
  item: Item
  onChange: (value: Item) => void
  onRemove: () => void
}

const KeyValueItem = (props: KeyValueItemProps) => {
  const { item, onChange } = props

  const onFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const targetValue = event.target.value
    const targetName = event.target.name as 'value' | 'text'
    onChange({ ...item, [targetName]: targetValue })
  }

  return <div className="flex flex-row gap-x-1">
    <TextField name="value" label="Value" value={item.value} onChange={onFieldChange} />
    <TextField name="text" label="Text" value={item.text} onChange={onFieldChange} />
    <IconButton aria-label='Delete Item' onClick={props.onRemove}>
      <DeleteIcon fontSize='inherit' />
    </IconButton>
  </div>
}

export default Items