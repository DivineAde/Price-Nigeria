// components/forum/CommunityStats.jsx
import { communityStats } from '@/data/forumData';
import { Bell } from 'lucide-react';

export default function CommunityStats({ onMarkAllRead }) {
  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex space-x-6">
            <span><strong>{communityStats.members.toLocaleString()}</strong> Members</span>
            <span className="text-green-600"><strong>{communityStats.online.toLocaleString()}</strong> Online</span>
          </div>
          <button 
            onClick={onMarkAllRead}
            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
          >
            <Bell size={16} className="mr-1" />
            Mark All Read
          </button>
        </div>
      </div>
    </div>
  );
}