//"use client"; // クライアントサイドで動きがある場合は書く必要がある

import { getPosts } from "./actions";
import PostForm from "./components/PostForm";

// 返り値に仮想DOMを構築するための情報を返す。
export default async function Home() {
  const posts = await getPosts();

  // 以下のreturn内にHTMLを記載する
  return (
    <main className="max-w-2xl mx-auto p-4 py-10">
      <h1 className="title-lauout">Next.js Board</h1>
      <PostForm />

      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post.id} className="post-frame">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="avatar-circle">{post.name.charAt(0)}</div>
                <span className="post-name">{post.name}</span>
              </div>
              <span className="text-xs text-gray-400">{post.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {post.message}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
