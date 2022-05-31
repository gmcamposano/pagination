export default function Pagination() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  return (
    <section className="flex justify-center items-center">
      {/* pagination left*/}
      <ul className="flex justify-center items-center gap-1">
        <li>
          <a className="px-2 py-1 bg-blue-500" href="#">
            &laquo;
          </a>
        </li>
        <li>
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
        </li>
        <li>
          <a className="px-2 py-1 bg-blue-500" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </section>
  );
}
