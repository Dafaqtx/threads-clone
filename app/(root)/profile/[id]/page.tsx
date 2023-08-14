import { ProfileHeader, ThreadsTab } from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onBoarded) redirect("/onboarding");

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        <ProfileHeader
          accountId={userInfo.id}
          authUserId={userInfo.id}
          username={userInfo.username}
          image={userInfo.image}
          bio={userInfo.bio}
        />

        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {profileTabs.map(({ value, label, icon }) => (
                <TabsTrigger key={label} value={value}>
                  <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className="object-contain mr-2"
                  />
                  <p className="max-sm:hidden">{label}</p>
                  {label === "Threads" && (
                    <p className="ml-1 rounded-full bg-primary-500 px-2 py-1 !text-tiny-medium text-light-2">
                      {userInfo?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            {profileTabs.map(({ label, value }) => (
              <TabsContent
                key={`content-${label}`}
                value={value}
                className="w-full text-light-1"
              >
                <ThreadsTab
                  userId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default Page;
