"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<string>("");
  const [isSubmiting, setIsSubmitimg] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitimg(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitimg(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
        <Button disabled={isSubmiting}>
          Submit New Issue {isSubmiting && <Spinner />}
        </Button>
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
