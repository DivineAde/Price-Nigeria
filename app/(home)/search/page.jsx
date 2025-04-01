// app/search/page.js (or wherever you're using this)
import { Suspense } from 'react'
import SearchResult from '@/components/SearchComponent' 

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResult />
    </Suspense>
  )
}