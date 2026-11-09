import { type FormEvent } from 'react'
import { ArrowUpRight, Mail, User } from 'lucide-react'
import { Field, Input, PrimaryButton, SectionHeading, Select, Textarea, Eyebrow } from '../../../components/ui'

export function EnquiryFormSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section id="enquiry" data-node-id="8:48201" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
      <Eyebrow>Your enquiry / Hybrid design extension</Eyebrow>
      <SectionHeading className="mt-4">Tell us what&apos;s next.</SectionHeading>
      <p className="mt-6 text-lg leading-7 text-lambo-secondary">
        Select your topic and tell us how we can help. This design demonstrates the intended enquiry experience; it is
        not connected to customer care.
      </p>

      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field id="inquiry-category" label="Inquiry category" required hint="Sales, ownership, company or other enquiry.">
            <Select id="inquiry-category" required defaultValue="">
              <option value="" disabled>
                Choose a category
              </option>
              <option value="sales">Sales</option>
              <option value="ownership">Ownership</option>
              <option value="company">Company</option>
              <option value="other">Other enquiry</option>
            </Select>
          </Field>
          <Field id="model-of-interest" label="Model of interest" hint="Optional. Choose the model you wish to explore.">
            <Select id="model-of-interest" defaultValue="Temerario">
              <option value="Temerario">Temerario</option>
              <option value="Revuelto">Revuelto</option>
              <option value="Urus">Urus</option>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field id="full-name" label="Full name" required hint="Tell us how you would like to be addressed.">
            <div className="relative">
              <Input id="full-name" type="text" required placeholder="Your full name" className="pr-10" />
              <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
            </div>
          </Field>
          <Field id="email" label="Email address" required hint="We will use this address to respond to your enquiry.">
            <div className="relative">
              <Input id="email" type="email" required placeholder="you@example.com" className="pr-10" />
              <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
            </div>
          </Field>
        </div>

        <Field id="country" label="Country / Region" required hint="This helps identify the appropriate contact.">
          <Select id="country" required defaultValue="">
            <option value="" disabled>
              Choose your country
            </option>
            <option value="Italy">Italy</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Switzerland">Switzerland</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Monaco">Monaco</option>
            <option value="Vietnam">Vietnam</option>
          </Select>
        </Field>

        <Field id="message" label="Your message" required hint="Please do not include sensitive personal information.">
          <Textarea
            id="message"
            required
            placeholder="Tell us what you would like to explore."
            className="h-[180px] resize-none"
          />
        </Field>

        <div className="flex flex-col gap-6">
          <div>
            <label className="flex items-start gap-3 text-base text-lambo-primary">
              <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-lambo-primary" />
              <span>I have read the privacy notice and consent to this enquiry. *</span>
            </label>
            <p className="mt-2 pl-8 text-xs text-lambo-primary/70">
              Required to continue in the proposed production experience.
            </p>
          </div>
          <div>
            <label className="flex items-start gap-3 text-base text-lambo-primary">
              <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-lambo-primary" />
              <span>Send me model news and experiences (optional).</span>
            </label>
            <p className="mt-2 pl-8 text-xs text-lambo-primary/70">
              You can update this preference at any time.
            </p>
          </div>
        </div>

        <div>
          <PrimaryButton type="submit" icon={<ArrowUpRight className="h-4 w-4" />}>
            Send enquiry
          </PrimaryButton>
          <p className="mt-4 text-xs text-lambo-hover">
            * Required fields. Illustrative form only: no enquiry is submitted and no personal information is collected.
          </p>
        </div>
      </form>
    </section>
  )
}
