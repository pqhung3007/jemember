import React from "react";

export default function LessonListSkeleton() {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="duration-50 animate-pulse rounded-lg bg-neutral-800 py-16"
        ></div>
      ))}
    </>
  );
}
