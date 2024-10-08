import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

   const [todo, setTodo] = useState("")
   const [todos, setTodos] = useState([])
   const [ShowFinished, setShowFinished] = useState(true)


   useEffect(() => {
     let todoString = localStorage.getItem("todos")
     if(todoString){

       let todos = JSON.parse(localStorage.getItem("todos"))
       setTodos(todos)
      }
   }, [])
   

   const saveToLS = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos))
     
   }
   const toggleFinished = (e) => {
     setShowFinished(!ShowFinished)
   }
   


  const handleAdd = () => {
     setTodos( [...todos,{ id:uuidv4(), todo, isCompleted: false}])
     setTodo("")
     console.log(todos)
     saveToLS()
  }
  const handleEdit =  (e, id) => {
    let t  = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    
    setTodos( newTodos)
    saveToLS()

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    
    setTodos( newTodos)
    saveToLS()


  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox =  (e) => {
   
    let id = e.target.name
    console.log( `The id is ${id}`)
    let index = todos.findIndex(item =>{
      return  item.id === id;
    })
    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos( newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto md:w-2/3 w-full  my-5 p-5 rounded-xl bg-violet-200 min-h-screen">
      <h1 className="font-bold text-center text-2xl">iTask- Manage Your Todos at one Place!</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={ShowFinished} />Show Finished
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No Todos</div>}
          {todos.map(item =>{

      return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
           <div className="flex gap-5">
            <input  onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-800 hover:bg-violet-900 text-white text-sm font-bold p-2 py-1 rounded-md mx-1"><FaEdit /></button>
              <button onClick={(e) =>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-900 text-white text-sm font-bold p-2 py-1 rounded-md mx-1"><MdDelete /></button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  );
}

export default App;
