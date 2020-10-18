import Link from 'next/link';

const people = [
  {v:'car', p:'Emanuel'},
  {v:'bike', p:'Joao'},
  {v:'Subway', p:'Mari'}
]

export default function details () {
  return <div>
   { people.map(people => (
      <div key={people.p}>
        <Link href="[vehicle]/[person]" as={`${people.v}/${people.p}`}>
          <a>Navigate to {people.p}´s {people.v}</a>
        </Link>
      </div>
   ))}
  </div>
}