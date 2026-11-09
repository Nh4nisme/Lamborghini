import { Leaf } from 'lucide-react'
import { PathwayCard, SectionHeading } from '../../../components/ui'
import { cultureResources } from '../data'

export function CultureResourcesSection() {
  return (
    <section data-node-id="8:48218" className="bg-lambo-tertiary py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        <SectionHeading>Explore a wider world.</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cultureResources.map((resource) => (
            <PathwayCard
              key={resource.title}
              {...resource}
              icon={<Leaf className="h-4 w-4 text-lambo-primary" />}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
