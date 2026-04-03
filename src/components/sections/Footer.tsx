export function Footer() {
  const linkClasses = 'text-white/60 hover:text-white transition-colors text-sm'
  const headingClasses = 'text-white/50 text-xs font-semibold uppercase tracking-wider mb-3'

  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-white">bill</span>
              <span className="text-violet-400">by</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Billing intelligence for law firms.
            </p>
          </div>

          {/* Column 2 — Product */}
          <div>
            <p className={headingClasses}>Product</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#how-it-works" className={linkClasses}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className={linkClasses}>
                  Features
                </a>
              </li>
              <li>
                <a href="#book" className={linkClasses}>
                  Book a Call
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <p className={headingClasses}>Company</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className={linkClasses}>
                  About
                </a>
              </li>
              <li>
                <a href="#" className={linkClasses}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <p className={headingClasses}>Legal</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className={linkClasses}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={linkClasses}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Billby Pty Ltd. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">Built in Australia 🇦🇺</p>
        </div>
      </div>
    </footer>
  )
}
