import { SVGProps } from 'react'

interface Props {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: String
  onClick?: () => {}
}

const SidebarRow = ({ icon: Icon, title, onClick }: Props) => {
  return (
    <div
      className="group flex max-w-fit cursor-pointer items-center gap-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100"
      onClick={() => onClick?.()}
    >
      <Icon className="h-6 w-6" />
      <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
