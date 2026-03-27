"use client";

import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
        <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-400 text-xs sm:text-sm font-semibold mb-6">
              <Lock size={16} />
              Privacy & Data Protection
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-none tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Your privacy is important to us. This policy explains how Triad365
              collects, uses, and protects your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Triad365 ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website and use our services.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By using our services, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with the terms of this policy, please do not access our website
                or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Database size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    2. Information We Collect
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    We collect information that you provide directly to us and
                    information that is collected automatically when you use our
                    services.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2.1 Personal Information
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    When you register for an account, make a purchase, or
                    contact us, we may collect the following information:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Shipping and billing address</li>
                    <li>
                      Payment information (processed securely through
                      third-party providers)
                    </li>
                    <li>Account credentials</li>
                  </ul>
                </div>

                {/* Automatically Collected Information */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2.2 Automatically Collected Information
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    When you visit our website, we automatically collect certain
                    information about your device and usage:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                    <li>Device identifiers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Eye size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    We use the information we collect for various purposes,
                    including:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">
                    Service Delivery
                  </h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Process and fulfill orders</li>
                    <li>Manage your account</li>
                    <li>Provide customer support</li>
                    <li>Send order confirmations and updates</li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Communication</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Send promotional offers (with consent)</li>
                    <li>Respond to inquiries</li>
                    <li>Provide training materials</li>
                    <li>Share important updates</li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Improvement</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Analyze website usage</li>
                    <li>Improve our services</li>
                    <li>Develop new features</li>
                    <li>Personalize user experience</li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">
                    Legal & Security
                  </h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraud</li>
                    <li>Enforce our terms</li>
                    <li>Protect our rights</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cookies & Tracking */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Cookie size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    4. Cookies & Tracking Technologies
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    We use cookies and similar tracking technologies to enhance
                    your experience on our website.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">
                    Essential Cookies
                  </h4>
                  <p className="text-gray-400 text-sm">
                    These cookies are necessary for the website to function
                    properly. They enable basic functions like page navigation
                    and access to secure areas.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">
                    Analytics Cookies
                  </h4>
                  <p className="text-gray-400 text-sm">
                    We use analytics tools (such as Google Analytics) to
                    understand how visitors interact with our website. This
                    helps us improve our services and user experience.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">
                    Marketing Cookies
                  </h4>
                  <p className="text-gray-400 text-sm">
                    We use Meta Pixel and similar tools to track conversions and
                    deliver targeted advertisements. These cookies may track
                    your activity across different websites.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                We use third-party services to help us operate our business and
                provide our services. These services have their own privacy
                policies:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-sm">G</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Google Analytics
                    </h4>
                    <p className="text-gray-400 text-sm">
                      We use Google Analytics to analyze website traffic and
                      usage patterns. Google's privacy policy can be found at:{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 ml-1"
                      >
                        policies.google.com/privacy
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Meta Pixel</h4>
                    <p className="text-gray-400 text-sm">
                      We use Meta Pixel (Facebook Pixel) to track conversions
                      and optimize our advertising campaigns. Meta's privacy
                      policy can be found at:{" "}
                      <a
                        href="https://www.facebook.com/privacy/policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 ml-1"
                      >
                        facebook.com/privacy/policy
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold text-sm">P</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Payment Processors
                    </h4>
                    <p className="text-gray-400 text-sm">
                      We use secure third-party payment processors to handle
                      transactions. We do not store your full payment card
                      details on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    6. Data Security
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    We implement appropriate technical and organizational
                    measures to protect your personal information.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">6.1</strong> We use
                  industry-standard encryption (SSL/TLS) to protect data
                  transmitted between your browser and our servers.
                </p>
                <p>
                  <strong className="text-white">6.2</strong> Access to personal
                  information is restricted to authorized personnel who need it
                  to perform their duties.
                </p>
                <p>
                  <strong className="text-white">6.3</strong> We regularly
                  review our security practices and update them as necessary to
                  protect against unauthorized access, alteration, disclosure,
                  or destruction of your information.
                </p>
                <p>
                  <strong className="text-white">6.4</strong> While we strive to
                  protect your personal information, no method of transmission
                  over the Internet or electronic storage is 100% secure. We
                  cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Rights
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Depending on your location, you may have certain rights
                regarding your personal information:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Access</h4>
                  <p className="text-gray-400 text-sm">
                    You have the right to request a copy of the personal
                    information we hold about you.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Correction</h4>
                  <p className="text-gray-400 text-sm">
                    You have the right to request correction of any inaccurate
                    or incomplete information.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Deletion</h4>
                  <p className="text-gray-400 text-sm">
                    You have the right to request deletion of your personal
                    information, subject to certain exceptions.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Opt-Out</h4>
                  <p className="text-gray-400 text-sm">
                    You can opt out of receiving promotional communications from
                    us at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Data Retention
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">8.1</strong> We retain your
                  personal information for as long as necessary to fulfill the
                  purposes outlined in this policy, unless a longer retention
                  period is required or permitted by law.
                </p>
                <p>
                  <strong className="text-white">8.2</strong> When we no longer
                  need your personal information, we will securely delete or
                  anonymize it.
                </p>
                <p>
                  <strong className="text-white">8.3</strong> If you close your
                  account, we will delete your personal information within 30
                  days, except where we are required to retain it for legal
                  purposes.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Children's Privacy
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">9.1</strong> Our services are
                  not intended for individuals under the age of 18. We do not
                  knowingly collect personal information from children under 18.
                </p>
                <p>
                  <strong className="text-white">9.2</strong> If we become aware
                  that we have collected personal information from a child under
                  18, we will take steps to delete such information promptly.
                </p>
              </div>
            </div>

            {/* Changes to This Policy */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">10.1</strong> We may update
                  this Privacy Policy from time to time. We will notify you of
                  any changes by posting the new policy on this page and
                  updating the "Last updated" date.
                </p>
                <p>
                  <strong className="text-white">10.2</strong> We encourage you
                  to review this policy periodically to stay informed about how
                  we are protecting your information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl p-8 border border-orange-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield size={24} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    11. Contact Us
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="text-orange-400" />
                      <a
                        href="mailto:support@triad365.com"
                        className="text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        support@triad365.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={16} className="text-orange-400" />
                      <a
                        href="tel:+639203295363"
                        className="text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        0920 329 5363
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-orange-400" />
                      <span className="text-gray-400">Manila, Philippines</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-gray-500 text-sm">
              <p>Last updated: March 2026</p>
              <p className="mt-2">
                <Link
                  href="/terms"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  View our Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
