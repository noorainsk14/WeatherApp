import SearchBar from "./components/SearchBar.jsx";
import ActionAreaCard from "./components/ActionAreaCard.jsx";
import "@fontsource/roboto/300.css";

const Weather = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <SearchBar />
      <ActionAreaCard />
    </div>
  );
};

export default Weather;
