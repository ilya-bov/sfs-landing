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
    </footer>
  );
}
