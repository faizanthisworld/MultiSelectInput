document.addEventListener("DOMContentLoaded", () => {
  const states = [
    { name: "Alabama", abbrev: "AL" },
    { name: "Alaska", abbrev: "AK" },
    { name: "Arizona", abbrev: "AZ" },
    { name: "Arkansas", abbrev: "AR" },
    { name: "California", abbrev: "CA" },
    { name: "Colorado", abbrev: "CO" },
    { name: "Connecticut", abbrev: "CT" },
    { name: "Delaware", abbrev: "DE" },
    { name: "Florida", abbrev: "FL" },
    { name: "Georgia", abbrev: "GA" },
    { name: "Hawaii", abbrev: "HI" },
    { name: "Idaho", abbrev: "ID" },
    { name: "Illinois", abbrev: "IL" },
    { name: "Indiana", abbrev: "IN" },
    { name: "Iowa", abbrev: "IA" },
    { name: "Kansas", abbrev: "KS" },
    { name: "Kentucky", abbrev: "KY" },
    { name: "Louisiana", abbrev: "LA" },
    { name: "Maine", abbrev: "ME" },
    { name: "Maryland", abbrev: "MD" },
    { name: "Massachusetts", abbrev: "MA" },
    { name: "Michigan", abbrev: "MI" },
    { name: "Minnesota", abbrev: "MN" },
    { name: "Mississippi", abbrev: "MS" },
    { name: "Missouri", abbrev: "MO" },
    { name: "Montana", abbrev: "MT" },
    { name: "Nebraska", abbrev: "NE" },
    { name: "Nevada", abbrev: "NV" },
    { name: "New Hampshire", abbrev: "NH" },
    { name: "New Jersey", abbrev: "NJ" },
    { name: "New Mexico", abbrev: "NM" },
    { name: "New York", abbrev: "NY" },
    { name: "North Carolina", abbrev: "NC" },
    { name: "North Dakota", abbrev: "ND" },
    { name: "Ohio", abbrev: "OH" },
    { name: "Oklahoma", abbrev: "OK" },
    { name: "Oregon", abbrev: "OR" },
    { name: "Pennsylvania", abbrev: "PA" },
    { name: "Rhode Island", abbrev: "RI" },
    { name: "South Carolina", abbrev: "SC" },
    { name: "South Dakota", abbrev: "SD" },
    { name: "Tennessee", abbrev: "TN" },
    { name: "Texas", abbrev: "TX" },
    { name: "Utah", abbrev: "UT" },
    { name: "Vermont", abbrev: "VT" },
    { name: "Virginia", abbrev: "VA" },
    { name: "Washington", abbrev: "WA" },
    { name: "West Virginia", abbrev: "WV" },
    { name: "Wisconsin", abbrev: "WI" },
    { name: "Wyoming", abbrev: "WY" },
  ];
  const suggestions = document.querySelector("#suggestions");
  const search = document.querySelector("#search");
  hide(suggestions);
  search.addEventListener("focus", () => {
    show(suggestions);
    showSuggestion(states);
  });
  search.addEventListener("input", () => showSuggestion(states));
  document.addEventListener("click", (e) => {
    if (e.target !== search && e.target !== suggestions) hide(suggestions);
  });
});
let selectedStates = [];
function removeState(state, e) {
  const key = e.target.getAttribute("data-key");
  e.target.remove();
  selectedStates.splice(key, 1);
  state["selected"] = false;
}
function addItem(state, key) {
  hide(suggestions);
  search.value = "";
  const span = document.createElement("span");
  span.addEventListener("click", (e) => removeState(state, e));
  span.classList.add("state-item");
  addAttribute(span,"data-key",key)
  span.innerText = state.name;
  document.querySelector(".selected-states").append(span);
}
function showSuggestion(states) {
  const value = search.value.toLowerCase().trim();
  let filteredStates = states.filter((ele) => {
    return ele.name.toLowerCase().includes(value);
  });
  if (filteredStates.length == 0) suggestions.innerHTML = "Not Found!";
  else {
    suggestions.innerHTML = "";
    filteredStates.forEach((state) => {
      suggestions.append(populateList(state));
    });
  }
}
function populateList(item) {
  const li = document.createElement("li");
  li.textContent = item.name;
  li.addEventListener("click", () => {
    const key = item["abbrev"];
    if (selectedStates.indexOf(item) < 0) {
      item["selected"] = true;
      selectedStates.push(item);
      hide(suggestions);
      addItem(item, key);
    } else {
      selectedStates.splice(key, 1);
      document.querySelector(`span[data-key="${key}"]`).remove();
      item["selected"] = false;
    }
  });
  if (item["selected"]) {
    addAttribute(li, "class", "selected-state");
    addAttribute(li, "data-key", item["abbrev"]);
  }
  return li;
}
function hide(element) {
  element.classList.add("hide");
}
function show(element) {
  element.classList.remove("hide");
}
function addAttribute(element, a, v) {
  element.setAttribute(a, v);
}
function removeAttribute(element, a) {
  element.removeAttribute(a);
}
