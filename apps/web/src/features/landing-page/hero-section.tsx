export function HeroSection() {
  return (
    <section className=" bg-linear-to-r  from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Refer Your Friends & Earn Credits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Share the love and get rewarded! Earn credits for every friend you refer and use them to buy amazing products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button type="button" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
              Start Referring Now
            </button>
            <button type="button" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-indigo-500 bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">$2</div>
              <div className="text-indigo-100">Credit Per Referral</div>
            </div>
            <div className="bg-indigo-500 bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-indigo-100">Happy Customers</div>
            </div>
            <div className="bg-indigo-500 bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">Unlimited</div>
              <div className="text-indigo-100">Referral Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
