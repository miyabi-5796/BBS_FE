"use client";

import { useState } from "react";
import { addPost } from "../actions";

export default function PostForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);

    await addPost({
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toLocaleString("ja-JP"),
    });

    setName("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">お名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-default-text-layout"
          placeholder="名無しさん"
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">メッセージ</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-default-text-layout"
          placeholder="何を話しますか？"
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-md ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 shadow-md"}`}
      >
        {isSubmitting ? "投稿中・・・" : "掲示板に書き込む"}
      </button>
    </form>
  );
}
