import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function App() {
  const [todo, setTodo] = useState([]);
  const addtodo = useRef()


  useEffect(() => {
    getUser()
  }, [])

  // Get User Start
  const getUser = () => {
    axios.get('http://localhost:3000/api/v1/users')
      .then((res) => {
        setTodo(res.data)
        console.log(res.data)
      }).catch((err) => {
        console.log(err);
      })
    // console.log(todo);
  }
  // Get User End


  // Add User Function Start
  const addTodo = (event) => {
    event.preventDefault();
    {
      addtodo.current.value.trim() === "" ? alert('Enter Todo') :
        axios.post('http://localhost:3000/api/v1/users', {
          title: addtodo.current.value
        }).then((res) => {
          // console.log(res);
          getUser()
          addtodo.current.value = '';
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  // Add User Function End

  // Delete Todo Start
  const delet = (id) => {
    // console.log(id);
    axios.delete(`http://localhost:3000/api/v1/users/${id}`)
      .then((res) => {
        console.log(res);
        getUser()
      }).catch((error) => {
        console.log(error);
      })
  }
  // Delete Todo Delete


  // Edit Todo Start
  const edit = (id) => {
    // console.log(id);
    const updateTitle = prompt('Enter Update Todo');
    console.log(updateTitle);
    axios.put(`http://localhost:3000/api/v1/users/${id}`, {
      title: updateTitle
    })
      .then((res) => {
        console.log(res);
        getUser()
      }).catch((error) => {
        console.log(error);
      })
  }
  // Edit Todo End




  return (
    <>

      <form onSubmit={addTodo}  >
        <h1 className='text-center mt-[2%] text-[30px]'>Todo</h1>
        <div className='text-center mt-[1%]'>
          <input className='border border-black p-[5px] w-[50%] outline-none ' type="text" placeholder='Enter Todo' ref={addtodo} />
          <button type='submit' className='p-[5px] border border-black'>Add Todo</button>
        </div>

      </form>








      {todo.length > 0 ? (
        todo.map((item) => (
          <div className='flex items-center justify-evenly mt-[2%]' key={item.id}>
            <h3>{item.title}</h3>
            <div className='flex gap-6'>
              <button onClick={() => edit(item.id)} className='border border-black  py-2 px-5'>Edit</button>
              <button onClick={() => delet(item.id)} className='border border-black  py-2 px-5'>delete</button>
            </div>
          </div>
        ))
      ) : (
        <h1 className='text-center mt-[2%] text-[30px] font-[900]'>No todo Found!!</h1>
      )}


    </>
  )
}

export default App