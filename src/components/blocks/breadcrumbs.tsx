import { FC } from 'react'

import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface BreadcrumbElement {
  name: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbsProps {
  elements: BreadcrumbElement[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ elements }) => {
  return (
    <div className="w-full px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {elements.map((element, index) => (
            <>
              <BreadcrumbItem key={index}>
                {element.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={element.href}>{element.name}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{element.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < elements.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs
