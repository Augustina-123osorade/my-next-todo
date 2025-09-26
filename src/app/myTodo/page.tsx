"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function MyTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: { todo: "" },
    onSubmit: async ({ value }) => {
      if (editingId) {
        // update
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === editingId ? { ...todo, text: value.todo } : todo
          )
        );
        setEditingId(null);
      } else {
        // add
        const newTodo: Todo = {
          id: Date.now(),
          text: value.todo,
          completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
      }
      form.reset();
    },
  });

  const handleEdit = (todo: Todo) => {
    form.setFieldValue("todo", todo.text);
    setEditingId(todo.id);
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      form.reset();
    }
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6 px-4">
      <h1 className="text-2xl font-bold">Todo List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex gap-2 items-start"
      >
        <form.Field
          name="todo"
          validators={{
            onChange: ({ value }) =>
              !value.trim() ? "Todo cannot be empty" : undefined,
          }}
        >
          {(field) => (
            <div className="w-full">
              <Input
                placeholder="Enter todo"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors?.[0] && (
                <p className="text-sm text-red-500 mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>
        <Button type="submit">{editingId ? "Update" : "Add"}</Button>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 border rounded bg-white"
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(todo)}>
                <MdEdit />
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(todo.id)}
              >
                <MdDeleteOutline />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Back button */}
      <div className="flex justify-center">
        <Button
          className="dark bg-black text-white"
          variant="outline"
          onClick={() => router.push("/todo")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
