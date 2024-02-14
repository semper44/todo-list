import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";

const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];


export const TodoWrapper = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(savedTodos);
  const [status, setStatus] = useState('');
  const [editTodoValue, setEditTodoValue] = useState('');
  const [flashMessagesShow, setFlashMessagesShow] = useState(false);
  const [flashMessagesDeleteShow, setFlashMessagesDeleteShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const addTodo = (todo) => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // Months are zero-based, so we add 1
    let year = today.getFullYear();

    // Format the date as "dd/mm/yyyy"
    let todoDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, dates:todoDate },
    ]);
    setStatus('added')
   
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));

  },[todos])

  const deleteTodo = (id) => {setTodos(todos.filter((todo) => todo.id !== id)); setStatus('deleted')
    };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id, task) => {
    setEditTodoValue(id)
    setEdit(true)
    setValue(task)
  }


  useEffect(()=>{
    if(status==='added'){
      setFlashMessagesShow(true)
      setTimeout(function() {
      setFlashMessagesShow(false)
      }, 3000);
    }else if(status==='deleted') {
      setFlashMessagesDeleteShow(true)
      setTimeout(function() {
      setFlashMessagesDeleteShow(false)
    }, 3000);
    }
  },[status, todos])

  return (
    <>
      {(!flashMessagesShow &&  !flashMessagesDeleteShow) &&<div className='empty'>Empty</div>}
     {flashMessagesShow &&<div className={status==='added'?"flasmessages":'flasmessagedeleted'}>Added Successfully!</div>}
     {flashMessagesDeleteShow &&<div className={status==='added'?"flasmessages":'flasmessagedeleted'}>Deleted Successfully!</div>}
    <div className="TodoWrapper">
      <h1>Add Your Schedules</h1>
      <TodoForm addTodo={addTodo} edit={edit} todos={todos} 
      editTodoValue={editTodoValue} value={value} setEdit={setEdit}
      setValue={setValue}
 />
      {/* display todos */}
      {todos.map((todo) =>
        // todo.isEditing ? (
        //   <EditTodoForm editTodo={editTask} task={todo} />
        // ) : (
          <Todo
            setEditTodoValue={setEditTodoValue}
            editTodoValue={editTodoValue}
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
      )}
    </div>
    </>
  );
};
