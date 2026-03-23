import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 sm:px-8">
      <div className="mx-auto max-w-[1320px] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a href="#hero" className="transition-opacity hover:opacity-80">
            <img
              src="/Logo_hero.svg"
              alt="Kensho"
              className="h-5 w-auto"
              style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
            />
          </a>
          <span className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Kensho Capital Management GmbH
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/imprint"
            className="text-sm text-white/30 hover:text-white/80 transition-colors"
          >
            Imprint
          </Link>
          <Link
            href="/disclaimer"
            className="text-sm text-white/30 hover:text-white/80 transition-colors"
          >
            Disclaimer
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-white/30 hover:text-white/80 transition-colors"
          >
            Privacy Policy
          </Link>
          <a
            href="https://www.linkedin.com/company/kensho-vc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
