import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">

          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-white text-center md:text-left">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="w-1/2 p-6 sm:w-1/2 md:w-1/2 lg:w-2/12">
            <div className="h-full text-center md:text-left">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-white">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="w-1/2 p-6 sm:w-1/2 md:w-1/2 lg:w-2/12">
            <div className="h-full text-center md:text-left">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-white">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals */}
          <div className="w-full p-6 sm:w-1/2 md:w-1/2 lg:w-3/12">
            <div className="h-full text-center md:text-left">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-white hover:text-gray-400" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer
