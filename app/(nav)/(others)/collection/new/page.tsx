import AddLesson from "../../../../../components/lesson/new/AddLesson";
import { supabase } from "../../../../../supabase";

const countCollection = async () => {
  const { data, error, count } = await supabase
    .from("lesson")
    .select("*", { count: "exact", head: true });
  return count || 0;
};

export default async function NewCollection() {
  const count = await countCollection();

  return (
    <div className="mx-auto flex max-w-[1500px] grow items-center justify-center p-5">
      <AddLesson count={count} />
    </div>
  );
}
