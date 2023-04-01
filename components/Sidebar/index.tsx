import React from 'react'
/* @ts-ignore */
import { 
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';




function Sidebar() {
  return (
    <div className="flex flex-col">
      <img className='h-10 w-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png" alt="twitter-icon" />
      <SidebarRow Icon={HomeIcon} title='Home' />
      <SidebarRow Icon={HashtagIcon} title='Explore' />
      <SidebarRow Icon={BellIcon} title='Notifications' />
      <SidebarRow Icon={MailIcon} title='Messages' />
      <SidebarRow Icon={BookmarkIcon} title='Bookmarks' />
      <SidebarRow Icon={CollectionIcon} title='List' />
      <SidebarRow Icon={UserIcon} title='Sign In' />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title='More' />
    </div>
    
  )
}


export default Sidebar