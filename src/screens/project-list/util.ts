import { useMemo } from "react"
import { useUrlQueryParams } from "utils/url"
import { useProjects } from "utils/project"

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
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams(["editingProjectId"])

  const { data: editingProject, isLoading } = useProjects({ id: Number(editingProjectId) })
  console.log("Number(editingProjectId)", Number(editingProjectId), "data", editingProject)
  const open = () => {
    setProjectCreate({ projectCreate: true })
  }
  const close = () => {
    setProjectCreate({ projectCreate: undefined })
    setEditingProjectId({ editingProjectId: undefined })
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  return {
    // 因为从url里面获取的是字符串
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }
}
