const socketCient = io();
//elementos 
const productList = document.getElementById("productList")
const createProductForm = document.getElementById("createProductForm");

//enviamos info del form al socket del server
createProductForm.addEventListener("submit",(e)=>{
   e.preventDefault(); 
const formData = new FormData(createProductForm);
/* console.log(formData.get("title")) */
const jsonData = {};
for(const[key,value] of formData.entries()){
    jsonData[key]=value
};
jsonData.price = parseInt(jsonData.price)
console.log(jsonData);
//enviar objeto de la info del producto al socket del servidor
socketCient.emit("addProduct",jsonData);
createProductForm.reset();
});


//recibimos productos 
socketCient.on("products",(dataProducts)=>{
   
    let productsElms = "";
    dataProducts.forEach(product => {
        productsElms += `<li>
       <p>nombre: ${product.title}<button onclick="deleteProduct(${product.id})">Eliminar producto</button></p>
       </li>`;
    });
    productList.innerHTML= productsElms;
    /* console.log("productos", dataProducts); */
});
const deleteProduct = (productId)=>{
    socketCient.emit("deleteProduct", productId);
}
