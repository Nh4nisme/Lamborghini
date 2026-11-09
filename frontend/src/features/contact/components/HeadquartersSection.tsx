import { Eyebrow, SectionHeading } from '../../../components/ui'

export function HeadquartersSection() {
  return (
    <section data-node-id="8:48190" className="bg-lambo-tertiary py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        <Eyebrow>Automobili Lamborghini / Headquarters reference</Eyebrow>
        <SectionHeading className="mt-4">Sant&apos;Agata Bolognese.</SectionHeading>
        <p className="mt-6 text-lg leading-7 text-lambo-secondary">
          Via Modena 12
          <br />
          40019 Sant&apos;Agata Bolognese (BO), Italy
          <br />
          +39 051 9597611
        </p>
        <p className="mt-6 text-sm leading-5 text-lambo-secondary/80">
          Headquarters information reproduced as reference content for this independent design study.
        </p>
      </div>
    </section>
  )
}
