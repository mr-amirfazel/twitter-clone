import React, { FC, PropsWithChildren, SVGProps } from 'react'
interface SidebarRowProps extends PropsWithChildren{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title:string
}
const SidebarRow:FC<SidebarRowProps> = ({Icon, title}) => {
  return (
    <div className='flex max-w-fit items-center space-x-2 px-4 py-3  
    rounded-3xl cursor-pointer hover:bg-gray-100 transition-all duration-200 group'>
        <Icon className="h-6 w-6" />
        <p className="group-hover: text-twitter">{title}</p>
    </div>
  )
}

export default SidebarRow