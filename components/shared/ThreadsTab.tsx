import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { FC } from "react";
import { ThreadCard } from "../cards";

interface ThreadsTabProps {
  userId: string;
  accountId: string;
  accountType: string;
}

export const ThreadsTab: FC<ThreadsTabProps> = async ({
  userId,
  accountId,
  accountType,
}) => {
  let result = await fetchUserThreads(accountId);

  if (!result) {
    redirect("/");
  }
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={userId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result?.name, image: result?.image, id: result?.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
