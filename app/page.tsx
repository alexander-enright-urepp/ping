import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-sm text-[#7C3AED] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
          </span>
          The personal CRM for people who actually care about their network
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Relationships fade.<br />
          <span className="text-[#7C3AED]">Yours don't have to.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Ping is the ridiculously simple CRM that helps you stay close to the people who matter — 
          without the spreadsheets, the guilt, or the "oops, it's been 6 months" moments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/signup"
            className="px-8 py-4 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#6D28D9] transition-all hover:scale-105 shadow-lg shadow-purple-200"
          >
            Start for Free →
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
          >
            Log In
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
            ))}
          </div>
          <p>Join 1,000+ people staying connected</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ever feel like you're <span className="text-red-500">losing touch</span> with people you actually like?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            You meet someone great. You promise to grab coffee. Then life happens. 
            Three months later, you see their post and realize you never followed up.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">😅</div>
              <h3 className="font-semibold mb-2">The "Oops" Moment</h3>
              <p className="text-gray-600 text-sm">That awkward realization it's been 8 months since you last talked.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🗂️</div>
              <h3 className="font-semibold mb-2">The Spreadsheet Graveyard</h3>
              <p className="text-gray-600 text-sm">You made a "networking" spreadsheet. You never opened it again.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">😰</div>
              <h3 className="font-semibold mb-2">The LinkedIn Guilt</h3>
              <p className="text-gray-600 text-sm">Seeing someone's work anniversary and feeling like a bad friend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Ping. Your network's new best friend.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No complex pipelines. No sales jargon. Just a gentle nudge when someone needs a hello.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Add contacts in seconds</h3>
              <p className="text-gray-600 leading-relaxed">
                Name. Where you met. A quick note. Done. No 47-field forms asking for their company's tax ID.
              </p>
            </div>

            <div className="group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">One-tap "Pinged"</h3>
              <p className="text-gray-600 leading-relaxed">
                Just had coffee? Sent a text? Click "Pinged" and we reset the clock. No essays required.
              </p>
            </div>

            <div className="group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Visual relationship health</h3>
              <p className="text-gray-600 leading-relaxed">
                Green = you're good. Yellow = say hi soon. Red = it's been too long. No mental math required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How it works
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-[#7C3AED] text-white text-2xl font-bold rounded-2xl flex items-center justify-center shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Add someone you want to keep in touch with</h3>
                <p className="text-gray-600">Met someone cool at a conference? Old friend you want to reconnect with? Add them in 10 seconds.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-[#7C3AED] text-white text-2xl font-bold rounded-2xl flex items-center justify-center shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get gentle nudges when it's time to reach out</h3>
                <p className="text-gray-600">We'll surface the people you haven't talked to in a while. No guilt, just a friendly reminder.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-[#7C3AED] text-white text-2xl font-bold rounded-2xl flex items-center justify-center shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Mark it "Pinged" and move on</h3>
                <p className="text-gray-600">Had that coffee? Sent that email? One tap and you're done. We'll track the rest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Who's using Ping?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold mb-2">Freelancers</h3>
              <p className="text-sm text-gray-600">Stay top-of-mind with past clients without being annoying.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Founders</h3>
              <p className="text-sm text-gray-600">Keep your investor and advisor relationships warm.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-bold mb-2">Creatives</h3>
              <p className="text-sm text-gray-600">Maintain your network of collaborators and mentors.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Networkers</h3>
              <p className="text-sm text-gray-600">Actually follow up on all those "let's grab coffee" promises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-[#7C3AED]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Your network is your net worth.<br />Start investing in it.
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Free forever. No credit card required. Just better relationships.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-[#7C3AED] font-bold text-lg rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-gray-500 border-t border-gray-100">
        <p className="mb-2">© 2026 Ping</p>
        <p className="text-sm">Built for people who give a damn about their relationships.</p>
      </footer>
    </div>
  );
}
