import { useEffect, useState } from 'react'
import Table from './components/table/Table'
import TodoForm from './components/todo_form/TodoForm'
import axios from 'axios'

function App() {
  const circumio_url="https://y0m-reliable-geiger.circumeo-apps.net/api/todos/"
  const devlopment_url= "http://127.0.0.1:9000"
  const [todos, setTodos] = useState()
  const [loading, setIsloading]= useState(true)

  const fetchTodoData= async ()=>{
    try{
      const response= await axios.get(`${circumio_url}`)
      setTodos(response.data)
      setIsloading(false)

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchTodoData()
  }, [])

  return (
    <>
      <div className='bg-indigo-100'>
        <div className='py-6 text-center'>
            <h1>Todo List</h1>
        </div>

        <TodoForm fetchTodoData={fetchTodoData} />
        <Table todos= {todos} setTodos={setTodos} loading={loading} fetchTodoData={fetchTodoData} />

      </div>
    </>
  )
}

export default App
