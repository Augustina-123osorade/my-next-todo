"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoCheckmarkDone } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";

export default function TodoDetails() {
  const params = useParams();
  const router = useRouter();
  const todoId = params?.todoId as string;

  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/todos/${todoId}`);
      if (!res.ok) throw new Error("Todo not found");
      return res.json();
    },
    enabled: !!todoId, // only fetch when todoId exists
  });

  if (isLoading)
    return <p className="text-center text-gray-500 py-4">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-red-600 py-4">
        {(error as Error).message || "Something went wrong."}
      </p>
    );

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Todo Details</h1>
      <section className="p-4 border rounded-md shadow-sm bg-white">
        <p>
          <strong>ID:</strong> {todo.id}
        </p>
        <p>
          <strong>Title:</strong> {todo.todo}
        </p>
        <p className="flex items-center gap-2">
          <strong>Status:</strong>
          <span
            className={todo.completed ? "text-green-600" : "text-yellow-600"}
          >
            {todo.completed ? <IoCheckmarkDone /> : <GrInProgress />}
          </span>
        </p>
        <p>
          <strong>User ID:</strong> {todo.userId}
        </p>
      </section>
      <div className="flex justify-center">
        <Button
          className="dark bg-black text-white"
          variant="outline"
          onClick={() => router.push("/todo")}
        >
          Back
        </Button>
      </div>
    </main>
  );
}
