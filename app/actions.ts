"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export interface Post {
  id: number;
  name: string;
  message: string;
  createdAt: Date;
}

export async function getPosts() {
  // データベースから投稿一覧を取得（作成日の降順）
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function addPost(data: { name: string; message: string }) {
  // データベースに新しい投稿を保存
  await prisma.post.create({
    data: {
      name: data.name,
      message: data.message,
    },
  });
  
  // キャッシュを更新して画面を再表示
  revalidatePath("/");
}
