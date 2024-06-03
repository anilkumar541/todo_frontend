import axios from "axios";
import React, { useState } from "react";

export default function TodoForm({ fetchTodoData }) {
  const circumio_url="https://y0m-reliable-geiger.circumeo-apps.net/api/todos/"
  const devlopment_url= "http://127.0.0.1:9000"

  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const createNewTodo = async (e) => {
    try {
      await axios.post(`${circumio_url}`, newTodo);
      setNewTodo({
        body: ""
      })
      fetchTodoData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-8">
      <input
        onChange={handleChange}
        value={newTodo.body}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            createNewTodo();
          }
        }}
        type="text"
        placeholder="Add todo"
        className="input input-bordered input-info w-full max-w-xs"
      />
      <button className="btn btn-primary mx-2" onClick={createNewTodo}>
        Add
      </button>
    </div>
  );
}
