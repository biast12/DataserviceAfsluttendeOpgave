import { useEffect, useState } from "react";
import VejretCard from "./VejretCard";
import Title from "../components/Title";
import Error from "../pages/ErrorPages";
import Loader from "../components/Loader";
import useRequestData from "../hooks/useRequestData";
import LeafletMap from "./LeafletMap";

const Vejret = () => {
  // til at henter data fra OpenWeather
  const { makeRequest, isLoading, data, error } = useRequestData();

  // til at hente postnumre fra DAWA
  const {
    makeRequest: makeRequestDAWA,
    isLoading: isLoadingDAWA,
    data: dataDAWA,
    error: errorDAWA,
  } = useRequestData();

  const [unit, setUnit] = useState("metric");
  const [zip, setZip] = useState(false);
  const [lang, setLang] = useState("da");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (valid) {
      handleRequest();
    } else {
      handlePostnumre();
    }
  }, [zip]);
  const handleRequest = () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=${unit}&appid=${
      import.meta.env.VITE_APP_WEATHERAPIKEY
    }`;

    if (zip) {
      url += `&zip=${zip},dk`;
    }

    if (lang) {
      url += "&lang=" + lang;
    }

    makeRequest(url);
  };

  const handlePostnumre = () => {
    let url = `https://api.dataforsyningen.dk/postnumre/autocomplete`;

    if (zip) {
      url += "?q=" + zip;
    }

    makeRequestDAWA(url);
  };

  return (
    <div className="flex flex-col items-center">
      {(error || errorDAWA) && <Error statusCode={error || errorDAWA} />}
      {(isLoading || isLoadingDAWA) && <Loader />}
      <Title titleText="Vejret"></Title>
      <input
        list="postnrlist"
        maxLength="4"
        type="text"
        pattern="^[0-9]{4}"
        required
        placeholder="Indtast et postnummer"
        className="input input-bordered"
        onChange={(e) => {
          setZip(e.target.value);
          setValid(e.target.validity.valid);
        }}
      ></input>

      <datalist id="postnrlist">
        {dataDAWA &&
          dataDAWA.map((p) => (
            <option value={p.postnummer.nr} key={p.postnummer.nr}>
              {p.tekst}
            </option>
          ))}
      </datalist>
      {data && (
        <>
          <h2 className="text-2xl">Vejret i {data.city.name}</h2>
          <p>
            Sol op: kl.
            {new Date(data.city.sunrise * 1000).toLocaleTimeString("da-dk", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p>
            Sol ned: kl.
            {new Date(data.city.sunset * 1000).toLocaleTimeString("da-dk", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>

          <div className="flex flex-wrap justify-center">
            {data.list.map((dataItem) => (
              <VejretCard data={dataItem} key={dataItem.id} />
            ))}
            <LeafletMap
              lat={data.city.coord.lat}
              lon={data.city.coord.lon}
              zoom={10}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Vejret;
