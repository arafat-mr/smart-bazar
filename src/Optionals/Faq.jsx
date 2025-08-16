import React from "react";

const faqs = [
  {
    question: "How often are the prices updated?",
    answer: "Prices are updated daily to ensure you get accurate information from your local markets."
  },
  {
    question: "Can I track specific products?",
    answer: "Yes! You can add items to your watchlist and monitor their prices over time."
  },
  {
    question: "Is SmartBazar free to use?",
    answer: "Absolutely. Our platform is free for all users, with optional premium features coming soon."
  },
  {
    question: "Can I suggest a market or vendor?",
    answer: "Yes, you can contact us via the Contact page and suggest new markets or vendors to include."
  },
  {
    question: "Can I compare prices between multiple markets?",
    answer: "Yes! The dashboard allows you to view price differences for the same product across local markets."
  },
  {
    question: "Do I need an account to use SmartBazar?",
    answer: "You can browse prices without an account, but creating one lets you save watchlists and personalized settings."
  }
];

   const Faq=()=> {
  return (
    <section
      className="min-h-screen px-5 py-10 md:px-20 md:py-16"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
          radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
          radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
          radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
          linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
        `
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked <span className="text-purple-700">Questions</span>
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 shadow-md">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-800 dark:text-gray-300 text-base md:text-lg">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Faq