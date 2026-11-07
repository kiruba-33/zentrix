import { useState, useRef } from 'react'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function Contact() {
  const containerRef = useRef(null)

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })

  // Validation & Submission State
  const [errors, setErrors] = useState({})
  const [submissionNotice, setSubmissionNotice] = useState(null)

  const PROJECT_TYPES = [
    'Commercial Film',
    'Brand Film',
    'Product Film',
    'Creative Direction',
    'Cinematography',
    'Post-Production',
    'Other',
  ]

  const BUDGET_RANGES = [
    'Flexible / Undisclosed',
    '< $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000+',
  ]

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const heading = containerRef.current.querySelector('[data-contact-heading]')
      const formBlock = containerRef.current.querySelector('[data-contact-form]')

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: heading,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      if (formBlock) {
        gsap.fromTo(
          formBlock,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: formBlock,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    },
    { scope: containerRef }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project discipline.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details about your project.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Explain that this is a frontend-only build and submission requires backend integration
      setSubmissionNotice({
        type: 'validation-passed',
        data: { ...formData },
      })
    }
  }

  const mailtoHref = `mailto:hello@zentrix.studio?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.projectType || 'Film Production'} — ${formData.fullName}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.fullName}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nEstimated Budget: ${formData.budget || 'Not specified'}\n\nProject Details:\n${formData.message}`
  )}`

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#151515] text-paper border-t border-[#2A2A2A] overflow-hidden"
    >
      <div className="editorial-container">
        {/* Asymmetric 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column (Cols 1-5 on Desktop): Editorial Header & Studio Inquiries */}
          <div data-contact-heading className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue shrink-0 animate-pulse" aria-hidden="true" />
                <span className="editorial-kicker text-muted tracking-[0.16em]">
                  GET IN TOUCH // INQUIRIES
                </span>
              </div>

              <h2
                id="contact-heading"
                className="font-display font-extrabold uppercase text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92] tracking-[-0.035em] text-paper"
              >
                HAVE A STORY<br />
                WORTH{' '}
                <span className="font-serif-accent font-normal italic lowercase sm:normal-case tracking-normal text-paper">
                  telling
                </span>
                <span className="text-blue" aria-hidden="true">
                  ?
                </span>
              </h2>

              <p className="mt-8 text-body-lead text-muted max-w-md font-sans">
                Tell us what you're imagining. Let's make something meaningful together.
              </p>
            </div>

            {/* Direct Inquiries & Studio Locations */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[#2A2A2A] space-y-6">
              <div>
                <p className="text-[11px] font-display font-semibold tracking-wider uppercase text-muted">
                  DIRECT EMAIL INQUIRIES
                </p>
                <a
                  href="mailto:hello@zentrix.studio"
                  className="mt-1 inline-block font-display font-medium text-lg text-paper hover:text-blue transition-colors"
                >
                  hello@zentrix.studio
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-display tracking-wider uppercase text-muted pt-2">
                <span>STUDIO HUBS</span>
                <span className="editorial-numeral text-paper/80">LOS ANGELES — LONDON — TOKYO</span>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 6-12 on Desktop): Editorial Inquiry Form */}
          <div data-contact-form className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 border border-[#2A2A2A] p-6 sm:p-10 lg:p-12 bg-[#1B1B1B] shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
            >
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-display font-semibold tracking-wider uppercase text-muted mb-2"
                  >
                    FULL NAME <span className="text-blue">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="E.g. Elena Vance"
                    aria-required="true"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    className={`w-full px-4 py-3.5 bg-[#151515] border text-paper placeholder:text-muted/60 text-sm font-sans focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-[#333] focus:border-blue'
                    }`}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-400 font-sans">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-display font-semibold tracking-wider uppercase text-muted mb-2"
                  >
                    EMAIL ADDRESS <span className="text-blue">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@studio.com"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3.5 bg-[#151515] border text-paper placeholder:text-muted/60 text-sm font-sans focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-[#333] focus:border-blue'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 font-sans">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Project Type & Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-display font-semibold tracking-wider uppercase text-muted mb-2"
                  >
                    PROJECT TYPE <span className="text-blue">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.projectType ? 'true' : 'false'}
                    aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                    className={`w-full px-4 py-3.5 bg-[#151515] border text-paper text-sm font-sans focus:outline-none transition-colors ${
                      errors.projectType
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-[#333] focus:border-blue'
                    }`}
                  >
                    <option value="" disabled className="bg-[#151515] text-muted">
                      Select discipline...
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#151515] text-paper">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p id="projectType-error" role="alert" className="mt-1.5 text-xs text-red-400 font-sans">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-display font-semibold tracking-wider uppercase text-muted mb-2"
                  >
                    ESTIMATED BUDGET <span className="text-muted-dark font-normal lowercase">(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-[#151515] border border-[#333] text-paper text-sm font-sans focus:outline-none focus:border-blue transition-colors"
                  >
                    <option value="" className="bg-[#151515] text-muted">
                      Select budget range...
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range} className="bg-[#151515] text-paper">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Tell Us About Your Project */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-display font-semibold tracking-wider uppercase text-muted mb-2"
                >
                  TELL US ABOUT YOUR PROJECT <span className="text-blue">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, timeline, creative references or production goals..."
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3.5 bg-[#151515] border text-paper placeholder:text-muted/60 text-sm font-sans focus:outline-none transition-colors resize-y ${
                    errors.message
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-[#333] focus:border-blue'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400 font-sans">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-paper text-ink text-xs font-display font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:bg-paper/90 focus-visible:outline-blue cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="editorial-cta-arrow text-sm leading-none" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>

              {/* Transparent Integration Notice (Honest submission state without fake success claims) */}
              {submissionNotice && (
                <div
                  role="status"
                  className="mt-6 p-5 border border-blue/40 bg-blue/10 text-paper text-xs font-sans space-y-3"
                >
                  <div className="flex items-center gap-2 text-blue font-display font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-blue" />
                    <span>LOCAL VALIDATION PASSED // INTEGRATION POINT</span>
                  </div>
                  <p className="text-muted leading-relaxed">
                    All inquiry parameters are valid. As this is a client-side portfolio build without a live backend configured, messages cannot be transmitted automatically.
                  </p>
                  <p className="text-muted leading-relaxed font-mono text-[11px] bg-[#151515] p-2.5 border border-[#333]">
                    API Hook: POST /api/contact or Formspree/Resend configuration point in src/sections/Contact.jsx
                  </p>
                  <div className="pt-2">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue text-paper text-xs font-display font-bold tracking-wider uppercase hover:bg-blue/90 transition-colors"
                    >
                      <span>TRANSMIT DIRECTLY VIA EMAIL</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
