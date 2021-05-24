import { Users } from "screens/project-list"
import { useMount } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useUsers = (param?: Partial<Users>) => {
  const http = useHttp()
  const { run, ...res } = useAsync<Users[]>()

  useMount(() => {
    run(http("users"))
  })
  return res
}
