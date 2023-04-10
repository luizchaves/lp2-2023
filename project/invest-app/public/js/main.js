function formatCurrency(value) {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

function getInvestimentView(investiment) {
  return `<div class="col" id="investiment-${investiment.id}">
    <div class="card">
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
        <span class="fw-bold">Valor:</span> ${formatCurrency(investiment.value)}
      </div>
    </div>
  </div>`;
}

function addInvestimentView(investiment) {
  const investimentsGrid = document.querySelector('#investiment-grid');

  const investimentView = getInvestimentView(investiment);

  investimentsGrid.insertAdjacentHTML('beforeend', investimentView);

  const investimentCard = document.querySelector(
    `#investiment-${investiment.id}`
  );

  investimentCard.querySelector('.icon-trash').onclick = () => {
    fetch(`/investiments/${investiment.id}`, {
      method: 'delete',
    });

    investimentCard.remove();
  };
}

async function loadInvestiments() {
  const response = await fetch('/investiments');

  const investiments = await response.json();

  for (const investiment of investiments) {
    addInvestimentView(investiment);
  }
}

function loadFormSubmit() {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.replace(',', '.');

    const value = Number(document.querySelector('#value').value);

    const investiment = { name, value };

    const response = await fetch('/investiments', {
      method: 'post',
      body: JSON.stringify(investiment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newInvestiment = await response.json();

    addInvestimentView(newInvestiment);

    form.reset();

    document.querySelector('#offcanvas-close').click();
  };
}

loadInvestiments();

loadFormSubmit();
