export default function AddCard(props: any) {
  return (
    <div
      className="my-4 flex cursor-pointer justify-center rounded-xl bg-green-700 py-8 text-xl hover:bg-green-600/90"
      onClick={props.insertCard}
    >
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-plus fa-lg cursor-pointer text-green-300"></i>
        <p className="font-semibold">Thêm thẻ</p>
      </div>
    </div>
  );
}
