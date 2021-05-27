import React from "react"
import { Projects, Users } from "screens/project-list/index"
import { Form, Input } from "antd"
import { UserSelect } from "components/user-select"

interface SearchPanelProps {
  users: Users[]
  param: Partial<Pick<Projects, "name" | "personId">>
  setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam } = props
  return (
    <Form layout={"inline"}>
      <Form.Item>
        {/* setParam(object.assign({},param,{name:evt.target.name})) */}
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionsName={"负责人"}
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value,
            })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}
