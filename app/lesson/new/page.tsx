import { useLessonsCount } from "utils/supabase/lesson/server";
import { authStatusOrRedirect } from "utils/supabase/auth/server";
import AddLesson from "./AddLessonPage";

export default async function NewLesson() {
  const count = await useLessonsCount();
  await authStatusOrRedirect(true, "/login");

  return (
    <div className="mx-auto flex max-w-[1500px] justify-center p-5 md:pl-24 lg:px-24">
      <AddLesson count={count} />
    </div>
  );
}
