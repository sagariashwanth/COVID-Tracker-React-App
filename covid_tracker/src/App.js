import "./App.css";
import "./Table.css";
import { sortData, prettyPrintStat } from "./utils.js";
import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem, Select, Card, CardContent } from "@material-ui/core";
import Infobox from "./infobox";
import Map from "./Map.js";
import Table from "./Table.js";
import LineGraph from "./LineGraph.js";
import "leaflet/dist/leaflet.css"; //for Map

// ----------------This is the code for dropdown with countries-------------------------------
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.8076, lng: -40.4796 }); //center of pacific ocean points
  const [mapZoom, setMapZoom] = useState(3); // 3 is the zoom value where you can actually see the map
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases"); // this state is created to keep track of cases

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);
  //useEffect runs a piece of code that runs on given condition
  useEffect(() => {
    // use a async function to send a req and wait for it then do something with the input you receive
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        // with the entire response just take the json form of response
        .then((response) => response.json())
        //assuming ur response in name of data here
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          settableData(sortedData); //entire table data is sorted by cases.
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  //------------------------onCountryChange on Dropdown -------------------------------------------
  const onCountryChange = async (event) => {
    // coutryCode is the variable for storing the country you click everytime and then you set it to setCountry
    // which was initially set to worldwide
    const countryCode = event.target.value;
    setCountry(countryCode);

    //--------you have 2 options as worldwide and list of countries in your dropdown
    // so here you are using ternary operator to choose different API url depending upon option user clicks---------
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`; //this ${countryCode} will give data about
    //particular country you select instead of entire countries data

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setcountryInfo(data);
        //Here you need to setMapCenter becoz whenever you select a particular country from dropdown
        //automatically that country has to be centered in Map.
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <div className="app">
      {/* contains left part of wireframe ie; div.app_left*/}
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* ------------------------------------The 3 statistics box and we import component
       from infobox.js and Infobox comes from Material UI-------------------------------*/}
        <div className="app_stats">
          <Infobox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Covid cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />

          <Infobox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)} //this prettyPrintStat gives you + sign
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <Infobox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/*------------------------------ This is the code for rendering Map ---------------------------*/}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      {/* contains right part of wireframe ie; app_right */}
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>

        {/* Table with countries */}
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
