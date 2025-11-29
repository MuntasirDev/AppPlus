import React from "react";
import { Link } from "react-router";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Briefcase, Rss, Info, Phone } from "lucide-react";

const Footer = () => {
  const textGradientClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400";

  const linkTextStyle =
    "text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-indigo-400 to-teal-400 transition-colors duration-200";

  return (
    <footer className="bg-[#0a0b23] text-white pt-12 pb-6 border-t border-indigo-900/50">
      <div className="container mx-auto px-4 w-11/12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-indigo-900/50 pb-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-2">
              <Link
                to="/"
                className={`text-xl font-extrabold ${textGradientClass}`}
              >
                AppPlus
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4 max-w-xs">
              Providing reliable tech solutions for the future.
              <br />
              <span className="text-xs text-indigo-400">Since 2025</span>
            </p>
          </div>

          <nav>
            <h6 className={`text-lg font-bold mb-4 ${textGradientClass}`}>
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <Link to="/services/branding" className={linkTextStyle}>
                  Branding
                </Link>
              </li>
              <li>
                <Link to="/services/design" className={linkTextStyle}>
                  Design
                </Link>
              </li>
              <li>
                <Link to="/services/marketing" className={linkTextStyle}>
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/advertisement" className={linkTextStyle}>
                  Advertisement
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h6 className={`text-lg font-bold mb-4 ${textGradientClass}`}>
              Company
            </h6>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={linkTextStyle}>
                  <Info className="inline h-4 w-4 mr-2" />
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkTextStyle}>
                  <Phone className="inline h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={linkTextStyle}>
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/press" className={linkTextStyle}>
                  <Rss className="inline h-4 w-4 mr-2" />
                  Press kit
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h6 className={`text-lg font-bold mb-4 ${textGradientClass}`}>
              Connect
            </h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkTextStyle}
                >
                  <Github className="inline h-4 w-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkTextStyle}
                >
                  <Twitter className="inline h-4 w-4 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkTextStyle}
                >
                  <Linkedin className="inline h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@yourcompany.com"
                  className={linkTextStyle}
                >
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} ACME Industries Ltd. All rights
            reserved.
          </p>
          <div className="mt-3 md:mt-0 space-x-4">
            <Link to="/sitemap" className={linkTextStyle}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
