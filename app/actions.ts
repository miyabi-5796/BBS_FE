"use server";

import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const data = await fs.readFile("posts.json", "utf-8");
  return JSON.parse(data);
}

export async function addPost(newPost: any) {
  const posts = await getPosts();
  posts.unshift(newPost);
  await fs.writeFile("posts.json", JSON.stringify(posts, null, 2));
  revalidatePath("/");
}
