import axios from 'axios';
import React, { useState } from 'react'
import {MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank}  from 'react-icons/md'


export default function Table({todos, setTodos}) {
  const circumio_url="https://y0m-reliable-geiger.circumeo-apps.net/api/todos/"
  const devlopment_url= "http://127.0.0.1:9000"

  const [editText, setEditText]= useState({
    body: "",
  })

   // Function to format the date
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const deleteTodo= async (id) =>{
    try {
      await axios.delete(`${circumio_url}${id}`)
      const new_todo= todos.filter((todo) => todo.id !== id)
      setTodos(new_todo)

    } catch (error) {
     console.log("Failed to delete", error); 
    }
  }

  const handleEdit= async (id, value) => {
    try {
      const response= await axios.patch(`${circumio_url}${id}/`, value)
      const newTodo= todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodo)
    } catch (error) {
      
    }
  }


  const handleCheckBox= async (id, value) => {
    handleEdit(id, {
      "completed": !value
    })
  }


  const handleChange= (e)=>{
    setEditText((prev)=> ({
      ...prev, 
      body: e.target.value
    }))
    console.log(editText);
  }


  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'body': ""
    })
  }

  
  return (
    <div className='py-5'>
        <table className='w-11/12 max-w-4xl text-center border-2'>
            <thead className='border-b-2 border-black'>
                <tr>
                    <th className='p-3 font-semibold'>Checkbox</th>
                    <th>Todo</th>
                    <th>Status</th>
                    <th>Data Created</th>
                    <th>Action</th>
                </tr>
            </thead>


            <tbody>
            {
              todos? todos.map((todo)=> (
                <tr className='text-sm border-b border-blue-300' key={todo.id}>
                    <td className='p-3 flex justify-center'>
                        <span className='text-xl cursor-pointer' onClick={() => handleCheckBox(todo.id, todo.completed)}>{todo.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />} </span>
                    </td>
                    <td>{todo.body}</td>
                    <td>
                        <span className={`rounded-md ${todo.completed ? "bg-green-300" : "bg-red-300"} p-1.5`}>{todo.completed ? "Completed": "Not completed"}</span>
                    </td>
                    <td>{formatDate(todo.created)}</td>
                    <td className='justify-center flex p-3'>
                        <span className='text-xl px-1 cursor-pointer'>
                          {/* The button to open modal */}
                        <label htmlFor="my_modal_6" className="btn"><MdEditNote onClick={()=> setEditText(todo)} /></label>
                          </span>
                        <span className='text-xl px-1 cursor-pointer m-auto'><MdOutlineDeleteOutline onClick={()=> deleteTodo(todo.id)} /></span>
                    </td>
                </tr>
              ))

              :

              <h2>No todos available</h2>
            }
            </tbody>
            
            
        </table>

        

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Todo</h3>
            <input onChange={handleChange} value={editText.body} type="text" placeholder="Type here" className="input input-bordered w-full mt-6" />
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">Close!</label>
              <label onClick={handleClick} htmlFor="my_modal_6" className="btn btn-primary">Edit</label>
            </div>
          </div>
        </div>


    </div>
  )
}
