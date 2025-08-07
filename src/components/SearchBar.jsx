import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../features/weatherSclice.js";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    dispatch(setCity(input.trim()));
  };

  return (
    <div
      style={{
        backgroundColor: "#3C3633",
        display: "flex",
        justifyContent: "space-between",
        height: "10vh",
        padding: " 0.8rem",
      }}
    >
      <h2
        style={{ color: "#F2EDD1" }}
        className="text-4xl font-bold text-600  drop-shadow-md"
      >
        Weather App
      </h2>
      <form
        style={{
          height: "10vh",
          padding: " 0.2rem",
        }}
        onSubmit={handleSubmit}
      >
        <input
          style={{
            backgroundColor: "#FBFADA",
            border: "1px solid #ccc",
            padding: "10px",
            outline: "none",
            borderRadius: "8px",
          }}
          type="text"
          placeholder="Enter city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          style={{
            marginLeft: "10px",
            marginBottom: "5px",
            backgroundColor: "#747264",
          }}
          variant="contained"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
