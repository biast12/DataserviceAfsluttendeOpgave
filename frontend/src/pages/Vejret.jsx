import { useEffect, useState } from "react";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import Head from "../components/Head";
import useRequestData from "../hooks/useRequestData";
import LeafletMap from "./LeafletMap";
import VejretCard from "./VejretCard";

const Vejret = () => {
  // til at henter data fra OpenWeather
  const { makeRequest, isLoading, data, error } = useRequestData();

  // til at hente postnumre fra DAWA
  const { makeRequest: makeRequestDAWA, isLoading: isLoadingDAWA, data: dataDAWA, error: errorDAWA } = useRequestData();

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

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("da-dk", {
      hour: "2-digit",
      minute: "numeric",
    });
  };

  const handleRequest = () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?units=${unit}&appid=${import.meta.env.VITE_APP_WEATHERAPIKEY}`;

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
      <Head title="Vejret" description="..." />
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
        className="input input-bordered mb-2"
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
          <p className="m-1">Sol op: kl. {formatDate(data.city.sunrise)}</p>
          <p className="m-1">Sol ned: kl. {formatDate(data.city.sunset)}</p>

          <div className="flex flex-wrap justify-center">
            {data.list.map((dataItem) => (
              <VejretCard data={dataItem} key={dataItem.id} />
            ))}
            <LeafletMap lat={data.city.coord.lat} lon={data.city.coord.lon} zoom={10} />
          </div>
        </>
      )}
    </div>
  );
};

export default Vejret;
