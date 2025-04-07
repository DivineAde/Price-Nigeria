// components/forum/ThreadListSkeleton.jsx
export default function ThreadListSkeleton({ count = 3 }) {
  return Array(count).fill(0).map((_, i) => (
    <div key={i} className="p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="hidden sm:flex flex-col items-center">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="flex gap-1 mb-2">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <div className="h-4 w-14 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ));
}