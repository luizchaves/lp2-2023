function getProductView(product) {
  return `<li class="product-item">
    <div class="product-box-image">
      <img
        src="${product.image}"
        class="product-image"
      />
    </div>
    <p class="product-name">${product.name}</p>
    <div class="product-price">
      <p class="product-cost">
        <span class="actual-price">${product.actual_price}</span>
        <span class="installments">${product.installments}</span>
      </p>
    </div>
    ${getProductSizesView(product.sizes)}
  </li>`;
}

function getProductSizesView(sizes) {
  let sizesView = '<ul class="product-sizes">';

  for (const sizeInfo of sizes) {
    if (sizeInfo.available) {
      sizesView += `<li>
        <a href="#" class="size available">${sizeInfo.size}</a>
      </li>`;
    }
  }

  sizesView += '</ul>';

  return sizesView;
}

const response = await fetch('./data/products.json');
const data = await response.json();

let productsView = '';

for (const product of data.products) {
  productsView += getProductView(product);
}

productsView;

document.querySelector('ul.catalog').innerHTML = productsView;

document.querySelector(
  'span.total'
).innerHTML = `${data.products.length} itens`;
