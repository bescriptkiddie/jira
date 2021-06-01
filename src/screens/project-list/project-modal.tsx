import { Button, Drawer, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { UserSelect } from "components/user-select"
import { useEffect } from "react"
import { useProjectModal } from "screens/project-list/util"
import { useEditProject, useAddProject } from "utils/project"
import { ErrorBox } from "components/lib"

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const title = editingProject ? "编辑项目" : "创建项目"

  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
  const [form] = useForm()

  const onFinish = (values: any) => {
    mutateAsync({
      ...editingProject,
      ...values,
    }).then(() => {
      form.resetFields()
      close()
    })
  }
  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form form={form} layout={"vertical"} style={{ width: "40rem" }} onFinish={onFinish}>
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "输入项目名" }]}
            >
              <Input placeholder={"请输入项目名称"} />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "输入部门名" }]}
            >
              <Input placeholder={"请输入部门名称"} />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOptionsName={"负责人"} />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type={"primary"} htmlType={"submit"}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
