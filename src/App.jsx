import { useState, useRef } from 'react';
import './App.css';
import ReactiveButton from 'reactive-button';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', priority: ''});
  const [todos, setTodos] = useState([]);
  const [state, setState] = useState('idle');
  

  const gridRef = useRef(null);

  const onClickHandler = () => {
    setState('loading');

    setTimeout(() => {
      setState('success');
      addTodo();
    }, 2000);
  };

  // Column defs
  const columnDefs = [
    { field: 'description', sortable: true, filter: true, suppressMovable: true },
    { field: 'date', sortable: true, filter: true, suppressMovable: true },
    { field: 'priority', sortable: true, filter: true, suppressMovable: true },
  ];

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', priority: ''});
  };

 // Nodet poistamis- toimintoa varten Grid API avulla
  const deleteSelectedTodos = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes(); 
    const selectedData = selectedNodes.map(node => node.data); 

    setTodos(todos.filter(todo => !selectedData.includes(todo))); 
  };

  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <input placeholder="Priority" name="priority" value={todo.priority} onChange={inputChanged}/>

      <ReactiveButton
        rounded
        color="secondary"
        buttonState={state}
        idleText="Add task"
        loadingText="Loading"
        successText="Added!"
        size="small"
        onClick={onClickHandler}
      />

      <ReactiveButton
        rounded
        color="secondary"
        idleText="Delete"
        loadingText="Deleting..."
        successText="Deleted!"
        size="small"
        onClick={deleteSelectedTodos} 
      />

      <div className="ag-theme-material" style={{height: 400, width: 600}}>
        <AgGridReact
          ref={gridRef} 
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single" 
          floatingFilter={true}
          animateRows={true}

          // lähteet: https://www.npmjs.com/package/reactive-button
          // https://cssgradient.io/
          // https://www.ag-grid.com/react-data-grid/getting-started/#filtering
          // https://www.ag-grid.com/javascript-data-grid/grid-api/

        />
      </div>
    </>
  );
}

export default App;
