import { useRouter } from 'next/router'
import Link from 'next/link';

export default function person () {
  const router = useRouter();
  //console.log(router.query);
  const { vehicle, person } = router.query;
  return <div>
    <h1>{person}´s {vehicle}</h1>
    <div>
      <Link href="/details">
        <a>To Details</a>
      </Link>
    </div>
  </div>
}