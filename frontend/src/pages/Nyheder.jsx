import { useEffect, useState } from "react";
import NyhederCard from "./NyhederCard";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import useRequestData from "../hooks/useRequestData";

const Nyheder = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchKey, setSearchKey] = useState("ai");

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "de", name: "German" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "he", name: "Hebrew" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "no", name: "Norwegian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "sv", name: "Swedish" },
    { code: "ud", name: "Undefined" },
    { code: "zh", name: "Chinese" },
  ];
  const [language, setLanguage] = useState("en");
  const sortings = [
    { code: "publishedAt", name: "Published At" },
    { code: "popularity", name: "Popularity" },
    { code: "relevancy", name: "Relevancy" },
  ];
  const [sorting, setsorting] = useState("publishedAt");

  useEffect(() => {
    handleSearch();
  }, [language, sorting, currentPage, pageSize]);

  const handleSearch = () => {
    let url = `https://newsapi.org/v2/everything?language=${language}&q=${searchKey}&sortBy=${sorting}&apiKey=${import.meta.env.VITE_APP_NEWSAPIKEY}&page=${currentPage}&pageSize=${pageSize}`;

    makeRequest(url);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}

      <Title titleText="Posts fra NewsAPI"></Title>

      {/* Søg */}
      <div className="flex justify-center">
        <input
          className="m-2 input input-bordered"
          type="text"
          placeholder="Søg noget"
          defaultValue={searchKey}
          required
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <button onClick={() => handleSearch()}>SØG</button>
      </div>

      <div>
        {/* Pick sprog */}
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          defaultValue={language}
          className="max-w-xs select select-bordered"
        >
          {languages.map((lang, index) => (
            <option key={index} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        {/* Pick sorting */}
        <select
          onChange={(e) => {
            setsorting(e.target.value);
          }}
          defaultValue={sorting}
          className="max-w-xs select select-bordered"
        >
          {sortings.map((lang, index) => (
            <option key={index} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {data &&
          data.articles
            .filter(
              (n) => n.title !== "[Removed]"
              /*.
                p.name.includes(Search) ||
                p.model.includes(Search) ||
                p.manufacturer.includes(Search) ||
                p.length.includes(Search) ||
                p.max_atmosphering_speed.includes(Search)
                */
            )
            .map((n, i) => <NyhederCard post={n} key={i} />)}
      </div>
      <div>
        {data && (
          <>
            <button onClick={() => setCurrentPage(currentPage - 1)} className="m-2 selected-none btn btn-error"
            disabled={currentPage <= 1}>
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} className="m-2 btn btn-success"
            disabled={currentPage >= data?.length - pageSize}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nyheder;
