const getData = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

const displayProductDetails = async () => {
    const productId = new URLSearchParams(window.location.search).get("id");
    const product = await getData(`https://dummyjson.com/products/${productId}`);

    const productDetail = `
        <div class="product-detail">
            <img src="${product.thumbnail}" alt="${product.description}" />
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <h2>Price: $${product.price}</h2>
            <p>Category: ${product.category}</p>
            <p>Rating: ${product.rating}</p>
        </div>
    `;

    document.querySelector('.product-details .container').innerHTML = productDetail;
};

displayProductDetails();
