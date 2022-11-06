import { db } from '../firebase';
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Card from './components/Card';
import Page from './components/Page';
import Header from './components/Header';
export default function Home() {

  const messagesRef = collection(db, 'collection');
  const q = query(messagesRef, orderBy('created'), limit(25));

  const [collections] = useCollectionData(q);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Header />
      <div className="max-w-[1500px] px-5 py-6 mx-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {collections?.map(collection => <Card id={collection.id} name={collection.name} created={collection.created} />)}
      </div>
    </div>
  )
}
