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
    <div className="flex flex-col items-center px-4 md:items-start">
      <img className='h-10 w-10 m-3 rounded-full' src="https://store-images.s-microsoft.com/image/apps.45406.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2a88a418-b96d-44a6-ad4f-5e0ee6289b2c" alt="twitter-icon" />
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