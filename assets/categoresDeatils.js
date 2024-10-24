
let prod_element =  document.querySelector(".products .container").innerHTML;

const getData = async (url) =>{
  
  const {data} = await axios.get(url);
  return data;
}

const displayProducts = async () => {
  const params = new URLSearchParams(window.location.search).get("category");
  prod_element =`<h2>${params}</h2>`;
  const all_products = await getData(`https://dummyjson.com/products/category/${params}`);
  const result = all_products.products.map(product => {
    return `
        <div class="product"> 
          <a href="productDetail.html?id=${product.id}">
            <img src="${product.thumbnail}" alt="${product.description}"/>
            <h3> ${product.title} </h3>
          </a>
        </div>
    `;
  }).join(' ');
  
  document.querySelector('.products .container').innerHTML += `<h2>${params}</h2>`;
  document.querySelector(".products .container").innerHTML += `

  <div class="row">
    ${result}
  </div>
  
  `;


}

displayProducts();