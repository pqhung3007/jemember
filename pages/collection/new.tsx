import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import HeadTag from "../components/HeadTag";
import Nav from "../components/Nav";

export default function NewCollection() {
  const collectionRef = collection(db, "collection");
  const [formValue, setFormValue] = useState("");
  const [collectionsSnapshot] = useCollection(collectionRef);

  const length = collectionsSnapshot?.docs?.length || 0;

  const addCollection = async (e: any) => {
    e.preventDefault();

    await addDoc(collectionRef, {
      name: formValue,
      created: serverTimestamp(),
    });

    setFormValue("");
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <HeadTag />
      <Nav />
      <div className="max-w-[1500px] p-5 mx-auto flex justify-center items-center grow">
        <form className="p-6" onSubmit={addCollection}>
          <label className="block mb-2 text-xl font-medium text-gray-300">
            Collection name
          </label>
          <input
            type="text"
            className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500/70 focus:ring focus:outline-none"
            placeholder="My Jmember collection"
            required
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 cursor-pointer"
            disabled={!formValue && length < 100}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
