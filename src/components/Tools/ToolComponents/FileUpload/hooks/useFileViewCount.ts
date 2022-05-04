import useFormValue from 'hooks/useFormValue'

function useFileViewCount(name: string) {
  const value = useFormValue(name) as { file: FileList }[]
  const valueLength = (value || []).filter(
    (item) => item.file.length > 0
  ).length

  return valueLength + 1
}

export default useFileViewCount
