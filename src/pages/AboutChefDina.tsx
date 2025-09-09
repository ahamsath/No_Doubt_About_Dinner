import { Link } from 'react-router-dom'

function AboutChefDina() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top utility bar */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-stone-800 shadow-md border border-stone-200 hover:bg-white active:bg-stone-100 transition-colors"
        >
          ← Back to Menu
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src="/chef-logo.png"
            alt="Chef Dina"
            className="mx-auto h-28 w-28 sm:h-36 sm:w-36 rounded-full object-contain mb-4"
          />
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">Meet Chef Dina</h1>
          <p className="mt-3 sm:mt-4 text-stone-600 text-base sm:text-lg max-w-3xl mx-auto">
            A personal chef rooted in New England hospitality—crafting thoughtful meals and unforgettable gatherings.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto grid gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">From Family Table to Your Event</h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              Dina grew up learning that the best conversations happen over a warm dish. After years
              cooking for friends, neighbors, and private events, she turned a passion for seasonal
              ingredients into a devoted personal chef service. Today, she partners with families and
              teams across Milton and Quincy to remove the stress from mealtime—and add a little magic instead.
            </p>
            <p className="mt-3 text-stone-700 leading-relaxed">
              Her food is elevated yet approachable: crisp, vibrant salads; slow-simmered sauces;
              perfectly roasted mains; and desserts that invite a lingering fork. Every menu is tailored,
              every ingredient intentional, and every service designed to feel effortless.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
            <h3 className="text-xl font-semibold text-stone-900">Philosophy</h3>
            <ul className="mt-3 space-y-3 text-stone-700">
              <li>• Seasonal sourcing from trusted local purveyors</li>
              <li>• Thoughtful menus for dietary goals and preferences</li>
              <li>• Restaurant-level polish with the comfort of home</li>
              <li>• Clear communication, punctuality, and a spotless kitchen</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Signatures */}
      <section className="px-4 py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Guest Favorites</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-xl border border-stone-200 p-5 shadow-sm bg-stone-50">
              <h3 className="font-semibold text-stone-900">Truffle Risotto</h3>
              <p className="mt-2 text-stone-700 text-sm">
                Arborio rice coaxed to creamy perfection, finished with black truffle and aged parmesan.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 p-5 shadow-sm bg-stone-50">
              <h3 className="font-semibold text-stone-900">Seared Duck with Cherry Gastrique</h3>
              <p className="mt-2 text-stone-700 text-sm">
                Crisp skin, tender meat, and a bright cherry reduction that keeps guests talking.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 p-5 shadow-sm bg-stone-50">
              <h3 className="font-semibold text-stone-900">Chocolate Soufflé</h3>
              <p className="mt-2 text-stone-700 text-sm">
                A cloud-light finish—served right from the oven with vanilla bean ice cream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Weekly Meals</h3>
            <p className="mt-2 text-stone-700 text-sm leading-relaxed">
              Thoughtfully prepped dinners for busy weeks—nourishing, flavorful, and ready when you are.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Intimate Dinners</h3>
            <p className="mt-2 text-stone-700 text-sm leading-relaxed">
              A private, chef-led dining experience at home—perfect for date nights and small celebrations.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Catering & Events</h3>
            <p className="mt-2 text-stone-700 text-sm leading-relaxed">
              From showers to corporate gatherings, Dina manages menus, timing, and service with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">What Guests Say</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <blockquote className="rounded-xl border border-stone-200 p-5 bg-stone-50 shadow-sm text-stone-800">
              “Dina made our anniversary dinner feel like a boutique restaurant—without leaving home.”
              <footer className="mt-3 text-sm text-stone-500">— Melissa, Milton</footer>
            </blockquote>
            <blockquote className="rounded-xl border border-stone-200 p-5 bg-stone-50 shadow-sm text-stone-800">
              “Our team still talks about the roasted salmon and citrus salad. Impeccable service.”
              <footer className="mt-3 text-sm text-stone-500">— Daniel, Quincy</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center bg-stone-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to plan your menu?</h2>
          <p className="mt-3 text-stone-200 max-w-2xl mx-auto">
            Explore the menu and add dishes to your cart, or reach out for a bespoke event plan.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-full bg-white text-stone-900 px-5 py-3 font-semibold hover:bg-stone-100 active:bg-stone-200 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </section>
      <div className="h-8" />
    </div>
  )
}

export default AboutChefDina


