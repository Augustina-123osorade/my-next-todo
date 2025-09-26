"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchTodos } from "@/lib/api";
import { RiHourglass2Fill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function TodoList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos", search],
    queryFn: async () => {
      const allTodos = await fetchTodos();
      return allTodos.filter((todo: Todo) =>
        todo.todo.toLowerCase().includes(search.toLowerCase())
      );
    },
  });

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600 py-4">
        Error: Something went wrong
      </p>
    );

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const displayedTodos = todos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Search Input */}
      <Input
        className="border p-2 rounded w-full sm:w-1/2 mb-4"
        placeholder="Search todos"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Todo List */}
      <ul className="space-y-2">
        {displayedTodos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="p-3 border rounded bg-white flex justify-between items-center"
          >
            <Link
              href={`/todo/${todo.id}`}
              className="text-black hover:underline"
            >
              {todo.todo}
            </Link>
            <span className="text-sm text-gray-600">
              {todo.completed ? <GiCheckMark /> : <RiHourglass2Fill />}
            </span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Create Todo */}
      <div className="flex justify-center">
        <Link href="/myTodo">
          <Button className="mb-4">+ Create Todo</Button>
        </Link>
      </div>
    </div>
  );
}
