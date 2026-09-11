export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Muhammad Taha Portfolio',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <section className="section-padding container-main">
        <div className="max-w-[800px] mx-auto">
          <h1 className="heading-h2 mb-8">Privacy Policy</h1>
          <p className="text-sm text-text-muted mb-8">Last updated: September 10, 2026</p>

          <div className="space-y-8 text-text-secondary">
            <div>
              <h2 className="heading-h4 mb-4">Information I Collect</h2>
              <p className="font-body-md">
                When you use the contact form, I collect your name, email address, and message
                content. This information is used solely to respond to your inquiry.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">How I Use Your Information</h2>
              <p className="font-body-md">
                I use the information you provide to respond to your messages and inquiries. I do
                not sell, trade, or otherwise transfer your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">Data Storage</h2>
              <p className="font-body-md">
                Contact form submissions are stored securely in a database. I retain this data only
                as long as necessary to fulfill the purposes for which it was collected.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">Cookies</h2>
              <p className="font-body-md">
                This website uses only essential cookies required for authentication (admin panel).
                No tracking or analytics cookies are used.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">Third-Party Services</h2>
              <p className="font-body-md">
                This website is hosted on Cloudflare. Email is sent via Resend. Images may be stored
                on Cloudflare R2. These services have their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">Your Rights</h2>
              <p className="font-body-md">
                You have the right to request access to, correction of, or deletion of your personal
                data. To exercise these rights, please contact me at muhammadtahafarooq22@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="heading-h4 mb-4">Contact</h2>
              <p className="font-body-md">
                If you have questions about this privacy policy, please contact me at{' '}
                <a
                  href="mailto:muhammadtahafarooq22@gmail.com"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  muhammadtahafarooq22@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
