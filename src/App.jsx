import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();
const App = () => {
  const [locations, setLocations] = useState([
    { name: "", type: "origin" },
    { name: "", type: "destination" },
    // { name: "", type: "stop" },
  ]);
  const [distance, setDistance] = useState(null);
  const [searchData, setSearchData] = useState();
  const [model, setModel] = useState(0);
   

  const handleAddStop = () => {
    setLocations([...locations, { name: "", type: "stop" }]);
  };

  const handleLocationChange = async (index, newName) => {
    
    const newLocations = [...locations];
    newLocations[index].name = newName;
    setLocations(newLocations);
    const timer = setTimeout(async () => {
      const results = await provider.search({ query: newName });
      setSearchData(results);
       console.log(results);
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleCalculate = () => {
    // Here you can call the Google Maps API to calculate the distance
    setDistance(1427);
  };
//console.log(locations[0]?.coordinates);
  const position = [51.505, -0.09];
  return (
    <div className="flex flex-col h-full w-full items-center pb-14 ">
      <div className="flex flex-col justify-center self-stretch w-full max-md:max-w-full">
        <div className="flex flex-col justify-center items-start px-16 py-1.5 w-full bg-white max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/93a716ae65ababdd2b737186503ea6a5eeed353a517cebf7b27b4f13da17d98e?apiKey=2b10f3d4f07b463b82ae2fcf31a50eea&"
            className="w-40 max-w-full aspect-[2.33] max-md:ml-2"
            alt="Logo"
          />
        </div>
      </div>
      <div className="justify-center px-5 mt-8 text-xl leading-6 text-center text-blue-800 max-md:max-w-full">
        <span className="text-blue-800">Let's </span>calculate{" "}
        <span className="font-semibold text-blue-800">distance </span>
        <span className="text-blue-800">from Google maps</span>
      </div>
      <div className="mt-4 w-full max-w-[1212px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-6 max-md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-5 max-md:mt-10">
                      {locations?.slice(0, 1)?.map((location, index) => (
                        <div key={index}>
                          <div className="text-sm leading-4 text-black"></div>
                          {location.type.charAt(0).toUpperCase() +
                            location.type.slice(1)}{" "}
                          <div className="flex gap-3 p-4 mt-1.5 bg-white rounded-md border border-solid border-zinc-200">
                            <div
                              className={`flex flex-col justify-center  items-center px-1 w-4 h-4 bg-white rounded-full border-2 border-solid border-zinc-800 stroke-[2px] ${
                                location.type === "origin" ? "bg-green-500" : ""
                              }`}
                            >
                              {location.type === "origin" && (
                                <div className="shrink-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-green-500 border-solid stroke-[1px]" />
                              )}
                            </div>
                            <input
                              className=" relative flex-auto text-base font-semibold leading-5 text-gray-800 bg-transparent border-none outline-none capitalize "
                              value={location.name}
                              onChange={(e) => {
                                handleLocationChange(index, e.target.value);
                                setModel(1);
                              }}
                              placeholder={`Enter ${location.type}`}
                            />
                            <div
                              className={`absolute mt-6 p-2 md:w-2/12 w-10/12  rounded backdrop-blur bg-neutral-200 
                                ${
                                  model == 0 || locations[0].name == ""
                                    ? "hidden"
                                    : ""
                                }`}
                            >
                              <div className="flex flex-col gap-2 ">
                                {searchData?.map((data, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 cursor-pointer  group"
                                    onClick={() => {
                                      setModel(0);
                                      setLocations([
                                        {
                                          name: data.label,
                                          type: "origin",
                                          coordinates: [data.y, data.x],
                                        },
                                        ...locations.slice(1),
                                      ]);
                                    }}
                                  >
                                    <div className="text-sm group-hover:text-neutral-900  leading-4 text-neutral-500 ">
                                      {data.label || "fetching..."}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {locations?.slice(2).map((location, index) => (
                        <div key={index}>
                          <div className="text-sm leading-4 text-black mt-4">
                            {location.type.charAt(0).toUpperCase() +
                              location.type.slice(1)}{" "}
                          </div>
                          <div className="flex gap-3 p-4 mt-1.5 bg-white rounded-md border border-solid border-zinc-200">
                            <div
                              className={`flex flex-col justify-center items-center px-1 w-4 h-4 bg-white rounded-full border-2 border-solid border-zinc-800 stroke-[2px] ${
                                location.type === "origin" ? "bg-green-500" : ""
                              }`}
                            >
                              <div className="shrink-0 w-2.5 h-2.5 bg-yellow-500 rounded-full border border-yellow-500 border-solid stroke-[1px]" />
                            </div>
                            <input
                              className="flex-auto text-base font-semibold leading-5 text-gray-800 bg-transparent border-none outline-none"
                              value={location.name}
                              onChange={(e) => {
                                handleLocationChange(index + 2, e.target.value);
                                setModel(index + 2);
                              }}
                              placeholder={`Enter ${location.type}`}
                            />
                            <div
                              className={`absolute mt-6 p-2 md:w-2/12 w-10/12  rounded backdrop-blur bg-neutral-200 
                                ${
                                  model == 0 || locations[0].name == ""
                                    ? "hidden"
                                    : ""
                                }`}
                            >
                              <div className="flex flex-col gap-2 ">
                                {searchData?.map((data, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 cursor-pointer  group"
                                    onClick={() => {
                                      setModel(0);
                                      setLocations([
                                        locations[0],
                                        ...locations.slice(1, index + 2),
                                        {
                                          name: data.label,
                                          type: "stop",
                                          coordinates: [data.y, data.x],
                                        },
                                        ...locations.slice(index + 2),
                                      ]);
                                    }}
                                  >
                                    <div className="text-sm group-hover:text-neutral-900  leading-4 text-neutral-500 ">
                                      {data.label || "fetching..."}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className="flex gap-1.5 self-end m-2 text-base leading-5 text-center text-zinc-800"
                        disabled={locations.length > 4}
                        onClick={handleAddStop}
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/591edf44b34eacea249208e71a1a5b42bbe2c7fdf3a352f3fd97b6f0fc829a19?apiKey=2b10f3d4f07b463b82ae2fcf31a50eea&"
                          className="shrink-0 aspect-square fill-white fill-opacity-0 w-[18px]"
                          alt="Add stop"
                        />
                        <div className="flex-auto">
                          {locations.length > 2
                            ? "Add another stop"
                            : "Add stop"}
                        </div>
                      </button>
                      {locations?.slice(1, 2).map((location, index) => (
                        <div key={index}>
                          <div className="text-sm leading-4 text-black">
                            {location.type.charAt(0).toUpperCase() +
                              location.type.slice(1)}{" "}
                          </div>
                          <div className="flex gap-3 p-4 mt-1.5 bg-white rounded-md border border-solid border-zinc-200">
                            <div
                              className={`flex flex-col justify-center items-center px-1 w-4 h-4 bg-white rounded-full border-2 border-solid border-zinc-800 stroke-[2px] ${
                                location.type === "origin" ? "bg-green-500" : ""
                              }`}
                            >
                              {location.type !== "origin" && (
                                <div className="shrink-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-green-500 border-solid stroke-[1px]" />
                              )}
                            </div>
                            <input
                              className="flex-auto text-base font-semibold leading-5 text-gray-800 bg-transparent border-none outline-none capitalize"
                              value={location.name}
                              onChange={(e) => {
                                handleLocationChange(index + 1, e.target.value);
                                setModel(2);
                              }}
                              placeholder={`Enter ${location.type}`}
                            />
                            <div
                              className={`absolute mt-6 p-2 md:w-2/12 w-10/12  rounded backdrop-blur bg-neutral-200 
                                ${
                                  model == 0 || locations[1].name == ""
                                    ? "hidden"
                                    : ""
                                }`}
                            >
                              <div className="flex flex-col gap-2 ">
                                {searchData?.map((data, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 cursor-pointer  group"
                                    onClick={() => {
                                      setModel(0);
                                      setLocations([
                                        locations[0],
                                        {
                                          name: data.label,
                                          type: "destination",
                                          coordinates: [data.y, data.x],
                                        },
                                        ...locations.slice(2),
                                      ]);
                                    }}
                                  >
                                    <div className="text-sm group-hover:text-neutral-900  leading-4 text-neutral-500 ">
                                      {data.label || "fetching..."}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col   max-md:ml-0 max-md:w-full">
                    <button
                      className="justify-center items-center mx-6   px-8 py-6 my-auto  text-lg font-semibold leading-5 text-center text-white whitespace-nowrap bg-blue-800 rounded-[32px] max-md:px-5 max-md:mt-10"
                      onClick={handleCalculate}
                    >
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
              {distance !== null && (
                <div className="flex flex-col justify-center py-0.5 mt-11 rounded-lg border border-solid border-slate-200 max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col pt-6 bg-white rounded-lg max-md:max-w-full">
                    <div className="flex gap-5 justify-center mx-7 font-bold leading-[120%] max-md:flex-wrap max-md:mr-2.5">
                      <div className="justify-center my-auto text-xl text-gray-800 whitespace-nowrap">
                        Distance
                      </div>
                      <div className="justify-center text-3xl text-right text-blue-600">
                        {distance} kms
                      </div>
                    </div>
                    <div className="flex z-10 flex-col justify-center mt-5 text-xs leading-4 text-gray-800 max-md:max-w-full">
                      <div className="flex flex-col justify-center px-8 py-7 rounded-none bg-slate-100 max-md:px-5 max-md:max-w-full">
                        <div className="justify-center max-md:max-w-full">
                          <span className="">The distance between </span>
                          <span className="font-bold">{locations[0].name}</span>
                          <span classNametext-sm leading-4 text-black="">
                            {" "}
                            and{" "}
                          </span>
                          <span className="font-bold">
                            {locations[locations.length - 1].name}
                          </span>
                          <span className=""> via the selected route is </span>
                          <span className="font-bold">{distance} kms</span>
                          <span className="">.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="m-4 w-full overflow-hidden ">
            <MapContainer
              center={locations[0]?.coordinates || position}
              zoom={1}
              scrollWheelZoom={false}
              style={{
                height: "400px",
                width: "95%",
                backgroundColor: "smoke",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={locations[0]?.coordinates || position}>
                <Popup>{locations[0]?.name}</Popup>
              </Marker>
              <Marker position={locations[1]?.coordinates || position}>
                <Popup>{locations[1]?.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
