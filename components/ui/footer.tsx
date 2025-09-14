import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${
            border
              ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]"
              : ""
          }`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <p className="text-xs text-gray-400">
              © 2025 • Sendforsign, Inc. • Designed with love
            </p>
            <p className="text-xs text-gray-400">
              1111B S Governors Ave STE 7848 Dover, DE 19904
            </p>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/about/vision"
                  target="_blank"
                >
                  About Sendforsign
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://sendforsign.com/changelog"
                  target="_blank"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/introduction"
                  target="_blank"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://sendforsign.com/blog"
                  target="_blank"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/about/compliance"
                  target="_blank"
                >
                  Legal Compliance
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/usecase/firstdoc"
                  target="_blank"
                >
                  Send your first document
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/usecase/firsttemplate"
                  target="_blank"
                >
                  Draft a template
                </Link>
              </li>
            </ul>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/about/termsandconditions"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://about.sendforsign.com/about/privacypolicy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

           {/* 2nd block */}
           <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://www.linkedin.com/company/sendforsign/about/"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-gray-600"
                  href="https://www.youtube.com/@Sendforsign/videos"
                  target="_blank"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

          

        
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[148px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['ИИ_PRO'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['ИИ_PRO'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
