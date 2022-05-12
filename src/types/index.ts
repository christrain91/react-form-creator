export type AlignmentValue = 'left' | 'center' | 'right' | 'justify'

export type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type FlexJustify =
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly'

export interface SelectorItem {
  value: string
  text: string
}
