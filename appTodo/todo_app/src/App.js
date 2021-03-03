import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, InputLabel, Input, FormControl } from "@material-ui/core";
import Todo from "./Todo.js";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(snapshot.docs.map((doc) => doc.data().todo));
      });
  }, []);
  //when the app loads. we need to listen to db and fetch new todos as they get added/removed

  const addTodo = (event) => {
    event.preventDefault(); // will stop refreshing your page everytime

    //when you add something in Todo list it automatically adds in firebase db.
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]); //...todos is already in useState array and input is
    // new todo u r adding in input box
    setInput(""); // this clears up the input box everytime
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      {/* using your useState {input} value in input below */}
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input} //if user clicks add button without entering any value, it prevents adding empty
          //list to array
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>
      {/* <button type="submit" onClick={addTodo}>
        Add Todo
      </button> */}

      <ul>
        {todos.map((todo) => (
          //<li>{todo}</li> // created a new Functional component for Todo input as Todo.js
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
