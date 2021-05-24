import { useEffect } from "react"
import { Projects } from "screens/project-list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Projects>) => {
  const http = useHttp()
  const { run, ...res } = useAsync<Projects[]>()

  useEffect(() => {
    run(http("projects", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return res
}
