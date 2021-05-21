import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "unauthenticated-app"

export const LoginScreen = () => {
  const { login, user } = useAuth()

  const handleSubmit = (value: any) => {
    // event.preventDefault()
    // const username = (document.getElementById("username") as HTMLInputElement).value
    // const password = (document.getElementById("password") as HTMLInputElement).value
    const username = value.username
    const password = value.password
    login({ username, password })
  }

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>logined~~{user?.name}</div> : null}
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item name="button">
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
