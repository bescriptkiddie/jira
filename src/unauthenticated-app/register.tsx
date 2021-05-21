import React, { FormEvent } from "react"
import { useAuth } from "context/auth-context"
import { Button, Form, Input } from "antd"

export const RegisterScreen = () => {
  const { register, user } = useAuth()

  const handleSubmit = (value: any) => {
    // event.preventDefault()
    // const username = (document.getElementById("username") as HTMLInputElement).value
    // const password = (document.getElementById("password") as HTMLInputElement).value
    const username = value.username
    const password = value.password
    register({ username, password })
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item name="button">
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}