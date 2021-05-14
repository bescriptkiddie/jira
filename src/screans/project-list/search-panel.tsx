import React from "react"

export const SearchPanel = (props: any) => {
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
