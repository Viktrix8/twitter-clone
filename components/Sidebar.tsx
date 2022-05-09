import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'

import SidebarRow from './SidebarRow'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <div className="m-3">
        <Image
          src="https://links.papareact.com/drq"
          height={40}
          width={40}
          alt="twitter logo"
        />
      </div>
      <SidebarRow icon={HomeIcon} title="Home" />
      <SidebarRow icon={HashtagIcon} title="Explore" />
      <SidebarRow icon={BellIcon} title="Notifications" />
      <SidebarRow icon={MailIcon} title="Messages" />
      <SidebarRow icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow icon={CollectionIcon} title="Lists" />
      <SidebarRow
        icon={UserIcon}
        title={session ? 'Sign Out' : 'Sign In'}
        onClick={session ? signOut : signIn}
      />

      <SidebarRow icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar
