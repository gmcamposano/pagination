import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/loading";
import Pagination from "../components/pagination";

const TOTAL_RESULTS = 100;

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async ({ results = 12, page = 1 }) => {
    setLoading(true);
    const res = await fetch(
      `https://randomuser.me/api/?results=${results}&page=${page}`
    );
    const users = await res.json();
    setData(users.results);
    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { results, page } = router.query;
    fetchData({ results, page });
  }, [router.query, router.isReady]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <p className="text-center mb-3">results: {data.length}</p>
          <section className="grid grid-cols-3 place-items-center">
            {data.map(({ name, email, picture }) => (
              <div key={email} className="flex flex-col items-center">
                <img className="w-48" src={picture.large} alt={name} />
                <h1>
                  {name.first} {name.last}
                </h1>
                <p>{email}</p>
              </div>
            ))}
          </section>
          <Pagination
            currentPage={router.query.page}
            resultsPerPage={router.query.results}
            totalResults={TOTAL_RESULTS}
          />
        </div>
      )}
    </>
  );
}
