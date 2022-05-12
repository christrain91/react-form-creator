import { useFormValue } from '@pcs/react-form-creator-core'

function useFileViewCount(name: string) {
  const value = useFormValue(name) as { file: File | null }[] | undefined
  if (!value) return 1
  return value.filter((v) => !!v.file).length + 1
}

export default useFileViewCount
