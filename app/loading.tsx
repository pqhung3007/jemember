const Skeleton = () => (
  <div className="duration-50 animate-pulse rounded-lg bg-neutral-800 py-[60px]"></div>
);

export default function LessonListSkeleton() {
  return (
    <>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-20">
        {[...Array(15)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    </>
  );
}
