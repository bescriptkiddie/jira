import React, { FormEvent } from "react"

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault()
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    login({ username, password })
  }
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async response => {
      if (response.ok) {
      }
    })
  }
  return (
    <form id="test" onSubmit={handleSubmit}>
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
