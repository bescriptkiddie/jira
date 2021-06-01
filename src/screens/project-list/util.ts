import { useMemo } from "react"
import { useUrlQueryParams } from "utils/url"

export const useProjectsParams = () => {
  // 这里的时候,更多地希望,传入的是固定的键值  -> 所以需要对 useUrlQueryParams 进行约束
  // setParam({ username: "pika" })
  const [param, setParam] = useUrlQueryParams(["name", "personId"])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams(["projectCreate"])
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: undefined })

  return {
    // 因为从url里面获取的是字符串
    projectModalOpen: projectCreate === "true",
    open,
    close,
  }
}
