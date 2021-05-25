// 还可以使用firebase这种auth服务

import { Users } from "screens/project-list"

const localstorageKey = "__auto_provider_token__"
const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localstorageKey)

export const handleUserResponse = ({ user }: { user: Users }) => {
  window.localStorage.setItem(localstorageKey, user.token || "")
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () => await window.localStorage.removeItem(localstorageKey)
