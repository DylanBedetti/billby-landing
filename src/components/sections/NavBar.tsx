import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeDrawer = () => setDrawerOpen(false)

  const handleDrawerNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setDrawerOpen(false)
    // Wait for drawer close animation before scrolling
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 220)
  }

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/70 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Wordmark */}
            <a href="#" className="text-xl font-bold tracking-tight text-foreground">
              bill<span className="text-primary">by</span>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="#book">
                Book a Call
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <span
                className={[
                  'block w-5 h-0.5 bg-foreground transition-all duration-200',
                  drawerOpen ? 'translate-y-2 rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-0.5 bg-foreground transition-all duration-200',
                  drawerOpen ? 'opacity-0' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-0.5 bg-foreground transition-all duration-200',
                  drawerOpen ? '-translate-y-2 -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden md:hidden border-t border-border bg-white/95 backdrop-blur-md"
            >
              <nav className="flex flex-col px-4 py-4 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleDrawerNavClick(e, link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2">
                  <Button variant="primary" size="sm" href="#book" onClick={closeDrawer} className="w-full justify-center">
                    Book a Call
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
