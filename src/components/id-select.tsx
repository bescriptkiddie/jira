import React from "react"
import { Select } from "antd"
import { toNumber } from "components/lib"

// 还要注意,很多情景下,需要透传select 的属性
type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value?: string | number | null | undefined
  onChange?: (value?: number) => void
  defaultOptionsName?: string
  options?: { name: string; id: number }[]
}

/**
 * value 可以为多种类型
 * onChange 只返回 number|undefined
 * 当 isNaN(Number(value)) 为 true 的时候,代表选择默认类型
 * 当选择默认类型的时候,onChange会回调 undefined
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionsName, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionsName ? <Select.Option value={0}>{defaultOptionsName}</Select.Option> : null}
      {options?.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}
