"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState<string>("");
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <div className="max-w-xl">
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>

      {error && (
        <Callout.Root color="red" role="alert" className="mt-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};

export default NewIssuePage;
