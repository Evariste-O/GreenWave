
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css';

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();
  return (
    <div className="max-w-4xl m-auto">
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
          {result.posts.map((post) => (
            <ThreadCard
              key={post._id}
              id={post.id}
              currentUserId={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
          </>
        )}
      </section>
    </div>
  )
}