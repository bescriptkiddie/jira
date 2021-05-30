import { Dropdown, Menu, Table, TableProps } from "antd"
import React from "react"
import { Users, Projects } from "screens/project-list/index"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Star } from "components/stars"
import { useEidtProject } from "utils/project"

interface ListProps extends TableProps<Projects> {
  users: Users[]
  setProjectModalOpen?: (isOpen: boolean) => void
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEidtProject()
  const starProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin })
  }

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Star checked={true} disabled={true} />,
          render: (projects: Projects) => {
            return <Star checked={projects.pin} onCheckChange={starProject(projects.id)} />
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (projects: Projects) => {
            return <Link to={String(projects.id)}>{projects.name}</Link>
          },
        },
        {
          title: "部门",
          key: "organization",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          key: "personId",
          render: (projects: Projects) => {
            return (
              <span>
                {users.find((user: Users) => user.id === projects.personId)?.name || "无"}
              </span>
            )
          },
        },
        {
          title: "创建时间",
          key: "created",
          render: (projects: Projects) => {
            return (
              <span>{projects.created ? dayjs(projects.created).format("YYYY-MM-DD") : "无"}</span>
            )
          },
        },
        {
          title: "操作",
          render: () => {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"layout"}>
                      {/* <span onClick={() => props.setProjectModalOpen}>新建</span> */}
                      <span onClick={() => props.setProjectModalOpen?.(true)}>编辑</span>
                    </Menu.Item>
                  </Menu>
                }
              >
                <span>...</span>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
