import { useEffect, useState } from "react"
import { bookmarkStoreKey } from "../config"
import { useIsClient } from "./useIsClient"
import { Bookmark } from "../types/types"

export const useBookmarks = () => {
    const [isClient] = useIsClient()
    const [bookmarks, setBookmarks] = useState<Bookmark[]>()
    const [isBookmarksSet, setIsBookmarksSet] = useState(false)
    useEffect(() => {
        if (isClient) {
            const bookmarks: Bookmark[] = JSON.parse(window.localStorage.getItem(bookmarkStoreKey) || '[]')
            setBookmarks(bookmarks)
            setIsBookmarksSet(true)

        }
    }, [isClient])

    useEffect(() => {
        if (isBookmarksSet) {
            window.localStorage.setItem(bookmarkStoreKey, JSON.stringify(bookmarks))
            console.log(bookmarks)
        }
    }, [JSON.stringify(bookmarks), isBookmarksSet])

    return { bookmarks, setBookmarks }
}