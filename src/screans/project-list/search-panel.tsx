import React, { useEffect, useState } from "react";

export const SearchPanel = ({ param, setParam, users }) => {
  return (
    <form>
      <div>
        {/* setParam(object.assign({},param,{name:evt.target.name})) */}
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        />
        {users.map((user) => (
          <option key={user} value={user.id}>
            {user.name}
          </option>
        ))}
      </div>
    </form>
  );
};
