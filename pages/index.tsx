import { collection, limit, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Card from './components/Card';
import Header from './components/Header';
export default function Home() {

  const messagesRef = collection(db, 'collection');
  const q = query(messagesRef, orderBy('created'), limit(25));
  const [datas] = useCollection(q);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Head>
        <title>Jmember</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="max-w-[1200px] px-5 py-6 mx-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {datas?.docs.map(collection =>
          <Card
            key={collection.id}
            id={collection.id}
            name={collection.data().name}
            created={collection.data().created}
          />
        )}
        <a href="/collection/new" className="rounded-2xl px-4 py-8 bg-gray-800 hover:bg-blue-400/40 flex justify-center items-center">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </p>
        </a>
      </div>
    </div>
  )
}
