import React from "react"
import { Users } from "screens/project-list/index"
import { Form, Input, Select } from "antd"

interface SearchPanelProps {
  users: Users[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props
  return (
    <Form>
      <div style={{ display: "flex" }}>
        {/* setParam(object.assign({},param,{name:evt.target.name})) */}
        <Input
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users?.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </div>
    </Form>
  )
}
