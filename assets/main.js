const limit = 20; 
const getData = async (url) =>{
  
  const {data} = await axios.get(url);
  return data;
}

const displayCategories = async () =>{
  const loader = document.querySelector(".loader-container");
  loader.classList.add("active");
  try{
  const categories = await getData('https://dummyjson.com/products/category-list');
  const result = categories.map( category =>{
    return `
    
        <a class="category" href="categoreisDeatil.html?category=${category}">${category}</a>
        
    
    `
  }).join(' ');
  
  document.querySelector(".categories .row").innerHTML = result;
  
}catch(e){
  document.querySelector(".categories .row").innerHTML = '<p style="color: white;">Error loading category</p>';
}
finally{
  loader.classList.remove("active");
}
}

const displayProducts = async (page = 1) => {
  skip = (page -1) * limit; 
  const all_products = await getData(`https://dummyjson.com/products?limit=20&skip=${skip}`);
  const number_of_pages = Math.ceil(all_products.total / limit);
  console.log(page);
  const result = all_products.products.map(product => {
  return `
      <div class="product"> 
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h3> ${product.title} </h3>
        
      </div>
  `
  }).join(' ');

  let pagination_links = ``;
  if(page == 1){
    pagination_links += `<li class="page-item"><button disabled)" class="page-link" >&laquo;</a></li>`;
  }
  else{
    pagination_links += `<li class="page-item"><button onclick="displayProducts(${page-1})" class="page-link" >&laquo;</a></li>`;
  }
  for(let i = 1; i <= number_of_pages; i++){
    pagination_links += `<li class="page-item ${i == page?'active':''}"><button onclick="displayProducts(${i})" class="page-link">${i}</a></li>`;
  }
  if (page == number_of_pages){
    pagination_links += `<li class="page-item"><button class="page-link" disabled>&raquo;</a></li>`;
  }
  else{
    pagination_links += `<li class="page-item"><button onclick="displayProducts(${parseInt(page)+1})" class="page-link" >&raquo;</a></li>`;
  }
  document.querySelector(".products .row").innerHTML = result;
  document.querySelector(".pagination").innerHTML = pagination_links;
}

displayCategories();
displayProducts();