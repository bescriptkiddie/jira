import React, { ReactNode, useState } from "react"
import * as auth from "auth-provider"
import { Users } from "screens/project-list"
import { http } from "utils/http"
import { useMount } from "utils/index"

interface AuthForm {
  username: string
  password: string
}

const initUser = async () => {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await http("me", { token })
    user = data.user
  }
  return user
}
const AuthContext =
  React.createContext<
    | {
        user: Users | null
        register: (form: AuthForm) => Promise<void>
        login: (form: AuthForm) => Promise<void>
        logout: () => Promise<void>
      }
    | undefined
  >(undefined)
AuthContext.displayName = "AuthContext"

// 就是一个全局的状态管理
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    initUser().then(setUser)
  })
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("在AuthProvider中使用")
  }
  return context
}
