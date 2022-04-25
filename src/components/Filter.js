import autocomplete from "../helpers/search_autocomplete";
import { useEffect } from "react";

function Filter() {
  let substrates = [
    "Painted Siding",
    "Painted Board and Bat",
    "Painted Stucco",
    "Vinyl",
    "Aluminum",
    "Wood Painted Siding",
  ];

  useEffect(() => {
    let colors = ["blue", "green", "yellow", "black"];
    autocomplete(document.getElementById("colorInput"), colors);
  }, []);

  return (
    <form className="filter_container">
      <div className="autocomplete">
        <input id="colorInput" type="text" placeholder="Enter a Color"></input>
      </div>
      <select>
        {substrates.map((substrate) => {
          return (
            <option value={substrate} key={substrate}>
              {substrate}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default Filter;
