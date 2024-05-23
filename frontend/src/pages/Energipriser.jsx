import { useEffect, useState } from "react";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import Head from "../components/Head";
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <Head title="Energipriser" description="..." />
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}

      <Title titleText="Posts From Energipriser"></Title>

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex space-x-4 mb-2">
          <div>
            <label htmlFor="start" className="block text-sm font-medium text-gray-500">
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
            <label htmlFor="end" className="block text-sm font-medium text-gray-500">
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

          <button type="submit" className="mx-2 mt-6 w-20 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 hover:cursor-pointer">
            Search
          </button>
        </div>
      </form>

      <EnergipriserTable data={data} />
    </div>
  );
};

export default Energipriser;
