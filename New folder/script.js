document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productList = document.getElementById('product-list');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      fetchProducts(category);
    });
  });

  function fetchProducts(category) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
      .then(response => response.json())
      .then(data => {
        const categoryData = data.categories.find(cat => cat.category_name === category);
        displayProducts(categoryData.category_products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
      const card = `
        <div class="product-card">
        <div class="badge-img">
          ${product.badge_text ? `<b class="badge">${product.badge_text}</b>` : ''}</div>

          <img src="${product.image}" alt="${product.title}">

          <div class="title">
            <h3>${product.title}</h3>
            <span>&#8226;${product.vendor}</span>
          </div>
          <div class="title">
            <p>Rs: $${product.price * (100 - 25)/100}</p>
            <p class="cross"><del>${product.price}.00<del></p>
            <p class="off">50% Off</p></div>
          <button>Add To Cart</button>
        </div>
      `;
      productList.insertAdjacentHTML('beforeend', card);
    });
  }
});
