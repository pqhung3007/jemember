import AddLesson from "app/(nav)/(others)/lesson/new/AddLessonPage";
import { supabase } from "supabase";

const countLesson = async () => {
  const { data, error, count } = await supabase
    .from("lesson")
    .select("*", { count: "exact", head: true });
  return count || 0;
};

export default async function NewLesson() {
  const count = await countLesson();

  return (
    <div className="mx-auto flex max-w-[1500px] grow items-center justify-center p-5">
      <AddLesson count={count} />
    </div>
  );
}
