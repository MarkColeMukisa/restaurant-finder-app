
export default function Banner() {
    return (
        <div className="w-full py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-600 to-red-600">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
                <p>🍽️ Over 500+ Top-Rated Restaurants</p>
                <span className="hidden sm:inline">|</span>
                <p>🏷️ Save up to 20% with Exclusive Offers</p>
                <span className="hidden sm:inline">|</span>
                <p>📍 Discover Local Favorites Near You</p>
            </div>
        </div>
    );
};