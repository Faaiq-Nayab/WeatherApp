import { useState } from "react";
function App() {
  let [city, setCity] = useState(null);
  let [wDetails, setWDetails] = useState(null);
  let [isloading, setIsLoading] = useState(false);

  let getData = (event) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod == "404") {
          setWDetails(undefined);
        } else {
          setWDetails(data);
        }
        setIsLoading(false);
      });
    event.preventDefault();
    setCity("");
  };

  return (
    <div className="min-h-screen w-full bg-[#4aacb1] px-4">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="py-10 text-center text-3xl font-black tracking-tight text-white drop-shadow-md sm:py-12 sm:text-4xl md:text-5xl">
          Simple <span className="text-[#fff3a3]">Weather</span> App
        </h1>
        <form
          onSubmit={getData}
          className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11 w-full rounded-md border border-white/40 bg-white/15 px-4 text-white placeholder:text-white/70 outline-none backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white/20 focus:ring-2 focus:ring-white/30 sm:flex-1"
          />

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-white px-5 font-semibold text-[#28787c] cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff3a3] hover:shadow-xl active:scale-95 sm:w-auto"
          >
            Search Location
          </button>
        </form>
        {isloading ? (
          <img
            src="https://i.pinimg.com/originals/e0/34/1d/e0341dab7619da163adf938cf2d162c9.gif"
            alt="Loading..."
            className={
              " mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]  " + (isloading ? "" : "hidden")
            }
          />
        ) : wDetails ? (
          <>
            <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              <h3 className="text-2xl font-bold sm:text-3xl">
                {wDetails.name}
                <span className="ml-2 rounded-full bg-[#fff3a3] px-3 py-1 text-sm font-bold text-[#28787c]">
                  {wDetails.sys.country}
                </span>
              </h3>
              <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                {wDetails.main.temp}°C
              </h2>
              <img
                src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`}
                alt="Weather Icon"
                className="mx-auto my-4 h-24 w-24"
              />
              <p className="text-center text-lg font-medium text-gray-600">
                {wDetails.weather[0].description}
              </p>
            </div>
          </>
        ) : (
          <p className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center">
            No Data Found
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
