import { useRouter } from "next/router";
import { useState } from "react";
export default function Pagination({
  currentPage,
  resultsPerPage,
  totalResults,
}) {
  // const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="flex justify-center items-center">
      {/* pagination left*/}
      <ul className="flex justify-center items-center gap-1">
        <li>
          <a className="px-2 py-1 bg-blue-500" href="#">
            &laquo;
          </a>
        </li>
        {/* <li>
          <a className="border px-2 py-1" href="#">
            1
          </a>
        </li>
        <li>
          <a className="border px-2 py-1" href="#">
            2
          </a>
        </li>
        <li>
          <a className="border px-2 py-1" href="#">
            3
          </a>
        </li> */}
        {pages.map((page) => (
          <li key={page}>
            <a
              onClick={() => {
                // setCurrentPage(page);
                router.push(`/?page=${page}`);
              }}
              className={
                page === currentPage
                  ? "border px-2 py-1 bg-blue-500"
                  : "border px-2 py-1"
              }
            >
              {page}
            </a>
          </li>
        ))}

        <li>
          <a className="px-2 py-1 bg-blue-500" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </section>
  );
}
