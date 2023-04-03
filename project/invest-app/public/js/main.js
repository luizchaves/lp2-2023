const response = await fetch('/investiments');
const investiments = await response.json();

let investimentView = '';

for (const investiment of investiments) {
  investimentView += getInvestimentView(investiment);
}

document.querySelector('#investiment-grid').innerHTML = investimentView;

function getInvestimentView(investiment) {
  return `<div class="col">
    <div class="card">
      <div class="card-header">${investiment.name}</div>
      <div class="card-body">
        <span>${investiment.value}</span>
      </div>
    </div>
  </div>`;
}
