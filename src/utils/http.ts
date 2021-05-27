import qs from "qs"
import * as auth from "auth-provider"
import { useAuth } from "context/auth-context"
import { useCallback } from "react"

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Context-Type": data ? "application/json" : "",
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data)
  }

  // axios 不同, 在状态不为2xx的时候,抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: "请重新登录" })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  // Parameters 是一个工具类型, Utility type => 通过泛型最type or interface进行操作
  /**
   * Partial<interface |type> 在维持原类型的情况下,将必选变成可选
   * type Partial<T> = { [P in keyof T]?: T[P] | undefined; } 遍历了T中的key,然后添加一个?
   * Omit<interface or type,'其中的属性'|'其中的属性2'> 删除 interfeace 中的某个属性
   * type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
   * exclude 在 T 中,将 K 变成 never
   */
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
