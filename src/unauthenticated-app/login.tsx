import React, { FormEvent } from "react"
import { useAuth } from "context/auth-context"

export const LoginScreen = () => {
  const { login, user } = useAuth()

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault()
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>logined~~{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  )
}
