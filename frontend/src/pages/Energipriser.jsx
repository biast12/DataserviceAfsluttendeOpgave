import { useEffect, useState } from "react";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import useRequestData from "../hooks/useRequestData";
import EnergipriserTable from "./EnergipriserTable";

const Energipriser = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [priceArea, setPriceArea] = useState(false);
  const priceAreas = [
    { code: false, name: "All" },
    { code: "dk1", name: "Danmark: Vest for Storebælt" },
    { code: "dk2", name: "Danmark: Øst for Storebælt" },
    { code: "NO2", name: "Norway" },
    { code: "SE3", name: "Sverige: ..." },
    { code: "SE4", name: "Sverige: ..." },
    { code: "SYSTEM", name: "SYSTEM" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  useEffect(() => {
    setStart(today);
    setEnd(today);
  }, []);

  const handleSearch = () => {
    console.log(start);
    console.log(end);
    let url = `https://api.energidataservice.dk/dataset/Elspotprices?offset=0`;

    url += `&start=${start}T00:00`;
    url += `&end=${end}T00:00`;
    if (priceArea) {
      url += `&filter=%7B%22PriceArea%22:[%22${priceArea}%22]%7D`;
    }
    url += "&sort=HourUTC%20DESC";

    makeRequest(url);
  };

  const downloadJSON = (data, filename) => {
    const jsonStr = JSON.stringify(data);
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}

      <Title
        titleText="Posts fra Energipriser"
      ></Title>

      {/* Pick priceArea */}
      <select
        onChange={(e) => {
          setPriceArea(e.target.value);
        }}
        defaultValue={priceArea}
        className="max-w-xs select select-bordered w-full p-2 rounded-md shadow-sm"
      >
        {priceAreas.map((price, index) => (
          <option key={index} value={price.code}>
            {price.name}
          </option>
        ))}
      </select>

      <div className="flex space-x-4">
        <div>
          <label
            htmlFor="start"
            className="block text-sm font-medium text-gray-500"
          >
            Start date:
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            defaultValue={today}
            onChange={(e) => {
              setStart(e.target.value);
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="end"
            className="block text-sm font-medium text-gray-500"
          >
            End date:
          </label>
          <input
            type="date"
            id="end"
            name="trip-end"
            defaultValue={today}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        SØG
      </button>
      {data && (
        <button
          onClick={() => downloadJSON(data, today + "-data.json")}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Download JSON
        </button>
      )}
      <EnergipriserTable data={data} />
    </div>
  );
};

export default Energipriser;
