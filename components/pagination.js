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
      console.log('first one to run')
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
      console.log('this ran')
      setPages([
        '...',
        ...Array.from(Array(totalPages).keys())
          .map((i) => i + 1)
          .slice(currentPage - 2, currentPage + 3),
        '...'
      ])
    }

    if (currentPage >= 5 && totalPages - currentPage < 3) {
      console.log('this also ran')
      setPages([
        '...',
        ...Array.from(Array(totalPages).keys())
          .map((i) => i + 1)
          .slice(totalPages - 5, totalPages)
      ])
    }
  }, [currentPage, totalPages])

  return (
    <section className="flex justify-center items-center">
      {/* pagination left*/}
      <ul className="flex justify-center items-center gap-1">
        <li>
          <div
            onClick={handleLeftArrowClick}
            disabled={currentPage === 1}
            className={`${
              currentPage <= 1 && 'opacity-50'
            } px-2 py-1 bg-blue-500 cursor-pointer`}
          >
            &laquo;
          </div>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <a
              onClick={() => handlePageNumberClick(page)}
              disabled={page === '...' || page === currentPage}
              className={`${
                page === currentPage && 'bg-blue-500 text-white'
              } px-2 py-1 cursor-pointer`}
            >
              {page}
            </a>
          </li>
        ))}

        <li>
          <a
            onClick={handleRightArrowClick}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages && 'opacity-50'
            } px-2 py-1 bg-blue-500 cursor-pointer`}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </section>
  )
}
