import React, { FormEvent } from "react"
import { useAuth } from "context/auth-context"

export const RegisterScreen = () => {
  const { register, user } = useAuth()

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault()
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    register({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  )
}
