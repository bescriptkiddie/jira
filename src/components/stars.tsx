import { Rate } from "antd"

interface starProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckChange?: (checked: boolean) => void
}

export const Star = (props: starProps) => {
  const { checked, onCheckChange, ...restProps } = props
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={num => onCheckChange?.(!!num)}
      {...restProps}
    />
  )
}
