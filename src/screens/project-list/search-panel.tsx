import React from "react"
import { Users } from "screens/project-list/index"

interface SearchPanelProps {
    users: Users[]
    param: {
        name: string
        personId: string
    }
    setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
    const { param, setParam, users } = props
    return (
        <form>
            <div>
                {/* setParam(object.assign({},param,{name:evt.target.name})) */}
                <input
                    type="text"
                    value={param.name}
                    onChange={evt =>
                        setParam({
                            ...param,
                            name: evt.target.value,
                        })
                    }
                />
                <select
                    value={param.personId}
                    onChange={evt =>
                        setParam({
                            ...param,
                            personId: evt.target.value,
                        })
                    }
                >
                    <option value={""}>负责人</option>
                    {users?.map((user: any) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    )
}
