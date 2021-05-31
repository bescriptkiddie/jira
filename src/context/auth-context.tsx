import React, { ReactNode, useCallback } from "react"
import * as auth from "auth-provider"
import { Users } from "screens/project-list"
import { http } from "utils/http"
import { useMount } from "utils/index"
import { FullPageErrorFallback, FullPageLoading } from "components/lib"
import { useAsync } from "utils/use-async"
import { useDispatch, useSelector } from "react-redux"
import * as authStore from "store/auth.slice"

export interface AuthForm {
  username: string
  password: string
}

export const initUser = async () => {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await http("me", { token })
    user = data.user
  }
  return user
}

// 就是一个全局的状态管理
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<Users | null>(null)
  const { error, isLoading, isIdle, run } = useAsync<Users | null>()
  const dispatch: (...args: unknown[]) => Promise<Users> = useDispatch()

  useMount(() => {
    run(dispatch(authStore.init()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (error) {
    return <FullPageErrorFallback error={error} />
  }

  return <>{children}</>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<Users> = useDispatch()

  // login({username:'pika', password:'123'}) 的时候并没有返回一个Promise 所以要对其类型进行指定
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  const user = useSelector(authStore.selectUser)
  return {
    login,
    register,
    logout,
    user,
  }
}
