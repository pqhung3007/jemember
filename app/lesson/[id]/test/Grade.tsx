export default function Grade({ grade, max }: { grade: number; max: number }) {
  return (
    <div
      className={`rounded-xl ${
        grade * 2 > max
          ? "bg-green-400 text-green-900 dark:bg-green-700 dark:text-green-200"
          : "bg-red-400 text-red-900 dark:bg-red-700 dark:text-red-200"
      } p-6 text-center text-2xl font-semibold`}>
      Grade: {grade + "/" + max}
    </div>
  );
}
