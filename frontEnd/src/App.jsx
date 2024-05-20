import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [Haserror, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:7000/task")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setTasks(res.data);
      })
      .catch((error) => {
        setHasError(true);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function addTask(newTask) {
    axios
      .post("http://localhost:7000/task", {
        name: newTask,
        description: "no description",
      })
      .then((res) => {
        console.log("Task added with success");
        setTasks([...tasks, res.data.task]);
      })
      .catch((e) => {
        console.log("error has arrived");
      });
  }

  function removeTask(id) {
    axios
      .delete(`http://localhost:7000/task/${id}`)
      .then((res) => {
        console.log("Task removed with success", res.data);
        // setTasks(tasks.filter((task, index) => index !== id));
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((e) => {
        console.log("error has arrived");
      });
  }

  return (
    <main>
      <NavBar />
      <div className="text-center p-10 max-w-[1176px] mx-auto">
        <h1 className="font-bold text-xl">TO DO LIST</h1>
        <div className="border-b-2 p-2"></div>
        <div className="mt-7">
          <input
            type="txt"
            className="border-black border rounded-lg p-2"
            placeholder="add item..."
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <button
            onClick={() => {
              addTask(value);
            }}
            className="bg-blue-500 p-2 text-white text-center rounded-md ml-6"
            type="submit"
          >
            ADD
          </button>
        </div>
        {!loading ? (
          <div
            className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-2 border-gray-500"
            id="task-container"
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task._id} className="flex border p-6 justify-between">
                  <div>{task.name}</div>
                  <div className="flex ">
                    <button
                      onClick={() => {
                        removeTask(task._id);
                      }}
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                    >
                      Delete
                    </button>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-lg text-left text-red-600">No task</div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}

export default App;
