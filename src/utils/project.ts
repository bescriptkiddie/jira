import { useMutation, useQuery, useQueryClient } from "react-query"
import { Projects } from "screens/project-list"
// import { cleanObject } from "utils"
import { useHttp } from "./http"

export const useProjects = (param?: Partial<Projects>) => {
  const http = useHttp()
  // const { run, ...res } = useAsync<Projects[]>()
  // const fetchProject = useCallback(
  //   () => http("projects", { data: cleanObject(param || {}) }),
  //   [http, param]
  // )
  // useEffect(() => {
  //   run(fetchProject())
  // }, [param, run, fetchProject])
  // return res

  // 利用 useQuery 第一个参数可以传入一个数组 代表着key
  return useQuery<Projects[]>(["projects", param], () => http("projects", { data: param }))
}

export const useEditProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (param: Partial<Projects>) =>
      http(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  )
  // const { run, ...asyncResults } = useAsync()
  // const mutate = async (params: Partial<Projects>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   )
  // }
  // return {
  //   mutate,
  //   ...asyncResults,
  // }
}

export const useAddProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (param: Partial<Projects>) =>
      http(`projects`, {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  )
}
// 因为 hooks 不可以在逻辑语句里面运用, 所以这个时候需要生成一个闭包, 返回一个回调函数
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

export const useGetProjects = (id?: number) => {
  const http = useHttp()
  return useQuery<Projects>(["projcet", { id }], () => http(`projcet/${id}`), { enabled: !!id })
}
