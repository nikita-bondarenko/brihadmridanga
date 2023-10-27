import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import { useBookmarks } from "../hooks/useBookmarks"

export const Head: HeadFC = () => <title>Home Page</title>


const BookmarkPage: React.FC<PageProps> = () => {
  const { bookmarks, setBookmarks } = useBookmarks()


  return (
    <section className="container">
      <h1 className="text-2xl font-bold mx-0 uppercase w-fit mb-10">Закладки</h1>
      <ul>
        {bookmarks?.map(item => <li key={item.id}>
          <Link to={item.path}>{item.name}</Link>
          <div>

          </div>
        </li>)}
      </ul>
    </section>
  )
}

export default BookmarkPage


