import React from 'react'

export const TodoForm = ({addTodo,todos, edit, editTodoValue,setValue,value, setEdit}) => {

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
      };

    const editSubmit = (e) => {
      console.log(todos)
      let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Months are zero-based, so we add 1
        let year = today.getFullYear();

        // Format the date as "dd/mm/yyyy"
        let todoDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

        e.preventDefault();
        for(let i=0; i<todos.length; i++){
          if(todos[i].id === editTodoValue){
            todos[i].task = value
            todos[i].dates = todoDate
          }
        }
        setEdit(false)
        localStorage.setItem('todos', JSON.stringify(todos));
        setValue('');
      };
  return (
    <form className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
    {!edit &&<button type="submit" className='todo-btn' onClick={handleSubmit}>Add Task</button>}
    {edit && <button type="submit" className='todo-btn' onClick={editSubmit}>Edit Task</button>}
  </form>
  )
}
