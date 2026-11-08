const CONDENSED = { fontFamily: "'Barlow Condensed', sans-serif" };

const coreContributors = [
  { id: '91:7105', number: '01', caption: 'Creative direction' },
  { id: '91:7111', number: '02', caption: 'Experience design', detail: 'Shapes the experience,\nflow and hierarchy.' },
  { id: '91:7118', number: '03', caption: 'Visual design', detail: 'Refines the interface\nand visual system.' },
];

const shoutoutMembers = ['04', '05', '06', '07', '08', '09'];

export default function AboutUsPage() {
  return (
    <div data-node-id="91:7069" className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sans pb-20">
      <section data-node-id="91:7071" aria-label="About us introduction" className="relative overflow-hidden">
        <img
          data-node-id="91:7075"
          src="/Images/about-us/design-atelier.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div data-node-id="91:7076" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-14 pb-10">
          <div data-node-id="91:7077" className="flex flex-col lg:flex-row lg:justify-between gap-10">
            <div data-node-id="91:7078" className="lg:w-[650px]">
              <div
                data-node-id="91:7079"
                className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-9"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                ABOUT US / THE WEB DEVELOPMENT TEAM
              </div>
              <h1
                data-node-id="91:7080"
                className="text-5xl sm:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase text-[#f7de9f] tracking-[-0.01em] leading-[0.95]"
                style={CONDENSED}
              >
                NINE MINDS.
                <br />
                ONE DIGITAL VISION.
              </h1>
            </div>

            <div data-node-id="91:7081" className="lg:w-[470px] lg:mt-[76px]">
              <p
                data-node-id="91:7082"
                className="text-lg leading-7 text-[#f7de9f]"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                We are 8Threads, the team behind this web experience. We bring design, code and a shared
                attention to detail into one connected vision.
              </p>
              <p
                data-node-id="91:7083"
                className="mt-5 text-xs leading-4 text-[#f9ce5c]"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                An independent website design study, inspired by the world of Lamborghini.
              </p>
            </div>
          </div>

          <div
            data-node-id="91:7084"
            className="mt-14 border border-[#9f6b08] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            <div data-node-id="91:7085" className="flex items-center gap-4">
              <span
                data-node-id="91:7086"
                className="text-[28px] leading-8 font-semibold uppercase text-[#f7de9f]"
                style={CONDENSED}
              >
                LAMBORGHINI
              </span>
              <span
                data-node-id="91:7087"
                className="text-[28px] leading-[34px] text-[#d8a016]"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                ×
              </span>
              <div data-node-id="91:7088" className="flex items-center gap-3">
                <img
                  data-node-id="150:7003"
                  src="/Images/about-us/8threads-white.png"
                  alt="8Threads logo"
                  className="h-[50px] w-auto"
                />
                <span
                  data-node-id="91:7092"
                  className="text-[32px] leading-[38px] font-semibold tracking-[-0.03em] text-white"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  8Threads
                </span>
              </div>
            </div>
            <div
              data-node-id="91:7093"
              className="text-xs font-semibold leading-4 tracking-[0.08em] text-[#f9ce5c] uppercase sm:text-right"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              DESIGN × DEVELOPMENT
              <br />
              BUILT WITH INTENT
            </div>
          </div>
        </div>
      </section>

      <section data-node-id="91:7094" aria-label="Meet the team" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-16">
        <div data-node-id="91:7095" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div data-node-id="91:7096">
            <div
              data-node-id="91:7097"
              className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              01 / THE PEOPLE BEHIND THE PIXELS
            </div>
            <h2
              data-node-id="91:7098"
              className="text-5xl font-bold uppercase leading-[52px] text-[#f7de9f]"
              style={CONDENSED}
            >
              MEET THE TEAM.
            </h2>
          </div>
          <div
            data-node-id="91:7099"
            className="text-xs font-semibold tracking-[0.08em] text-[#f9ce5c] uppercase"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            8THREADS / 09 MEMBERS
          </div>
        </div>

        <div data-node-id="91:7100" className="mb-16">
          <div data-node-id="91:7101" className="mb-10">
            <div
              data-node-id="91:7102"
              className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              CORE CONTRIBUTORS
            </div>
            <p
              data-node-id="91:7103"
              className="text-[28px] leading-8 font-semibold uppercase text-[#f7de9f]"
              style={CONDENSED}
            >
              The three team members currently leading the active build.
            </p>
          </div>

          <div data-node-id="91:7104" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreContributors.map((member) => (
              <article
                key={member.id}
                data-node-id={member.id}
                className="bg-[#252522] flex flex-col min-h-[672px]"
              >
                <div className="h-[440px]" aria-hidden="true" />
                <div className="flex-1 border-t border-[#9f6b08] px-6 pt-6 pb-8">
                  <div
                    className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-[14px]"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    {member.number} / CORE CONTRIBUTOR
                  </div>
                  <h3 className="text-[32px] leading-8 font-semibold uppercase text-[#f7de9f]" style={CONDENSED}>
                    MEMBER {member.number}
                  </h3>
                  <p className="mt-6 text-sm leading-5 text-[#f9ce5c]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    {member.caption}
                  </p>
                  {member.detail && (
                    <p
                      className="mt-8 text-sm leading-5 text-[#f9ce5c] whitespace-pre-line"
                      style={{ fontFamily: 'Barlow, sans-serif' }}
                    >
                      {member.detail}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div data-node-id="91:7125" className="mb-14">
          <div data-node-id="91:7126" className="mb-10">
            <div
              data-node-id="91:7127"
              className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-2"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              SHOUTOUT / THE WHOLE CREW
            </div>
            <p
              data-node-id="91:7128"
              className="text-[28px] leading-8 font-semibold uppercase text-[#f7de9f]"
              style={CONDENSED}
            >
              Nine members. One shared chapter. A shoutout to the rest of the crew.
            </p>
          </div>

          <div data-node-id="91:7129" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {shoutoutMembers.map((number) => (
              <article key={number} className="bg-[#252522] flex flex-col min-h-[276px]">
                <div className="h-48" aria-hidden="true" />
                <div className="px-3.5 pt-3.5 pb-4">
                  <div
                    className="text-xs font-semibold tracking-[0.08em] text-[#d8a016] uppercase mb-6"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    TEAM / {number}
                  </div>
                  <h3 className="text-[22px] leading-8 font-semibold uppercase text-[#f7de9f]" style={CONDENSED}>
                    MEMBER {number}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          data-node-id="91:7154"
          className="border border-[#9f6b08] px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <p
            data-node-id="91:7155"
            className="text-xs leading-4 text-[#f9ce5c]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Illustrative portraits and sample roles. Member labels are placeholders for the final team.
          </p>
          <p
            data-node-id="91:7156"
            className="text-xs font-semibold leading-4 tracking-[0.08em] text-[#d8a016] uppercase"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            INDIVIDUAL CRAFT. SHARED AMBITION.
          </p>
        </div>
      </section>
    </div>
  );
}
