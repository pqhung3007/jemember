import Header from "./Header";

export default function Page({props}:) {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Header />
      {props.component}
    </div>
  )
}
