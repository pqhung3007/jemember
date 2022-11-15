import AddLesson from "app/(nav)/(others)/lesson/new/AddLessonPage";
import { supabaseCountLesson } from "utils";

export default async function NewLesson() {
  const count = await supabaseCountLesson();

  return (
    <div className="mx-auto flex max-w-[1500px] justify-center p-5">
      <AddLesson count={count} />
    </div>
  );
}
