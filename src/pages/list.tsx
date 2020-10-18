import Link from 'next/link';

import { VehiclePerson } from '../../api/VehiclePerson';

export interface ListProps {
  people: VehiclePerson[] | undefined
}

export default function list ({people} : ListProps) {
  return <div>
   {people?.map( (element, index) => (
      <div key={index}>
        <Link href="[vehicle]/[person]" as={`${element.vehicle}/${element.ownerName}`}>
          <a>Navigate to {element.ownerName}´s {element.vehicle}</a>
        </Link>
      </div>
   ))}
  </div>
}


list.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/vehicles');
  const people: VehiclePerson[] | undefined = await response.json();
  return { people: people };
}