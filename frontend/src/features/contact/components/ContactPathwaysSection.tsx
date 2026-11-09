import { Leaf } from 'lucide-react'
import { Eyebrow, PathwayCard } from '../../../components/ui'
import { pathways } from '../data'

export function ContactPathwaysSection() {
  return (
    <section data-node-id="8:48195" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
      <Eyebrow>How can we help?</Eyebrow>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <PathwayCard
            key={pathway.title}
            {...pathway}
            icon={<Leaf className="h-4 w-4 text-lambo-primary" />}
          />
        ))}
      </div>
    </section>
  )
}
