import { useRouter } from 'next/router'
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { VehiclePerson } from '../../../api/VehiclePerson';
import { NextPageContext } from 'next';

export interface PersonProps {
  ownerList: VehiclePerson[] | undefined;
}

export default function person ({ ownerList } : PersonProps) {
  const router = useRouter();
  const { vehicle, person } = router.query;

  const [owner, setOwner] = useState(ownerList);

  useEffect(() => {
    
    async function fetchData() {
      const response = await fetch(`http://localhost:4001/vehicles?ownerName=${person}&vehicle=${vehicle}`);
      const data: VehiclePerson[] | undefined = await response.json();
      setOwner(data);
    }

    if(ownerList?.length == 0) {
      fetchData();
    }
    
  }, [])

  return <div>
    {owner && owner[0] ? (<h1>{owner[0].details}</h1>) : (<h2>Loading...</h2>)}
    <div>
      <Link href="/list">
        <a>To List</a>
      </Link>
    </div>
  </div>
}

interface MyNextPageContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  }
}

person.getInitialProps = async ( { query,req }: MyNextPageContext ) => {
  
  if(!req) {
    return { ownerList: [] }
  }

  const people = await fetch(`http://localhost:4001/vehicles?ownerName=${query.person}&vehicle=${query.vehicle}`);
  const ownerList : VehiclePerson[] | undefined = await people.json();
  return { ownerList: ownerList }
}