"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addCommentToTread } from "@/lib/actions/thread.actions";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface CommentProps {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

type ThreadSchema = z.infer<typeof CommentValidation>;

export const Comment: FC<CommentProps> = ({
  threadId,
  currentUserImage,
  currentUserId,
}) => {
  const path = usePathname();

  const form = useForm<ThreadSchema>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: ThreadSchema) => {
    await addCommentToTread({
      threadId: threadId,
      commentText: values.thread,
      userId: currentUserId.toString(),
      path,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center  gap-3 w-full">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="Profile photo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
