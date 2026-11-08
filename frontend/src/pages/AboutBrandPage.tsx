const CONDENSED = { fontFamily: "'Barlow Condensed', sans-serif" };
const BODY = { fontFamily: 'Barlow, sans-serif' };

const milestones = [
  { year: '1963', title: 'THE BEGINNING', description: 'Ferruccio Lamborghini founds the company in Sant’Agata Bolognese.', nodeId: '8:49536' },
  { year: '1964', title: '350 GT', description: 'The first production model begins a grand touring story.', nodeId: '8:49541' },
  { year: '1966', title: 'MIURA', description: 'A new perspective on the super sports car.', nodeId: '8:49546' },
  { year: '1971', title: 'COUNTACH', description: 'A radical shape for a new era.', nodeId: '8:49551' },
  { year: '1990', title: 'DIABLO', description: 'A new chapter in a lineage of unmistakable design.', nodeId: '8:49556' },
  { year: '2003', title: 'GALLARDO / CENTRO STILE', description: 'A new model and the establishment of Centro Stile.', nodeId: '8:49561' },
  { year: '2011', title: 'AVENTADOR', description: 'The V12 story enters another generation.', nodeId: '8:49566' },
  { year: '2014', title: 'HURACÁN', description: 'A new expression of the super sports car.', nodeId: '8:49571' },
  { year: '2018', title: 'URUS', description: 'The horizon expands with the Super SUV.', nodeId: '8:49576' },
  { year: '2024', title: 'URUS SE / TEMERARIO', description: 'Electrification shapes the next chapter.', nodeId: '8:49581' },
];

const brandValues = [
  { id: '8:49590', title: 'BRAVE' },
  { id: '8:49591', title: 'UNEXPECTED' },
  { id: '8:49592', title: 'AUTHENTIC' },
];

const companyResources = [
  { id: '8:49640', title: 'COMPANY PROFILE' },
  { id: '8:49641', title: 'RESPONSIBILITY' },
  { id: '8:49642', title: 'CAREERS & FINANCIALS' },
];

