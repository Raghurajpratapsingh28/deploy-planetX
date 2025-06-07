<div>
  <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Gym Owner</h3>
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-md mb-3">
        {gym.owner.name.slice(0, 2).toUpperCase()}
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{gym.owner.name}</h4>
      <div className="flex items-center my-2">
        {renderStars(4.5)}
        <span className="ml-1 font-medium">4.5</span>
        <span className="ml-1 text-xs text-gray-500">
          ({reviews.length} reviews)
        </span>
      </div>
      <div className="w-full mt-4 space-y-3">
        <a
          href={`https://wa.me/${gym.owner.whatsappMobile.replace(/\s+/g, "")}`}
          className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <WhatsApp className="h-5 w-5" />
          Message on WhatsApp
        </a>
        <a
          href={`tel:${gym.owner.mobile.replace(/\s+/g, "")}`}
          className="flex items-center justify-center gap-2 w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors font-medium"
        >
          <Phone className="h-5 w-5" />
          Call Owner
        </a>
        <button
          onClick={() => setShowNotify(true)}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Notify Owner
        </button>
      </div>
    </div>
  </div>
</div>;
