function formatCurrency(value) {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

function getInvestmentView(investment) {
  const category = investment.category.name;

  const category_class = `investment-${category
    .toLowerCase()
    .replaceAll(' ', '-')}`;

  return `<div class="col" id="investment-${investment.id}">
    <div class="card">
      <div class="card-header">
        ${investment.name}
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
        <div>
          <span class="fw-bold">Valor:</span> ${formatCurrency(
            investment.value
          )}
        </div>
        <div>
          <span class="fw-bold">Categoria:</span>
          <span class="badge ${category_class}">${category}</span>
        </div>
      </div>
    </div>
  </div>`;
}

function addInvestmentView(investment) {
  const investmentsGrid = document.querySelector('#investment-grid');

  const investmentView = getInvestmentView(investment);

  investmentsGrid.insertAdjacentHTML('beforeend', investmentView);

  const investmentCard = document.querySelector(`#investment-${investment.id}`);

  investmentCard.querySelector('.icon-trash').onclick = () => {
    fetch(`/investments/${investment.id}`, {
      method: 'delete',
    });

    investmentCard.remove();
  };
}

async function loadInvestments() {
  const response = await fetch('/investments');

  const investments = await response.json();

  for (const investment of investments) {
    addInvestmentView(investment);
  }
}

function loadFormSubmit() {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.replace(',', '.');

    const value = Number(document.querySelector('#value').value);

    const categoryId = Number(document.querySelector('#category').value);

    const investment = { name, value, categoryId };

    const response = await fetch('/investments', {
      method: 'post',
      body: JSON.stringify(investment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newInvestment = await response.json();

    addInvestmentView(newInvestment);

    form.reset();

    document.querySelector('#offcanvas-close').click();
  };
}

async function loadCategoriesSelect() {
  const select = document.querySelector('#category');

  const response = await fetch('/categories');

  const categories = await response.json();

  for (const category of categories) {
    const option = `<option value="${category.id}">${category.name}</option>`;

    select.insertAdjacentHTML('beforeend', option);
  }
}

loadCategoriesSelect();

loadInvestments();

loadFormSubmit();
