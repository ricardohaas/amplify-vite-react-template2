import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { CheckboxField } from '@aws-amplify/ui-react';


const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

function createChat() {
    client.models.Chat.create({ name: window.prompt("Todo content") });
}

function toggleIsDone(todo: Schema["Todo"]["type"]) {
    console.log(todo);
    // Toggle isDone state and update the backend
    client.models.Todo.update({
        id: todo.id,
        isDone: !todo.isDone
    });
}


  return (
      <main>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>


          <ul>
              {todos.map((todo) => (
                  <li key={todo.id}>{todo.content} <CheckboxField
                      label="Subscribe"
                      name="subscribe"
                      value="yes"
                      onChange={() => toggleIsDone(todo)}
                  /></li>
              ))}
          </ul>

          <hr/>

          <button onClick={createChat}>+ new chat</button>


          <div>
              🥳 App successfully hosted. Try creating a new todo.
              <br/>
              <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                  Review next step of this tutorial hey.
              </a>
          </div>
      </main>
  );
}

export default App;
