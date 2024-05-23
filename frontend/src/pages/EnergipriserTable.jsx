import React from "react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("da-dk", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  });
};

const EnergipriserTable = ({ data }) => {
  const NO_DATA_COLUMNS = 5;

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs divide-y divide-gray-200">
        {data && (
          <>
            <thead>
              <tr>
                <th className="border">Hour UTC</th>
                <th className="border">Hour DK</th>
                <th className="border">Price area</th>
                <th className="border">Spot price (DKK)</th>
                <th className="border">Spot price (EUR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.total ? (
                data.records.map((record, index) => (
                  <tr key={index}>
                    <th className="border">{formatDate(record.HourUTC)}</th>
                    <th className="border">{formatDate(record.HourDK)}</th>
                    <th className="border">{record.PriceArea}</th>
                    <th className="border">{record.SpotPriceDKK.toFixed(2)}</th>
                    <th className="border">{record.SpotPriceEUR.toFixed(2)}</th>
                  </tr>
                ))
              ) : (
                <tr>
                  {Array.from({ length: NO_DATA_COLUMNS }).map((_, index) => (
                    <th key={index} className="border">
                      No data
                    </th>
                  ))}
                </tr>
              )}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default EnergipriserTable;
