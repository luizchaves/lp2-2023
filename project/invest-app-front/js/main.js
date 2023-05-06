const response = await fetch('./data/investments.json');
const data = await response.json();

let investmentView = '';

for (const investment of data.investments) {
  investmentView += getInvestmentView(investment);
}

document.querySelector('#investment-grid').innerHTML = investmentView;

function getInvestmentView(investment) {
  return `<div class="col">
    <div class="card">
      <div class="card-header">${investment.name}</div>
      <div class="card-body">
        <span>${investment.value}</span>
      </div>
    </div>
  </div>`;
}
