import { FC, Fragment } from 'react'
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

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ elements }) => {
  return (
    <div className="w-full px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {elements.map((element, index) => (
            <Fragment key={element.name}>
              <BreadcrumbItem>
                {element.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={element.href}>
                      {capitalizeFirstLetter(element.name)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {capitalizeFirstLetter(element.name)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < elements.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs
