import { useState, useCallback } from "react"
import { useMountedRef } from "utils"

interface State<D> {
  error: Error | null
  data: D | null
  stat: "idle" | "loading" | "error" | "success"
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
}
const defaultConfig = {
  throwOnError: false,
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })

  const mountedRef = useMountedRef()
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  )
  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: "error",
        error,
      }),
    []
  )

  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise")
      }
      // useCallback 里面进行 setState 也会造成 state 改变,从而导致组件重复渲染
      // 解决办法就是利用 setState 的函数写法,传入参数,preState 这样
      setState(preState => ({ ...preState, stat: "loading" }))
      return promise
        .then(data => {
          if (mountedRef.current) setData(data)
          return data
        })
        .catch(error => {
          // catch 会消化异常,如果不主动抛出,外面是接收不到异常的
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [config.throwOnError, mountedRef, setError, setData]
  )

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  }
}
