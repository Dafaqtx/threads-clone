import { ThreadCard } from "@/components/cards";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Comment } from "@/components/forms";
export const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onBoarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread?.id}
          currentUserImage={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />

        <div className="mt-10">
          {thread?.children.map((child) => (
            <ThreadCard
              key={child._id}
              id={child._id}
              currentUserId={child?.id || ""}
              parentId={child.parentId}
              content={child.text}
              author={child.author}
              community={child.community}
              createdAt={child.createdAt}
              comments={child.children}
              isComment
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
