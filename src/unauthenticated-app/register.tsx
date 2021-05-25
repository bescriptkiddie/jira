import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "unauthenticated-app"
import { useAsync } from "utils/use-async"

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({
    repassword,
    ...values
  }: {
    username: string
    password: string
    repassword: string
  }) => {
    if (values.password === repassword) {
      await run(register(values)).catch(e => {
        onError(e)
      })
    } else {
      onError(new Error("两次密码不一样"))
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>

      <Form.Item name="repassword" rules={[{ required: true, message: "请重新输入密码" }]}>
        <Input placeholder="验证密码" type="repassword" id="repassword" />
      </Form.Item>
      <Form.Item name="button">
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
