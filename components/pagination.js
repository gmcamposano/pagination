import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
export default function Pagination({
  initialPage,
  resultsPerPage,
  totalResults
}) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pages, setPages] = useState([])
  const router = useRouter()
  const totalPages = Math.ceil(totalResults / resultsPerPage)

  // click right arrow
  const handleRightArrowClick = () => {
    if (currentPage === totalPages) return
    setCurrentPage(currentPage + 1)
    router.push({
      query: {
        ...router.query,
        page: currentPage + 1
      }
    })
  }

  // click left arrow
  const handleLeftArrowClick = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
    router.push({
      query: {
        ...router.query,
        page: currentPage - 1
      }
    })
  }

  // click page number
  const handlePageNumberClick = (page) => {
    setCurrentPage(page)
    router.push({
      query: {
        ...router.query,
        page
      }
    })
  }

  useEffect(() => {
    //if pages are greater than 5, show only 5
    if (currentPage < 5) {
      if (totalPages <= 5) {
        setPages(
          Array.from(Array(totalPages).keys())
            .map((i) => i + 1)
            .slice(0, 5)
        )
      }
      if (totalPages >= 5) {
        setPages([
          ...Array.from(Array(totalPages).keys())
            .map((i) => i + 1)
            .slice(0, 5),
          '...'
        ])
      }
    }

    if (currentPage >= 5 && totalPages - currentPage >= 3) {
      setPages([
        '...',
        ...Array.from(Array(totalPages).keys())
          .map((i) => i + 1)
          .slice(currentPage - 2, currentPage + 3),
        '...'
      ])
    }

    if (currentPage >= 5 && totalPages - currentPage < 3) {
      setPages([
        '...',
        ...Array.from(Array(totalPages).keys())
          .map((i) => i + 1)
          .slice(totalPages - 5, totalPages)
      ])
    }
  }, [currentPage, totalPages])

  return (
    <section className="flex justify-center items-center my-5 ">
      {/* pagination left*/}
      <ul className="flex justify-center items-center gap-1">
        <li>
          <button
            onClick={handleLeftArrowClick}
            disabled={currentPage === 1}
            className={`${
              currentPage <= 1 && 'opacity-50'
            } px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l cursor-pointer disabled:cursor-default`}
          >
            &laquo;
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageNumberClick(page)}
              disabled={page === '...' || page === currentPage}
              className={`${
                page === currentPage && 'bg-gray-400 text-white'
              } px-2 py-1 border border-gray-200 cursor-pointer disabled:cursor-default disabled:border-none`}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={handleRightArrowClick}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages && 'opacity-50'
            } px-2 py-1 bg-gray-200 rounded-r cursor-pointer`}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </section>
  )
}