export default function AboutBrandPage() {
  return (
    <div data-node-id="8:49499" className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sans pb-20">
      <section data-node-id="8:49501" aria-label="Cinematic hero" className="relative overflow-hidden h-[720px]">
        <img
          data-node-id="8:49502"
          src="/about-brand/hero-campaign.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div data-node-id="8:49503" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px] h-full">
          <div data-node-id="8:49504" className="absolute left-4 sm:left-6 lg:left-[120px] top-[240px] w-full max-w-[650px]">
            <div
              data-node-id="8:49505"
              className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase"
              style={BODY}
            >
              COMPANY / SANT’AGATA BOLOGNESE, ITALY
            </div>
            <h1
              data-node-id="8:49506"
              className="mt-10 text-5xl sm:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase text-[#f7de9f] tracking-[-0.01em] leading-[0.95]"
              style={CONDENSED}
            >
              DARE TO
              <br />
              GO BEYOND.
            </h1>
          </div>
          <div
            data-node-id="8:49510"
            className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-[120px] lg:right-[120px] bottom-6 flex justify-between text-xs font-semibold tracking-[0.08em] text-[#f9ce5c] uppercase"
            style={BODY}
          >
            <span data-node-id="8:49511">01 / 03</span>
            <span data-node-id="8:49512">SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>

      <section data-node-id="8:49513" aria-label="Page introduction" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px] pt-24 pb-14">
        <div data-node-id="8:49515" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
          ABOUT THE BRAND
        </div>
        <h2
          data-node-id="8:49516"
          className="mt-10 text-5xl sm:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase text-[#f7de9f] leading-[0.95]"
          style={CONDENSED}
        >
          AN INSTINCT.
          <br />
          SINCE 1963.
        </h2>
        <p
          data-node-id="8:49518"
          className="mt-14 max-w-[680px] text-lg leading-7 text-[#f7de9f]"
          style={BODY}
        >
          Born from Ferruccio Lamborghini’s ambition in Sant’Agata Bolognese, the story is one of unexpected ideas,
          engineering conviction and an uncompromising belief in design.
        </p>
      </section>

      <section data-node-id="8:49519" aria-label="From the beginning" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[660px_476px] lg:justify-between gap-12 items-center">
          <div data-node-id="8:49521" className="overflow-hidden">
            <img
              data-node-id="8:49523"
              src="/about-brand/concept-story.jpg"
              alt=""
              className="w-full h-auto aspect-[660/480] object-cover"
            />
          </div>
          <div data-node-id="8:49524" className="lg:mt-16">
            <div data-node-id="8:49525" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
              01 / FROM THE BEGINNING
            </div>
            <h3
              data-node-id="8:49526"
              className="mt-10 text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]"
              style={CONDENSED}
            >
              A PLACE.
              <br />
              A VISION. A LEGACY.
            </h3>
            <p data-node-id="8:49527" className="mt-10 text-lg leading-7 text-[#f7de9f]" style={BODY}>
              In 1963, Ferruccio Lamborghini founded a company with the ambition to create extraordinary cars. From the
              first grand tourers to today’s electrified super sports cars, Sant’Agata Bolognese remains the home of that
              vision.
            </p>
          </div>
        </div>
      </section>

      <section data-node-id="8:49529" aria-label="Heritage timeline" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-20 pb-24">
        <div data-node-id="8:49530" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2" style={BODY}>
          02 / MILESTONES
        </div>
        <h2 data-node-id="8:49531" className="text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]" style={CONDENSED}>
          THE FUTURE HAS
          <br />
          A REMARKABLE PAST.
        </h2>

        <figure data-node-id="8:49532" className="mt-16">
          <img
            data-node-id="8:49533"
            src="/about-brand/heritage.jpg"
            alt="Heritage / original period-inspired concept image"
            className="w-full h-auto aspect-[1200/440] object-cover"
          />
          <figcaption data-node-id="8:49534" className="mt-3 text-xs leading-4 text-[#f9ce5c]" style={BODY}>
            Heritage / original period-inspired concept image
          </figcaption>
        </figure>

        <ol data-node-id="8:49535" className="mt-16">
          {milestones.map((item) => (
            <li
              key={item.year}
              data-node-id={item.nodeId}
              className="border border-[#9f6b08] px-6 py-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-0 -mt-px first:mt-0"
            >
              <span className="md:w-32 text-[36px] leading-10 font-semibold text-[#d8a016] shrink-0" style={CONDENSED}>
                {item.year}
              </span>
              <div className="md:ml-10">
                <h3 className="text-[28px] leading-8 font-semibold uppercase text-[#f7de9f]" style={CONDENSED}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#f7de9f]" style={BODY}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section data-node-id="8:49586" aria-label="Brand values" className="bg-[#282928] py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0">
          <div data-node-id="8:49587" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2" style={BODY}>
            03 / WHAT DRIVES US
          </div>
          <h2 data-node-id="8:49588" className="text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]" style={CONDENSED}>
            BE BRAVE. BE UNEXPECTED. BE AUTHENTIC.
          </h2>
          <div data-node-id="8:49589" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandValues.map((value) => (
              <article
                key={value.id}
                data-node-id={value.id}
                className="border border-[#9f6b08] bg-[#282928] p-8 min-h-[297px] flex flex-col justify-end"
              >
                <h3 className="text-[32px] leading-8 font-semibold uppercase text-[#f7de9f]" style={CONDENSED}>
                  {value.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-node-id="8:49593" aria-label="Centro Stile" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[476px_660px] lg:justify-between gap-12 items-center">
          <div data-node-id="8:49595" className="lg:mt-16 order-2 lg:order-1">
            <div data-node-id="8:49596" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
              04 / CENTRO STILE
            </div>
            <h3
              data-node-id="8:49597"
              className="mt-10 text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]"
              style={CONDENSED}
            >
              DESIGN IS
              <br />
              OUR LANGUAGE.
            </h3>
            <p data-node-id="8:49598" className="mt-10 text-lg leading-7 text-[#f7de9f]" style={BODY}>
              Defined proportions. Precise contours. Pure surfaces. Centro Stile translates a distinctive design DNA into
              each new model, from the first sketch to the final form. The hexagon and Y-shaped signatures connect an
              evolving family of ideas.
            </p>
          </div>
          <div data-node-id="8:49600" className="order-1 lg:order-2 overflow-hidden">
            <img
              data-node-id="8:49602"
              src="/about-brand/design-stage.jpg"
              alt=""
              className="w-full h-auto aspect-[660/480] object-cover"
            />
          </div>
        </div>
      </section>

      <section data-node-id="8:49603" aria-label="Design process" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pb-20">
        <div data-node-id="8:49604" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: '8:49605', eyebrow: '01 / SKETCH', description: 'An idea takes shape through proportion and a clear creative intent.' },
            { id: '8:49608', eyebrow: '02 / SCULPT', description: 'Surfaces, volumes and light are explored through physical form.' },
            { id: '8:49611', eyebrow: '03 / REFINE', description: 'Design and engineering converge in precise, functional details.' },
          ].map((stage) => (
            <div key={stage.id} data-node-id={stage.id} className="border-t border-[#9f6b08] pt-6">
              <div className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
                {stage.eyebrow}
              </div>
              <p className="mt-6 text-lg leading-7 text-[#f7de9f]" style={BODY}>
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section data-node-id="8:49614" aria-label="Innovation" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[660px_476px] lg:justify-between gap-12 items-center">
          <div data-node-id="8:49616" className="overflow-hidden">
            <img
              data-node-id="8:49618"
              src="/about-brand/innovation.jpg"
              alt=""
              className="w-full h-auto aspect-[660/480] object-cover"
            />
          </div>
          <div data-node-id="8:49619" className="lg:mt-16">
            <div data-node-id="8:49620" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
              05 / INNOVATION
            </div>
            <h3
              data-node-id="8:49621"
              className="mt-10 text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]"
              style={CONDENSED}
            >
              NEW ENERGY.
              <br />
              THE SAME INSTINCT.
            </h3>
            <p data-node-id="8:49622" className="mt-10 text-lg leading-7 text-[#f7de9f]" style={BODY}>
              Electrification opens new possibilities for performance and emotion. Revuelto, Urus SE and Temerario show
              different expressions of this evolving journey, with design and engineering working toward a new driving
              experience.
            </p>
          </div>
        </div>
      </section>

      <section data-node-id="8:49624" aria-label="Motorsport" className="relative overflow-hidden h-[560px]">
        <img
          data-node-id="8:49625"
          src="/about-brand/closing-campaign.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div data-node-id="8:49626" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px] h-full">
          <div data-node-id="8:49627" className="absolute left-4 sm:left-6 lg:left-[120px] top-[168px] max-w-[650px]">
            <div data-node-id="8:49628" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase" style={BODY}>
              06 / MOTORSPORT
            </div>
            <h2
              data-node-id="8:49629"
              className="mt-10 text-5xl sm:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase text-[#f7de9f] leading-[0.95]"
              style={CONDENSED}
            >
              THE CIRCUIT.
              <br />
              OUR PROVING GROUND.
            </h2>
          </div>
          <div
            data-node-id="8:49633"
            className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-[120px] lg:right-[120px] bottom-6 flex justify-between text-xs font-semibold tracking-[0.08em] text-[#f9ce5c] uppercase"
            style={BODY}
          >
            <span data-node-id="8:49634">01 / 03</span>
            <span data-node-id="8:49635">SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>

      <section data-node-id="8:49636" aria-label="The company" className="bg-[#040404] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-20 pb-20">
        <div data-node-id="8:49637" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2" style={BODY}>
          07 / THE COMPANY
        </div>
        <h2 data-node-id="8:49638" className="text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]" style={CONDENSED}>
          BEHIND THE EXTRAORDINARY.
        </h2>
        <div data-node-id="8:49639" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {companyResources.map((resource) => (
            <article
              key={resource.id}
              data-node-id={resource.id}
              className="border border-[#9f6b08] bg-[#282928] p-8 min-h-[297px] flex flex-col justify-end"
            >
              <h3 className="text-[32px] leading-8 font-semibold uppercase text-[#f7de9f]" style={CONDENSED}>
                {resource.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section data-node-id="8:49643" aria-label="Closing invitation" className="bg-[#282928] py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0">
          <div data-node-id="8:49644" className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2" style={BODY}>
            BEYOND THE EXPECTED
          </div>
          <h2 data-node-id="8:49645" className="text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]" style={CONDENSED}>
            BECOME PART OF THE STORY.
          </h2>
          <p data-node-id="8:49646" className="mt-6 text-lg leading-7 text-[#f7de9f]" style={BODY}>
            Explore your configuration, or start a conversation with a showroom.
          </p>
        </div>
      </section>
    </div>
  );
}
