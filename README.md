# React Form Creator MUI

React components for building and rendering user created forms, this is the Material UI version that uses tools and UI built using <https://github.com/mui/material-ui>

## Installation

Install via NPM with:

```bash
npm install @pcs/react-form-creator-mui
```

Install via Yarn with:

```bash
yarn add @pcs/react-form-creator-mui
```

## Usage

This library has two main components, the `FormEditor` and the `FormRenderer`. The `FormEditor` is used for creating/editing forms and the `FormRenderer` is used to display the created forms.

### Form Editor

Here is an example of using the FormEditor component

```typescript
  import { FormEditor, tools } from '@pcs/react-form-creator-mui'

const Main = () => {
  return <FormEditor
    tools={tools}
    header={Header} // This is a header component that will render above the form, it takes onSave as a prop which when called with a modifier function (where you can add any extra data) called onSave at the FormEditor level with the returned data.
    initialValue={{ // Initial value can contain any data (must must at the minimum contain an array of form items), this data gets passed down to the Header component specified above
      items: [{
        toolType: 'header', // This must match the toolType of one of the tools passed into the editor
        name: 'first_header'
        options: {
          content: 'My First Header',
          headerType: 'h2',
          align: 'center'
        },
      }]
    }}
  />
}
```

#### Custom Header Component

You can specify a custom header component that requests extra data from the user, so for example below we ask that the form is given a name.

```typescript
import { useState, useEffect } from 'react'
import { FormStructure } from '@pcs/react-content-creator-mui'

export interface FormWithName extends FormStructure {
  name: string
}

interface HeaderProps {
  initialValue: FormWithName
  onSave: (formatData: (data: Pick<FormWithName, 'items'>) => FormWithName) => void
}

const Header = (props: HeaderProps) => {
  const initialValueName = props.initialValue.name
  const [name, setName] = useState(initialValueName)

  useEffect(() => setName(initialValueName), [initialValueName])

  const onSave = () => {
    props.onSave(form => ({
      ...form,
      name
    }))
  }

  return <div className="flex content-center gap-x-2 mb-2">
    <TextField name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <Button variant="contained" color="success" onClick={onSave}>Save</Button>
  </div>
}
```

### Form Renderer

A form renderer displays a form that was created in the editor so that it can be filled in and submitted. The form renderer component can be used like this:

```typescript
import { FormRenderer, tools } from '@pcs/react-form-creator-mui'

const items = [{
    toolType: 'header',
    name: 'header_1',
    options: {
      content: 'Form Title'
    }
  }, {
    toolType: 'paragraph',
    name: 'paragraph_1',
    options: {
      content: 'This is the contents of the first paragraph'
    }
}]

const Main = () => {
  return <FormRenderer className="h-screen" tools={tools} initialValue={{ name: 'My Form', items }} />
}

export default Main
```
