function getInvestimentView(investiment) {
  return `<div class="col">
    <div class="card" id="investiment-${investiment.id}">
      <div class="card-header">
        ${investiment.name}
        <div class="icon-trash" style="float: right; display: inline">
          <span 
            class="iconify" 
            data-icon="solar:trash-bin-minimalistic-broken"
            style="font-size: 1.2rem"
          >
          </span>
        </div>
      </div>
      <div class="card-body">
        <span>${investiment.value}</span>
      </div>
    </div>
  </div>`;
}

function addNewInvestimentView(investiment) {
  const view = getInvestimentView(investiment);

  document.querySelector('#investiment-grid').innerHTML += view;
}

function loadRemoveEvent() {
  const investimentCards = document.querySelectorAll('.card');

  for (const card of investimentCards) {
    const id = card.id.replace('investiment-', '');

    card.querySelector('.icon-trash').onclick = () => {
      fetch(`/investiments/${id}`, {
        method: 'delete',
      });

      card.remove();
    };
  }
}

const response = await fetch('/investiments');
const investiments = await response.json();

let investimentView = '';

for (const investiment of investiments) {
  investimentView += getInvestimentView(investiment);
}

loadRemoveEvent();

document.querySelector('#investiment-grid').innerHTML = investimentView;

document.querySelector('#submit').onclick = (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const value = Number(document.querySelector('#value').value);

  const investiment = { name, value };

  fetch('/investiments', {
    method: 'post',
    body: JSON.stringify(investiment),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  addNewInvestimentView(investiment);

  loadRemoveEvent();

  document.querySelector('#offcanvas-close').click();
};
