
let comprar = document.getElementById("comprar");
console.log(comprar);

let comprarItemsData = [{
    id:"jksfjkdfj",
    nombre:"Panel solar",
    precio: 1200,
    desc: "Panel solar para generar electricidad",
    img: "img/panel.png",
},{
    id:"gjfhgifhg",
    nombre:"Colector solar",
    precio: 1000,
    desc: "Colector solar para agua caliente sanitaria",
    img: "img/colector.webp",
},{
    id:"ejitueiwu",
    nombre:"Bomba de calor",
    precio: 1700,
    desc: "Bomba de calor para climatización",
    img: "img/bomba.png",
},{
    id:"mvncvnjvbd",
    nombre:"Aislamiento térmico",
    precio: 2300,
    desc: "Aislamiento térmico para mejorar el confort térmico",
    img: "img/aislamiento.jpg",
}]

let canasta = JSON.parse(localStorage.getItem("data")) || [];

let generateComprar =()=>{
    return (comprar.innerHTML = comprarItemsData
        .map((x)=>{
        let {id,nombre,precio,desc,img} =x;
        let buscar = canasta.find((x) => x.id === id) || []
        return `
        <div id=product-id-${id} class="item">
            <img width="200" src=${img} alt="">
            <div class="detalles">
                <h3>${nombre}</h3>
                <p>${desc}</p>
                <div class="precio">
                    <h2>$ ${precio}</h2>
                <div class="boton">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="cantidad">
                    ${buscar.item === undefined? 0: buscar.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                </div>
            </div>
        </div>
        `
    }).join(""));
}

generateComprar();

let increment = (id) => {
    let selectedItem = id;
    let buscar = canasta.find((x)=> x.id === selectedItem.id);
    if(buscar === undefined){
        canasta.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        buscar.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(canasta));
   // console.log(canasta);
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    let buscar = canasta.find((x)=> x.id === selectedItem.id);
    if(buscar.item === 0) return;
    else{
        buscar.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(canasta));
   // console.log(canasta);
    update(selectedItem.id);
};

let update = (id) => {
    let buscar = canasta.find((x) => x.id === id);
    // console.log(buscar.item);
    document.getElementById(id).innerHTML = buscar.item;
    calculation()
};

let calculation =() =>{
    let carritoIcon = document.getElementById("cantidadCarrito");
    carritoIcon.innerHTML = canasta.map((x)=>x.item).reduce((x,y)=>x+y,0);
};

calculation();

let submit = document.getElementById("submit");


document.getElementById("submit").addEventListener("click", function(){
    Swal.fire({
        title: "Gracias"
    })
});
