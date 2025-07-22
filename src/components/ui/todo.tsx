
"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Check, Trash } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deletedAt?: number;
}

export function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const now = Date.now();
    const filteredTodos = todos.filter(
      (todo) => !todo.deletedAt || now - todo.deletedAt < 30 * 24 * 60 * 60 * 1000
    );
    if (filteredTodos.length !== todos.length) {
      setTodos(filteredTodos);
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, completed: false },
      ]);
      setInput("");
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deletedAt: Date.now() } : todo
      )
    );
  };

  const handlePermanentDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleRestoreTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const { deletedAt, ...rest } = todo;
          return rest;
        }
        return todo;
      })
    );
  };

  const activeTodos = todos.filter((todo) => !todo.deletedAt);
  const uncompletedTodos = activeTodos.filter((todo) => !todo.completed);
  const completedTodos = activeTodos.filter((todo) => todo.completed);
  const deletedTodos = todos.filter((todo) => todo.deletedAt);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <Button onClick={handleAddTodo}>Add</Button>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Incomplete</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="deleted">Trash</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ul>
              {uncompletedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 rounded-lg"
                >
                  <span
                    onClick={() => handleToggleTodo(todo.id)}
                    className="cursor-pointer flex items-center"
                  >
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full mr-2 flex items-center justify-center">
                      {todo.completed && <Check className="w-4 h-4 text-green-500" />}
                    </div>
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="completed">
            <ul>
              {completedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 rounded-lg"
                >
                  <span
                    onClick={() => handleToggleTodo(todo.id)}
                    className="cursor-pointer flex items-center line-through text-gray-500"
                  >
                    <div className="w-5 h-5 border-2 border-green-500 rounded-full mr-2 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="deleted">
            <ul>
              {deletedTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 rounded-lg"
                >
                  <span className="line-through text-gray-500">
                    {todo.text}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRestoreTodo(todo.id)}
                    >
                      Restore
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePermanentDelete(todo.id)}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
