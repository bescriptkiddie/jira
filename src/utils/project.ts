import { useCallback, useEffect } from "react"
import { Projects } from "screens/project-list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Projects>) => {
  const http = useHttp()
  const { run, ...res } = useAsync<Projects[]>()

  const fetchProject = useCallback(
    () => http("projects", { data: cleanObject(param || {}) }),
    [http, param]
  )

  useEffect(() => {
    run(fetchProject())
  }, [param, run, fetchProject])

  return res
}

// 因为 hooks 不可以在逻辑语句里面运用, 所以这个时候需要生成一个闭包, 返回一个回调函数
export const useEidtProject = () => {
  const { run, ...asyncResults } = useAsync()
  const client = useHttp()
  const mutate = async (params: Partial<Projects>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    )
  }
  return {
    mutate,
    ...asyncResults,
  }
}

// export const useAddProject = () => {
//   const { run, ...asyncResults } = useAsync()
//   const client = useHttp()
//   const mutate = (params: Partial<Projects>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "POST",
//       })
//     )
//   }
//   return {
//     mutate,
//     ...asyncResults,
//   }
// }
