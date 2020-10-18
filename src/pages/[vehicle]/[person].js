import { useRouter } from 'next/router'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function person ({ ownerList }) {
  const router = useRouter();
  const { vehicle, person } = router.query;

  const [owner, setOwner] = useState(ownerList);

  useEffect(() => {
    
    async function fetchData() {
      const response = await fetch(`http://localhost:4001/vehicles?ownerName=${person}&vehicle=${vehicle}`);
      const data = await response.json();
      setOwner(data);
    }

    if(ownerList.length == 0) {
      fetchData();
    }
    
  }, [])

  return <div>
    {owner[0] ? (<h1>{owner[0].details}</h1>) : (<h2>Loading...</h2>) }
    <div>
      <Link href="/list">
        <a>To List</a>
      </Link>
    </div>
  </div>
}

person.getInitialProps = async (ctx) => {
  
  if(!ctx.req) {
    return { ownerList: [] }
  }

  const { query } = ctx;
  const people = await fetch(`http://localhost:4001/vehicles?ownerName=${query.person}&vehicle=${query.vehicle}`);
  const ownerList = await people.json();
  return { ownerList: ownerList }
}