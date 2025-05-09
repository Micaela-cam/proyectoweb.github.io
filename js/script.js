/*variable que mantiene el estado visible del carrito*/
var carritovisible = false; 

if(document.readyState=='loading') {
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

/* dar funcionalidad a los botones eliminar del carrito*/
function ready() { 
    var botonesEliminarArt = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarArt.length;i++){ 
        var button = botonesEliminarArt[i];
        button.addEventListener('click', eliminarArtCarrito);

    } 
    /*Agrego funcionalidad al boton sumar cantidad*/
    var botonesSumarCantidad = document.getElementsByClassName('fa-solid fa-plus sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
         var button = botonesSumarCantidad[i];
         button.addEventListener('click', sumarCantidad);

    }

    /*Agrego funcionalidad al boton restar cantidad*/
    var botonesRestarCantidad = document.getElementsByClassName('fa-solid fa-minus restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
         var button = botonesRestarCantidad[i];
         button.addEventListener('click', restarCantidad);

    }
    /* agrego funcionalidad a los botones agregar al carrito*/
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
        
    }
    /*agregar funcionalidad al boton pagar*/
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

/*Elimino el art seleccionado del carrito*/

function eliminarArtCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    /*Actualizar el total del carrito una vez que eliminamos un art*/
    actualizarTotalCarrito();
 
    /* funcion para controlar si hay elementos en el carrito una vez que se elimina
     si no hay debe ocultarse el carrito */
     ocultarCarrito();
}


/*Actualiza el total del carrito*/
function actualizarTotalCarrito(){
    /*selecciona el contenedor carrito*/
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoArts = carritoContenedor.getElementsByClassName('art-carrito');
    var total = 0;

    /*recorrer cada elemento del carrito para actualizar el total*/
    for(var i=0; i < carritoArts.length;i++){ 
        var art = carritoArts[i];
        var  precioElemento = art.getElementsByClassName('carrito-art-precio')[0];
        console.log(precioElemento);
        /*quitar el simbolo de euro y el punto de milesimo*/
        var precio = parseFloat(precioElemento.innerText.replace('€','').replace('.',''));
         console.log(precio);
        var cantidadArt = art.getElementsByClassName('carrito-art-cant')[0];
        var cantidad = cantidadArt.value;
        console.log(cantidad); 
        total = total + (precio * cantidad);

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '€' + total.toLocaleString("es") + ',00';

}

function ocultarCarrito() {
    var carritoArts = document.getElementsByClassName('arts-carrito')[0];
    if(carritoArts.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        /*ahora maximiso el contenedor de los elementos*/
        var arts = document.getElementsByClassName('box2')[0];
        arts.style.width = '100%';
    }
}

/* Aumentar en una entidad del elemento seleccionado */
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement; 
    var cantidadActual = selector.getElementsByClassName('carrito-art-cant')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-art-cant')[0].value = cantidadActual;
    /* Actualizamos el total */
    actualizarTotalCarrito();

} 

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement; 
    var cantidadActual = selector.getElementsByClassName('carrito-art-cant')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    /*controlar que no sea menor que uno*/
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-art-cant')[0].value = cantidadActual;
    /* Actualizamos el total */
       actualizarTotalCarrito();
     }

    }
   
    function agregarAlCarritoClicked(event){
        var button = event.target;
        var art = button.parentElement;
        var titulo = art.getElementsByClassName('titulo')[0].innerText;
        console.log(titulo);
        var precio = art.getElementsByClassName('precio')[0].innerText;
        var imagenSrc = art.getElementsByClassName('item')[0].src;
        console.log(imagenSrc);

        /*funcion para agregar el elemento al carrito, mandar por parametros los valores*/
        agregarArtAlCarrito(titulo, precio, imagenSrc);
       
        /*Hacer visible el carrito cuando agrega por primera vez  */
        hacervisibleCarrito();
    }

    function agregarArtAlCarrito(titulo, precio, imagenSrc){
        var art = document.createElement('div');
        art.classList.add = 'art';
        var artsCarrito = document.getElementsByClassName('arts-carrito')[0];
        
        /*controlar que el art que esta ingresando no se encuentre ya en el carrito*/
        var nombresArtsCarrito = artsCarrito.getElementsByClassName('carrito-art-tit');
        for(var i=0; i < nombresArtsCarrito.length;i++){
            if(nombresArtsCarrito[i].innerText==titulo){
                alert("El art ya se encuentra en el carrito");
                return;
            }
        }


        var artCarritoContenido = `
        <div class="art-carrito">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-art-detall">
            <span class="carrito-art-tit">${titulo}</span>
            <div class="selec-cant">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-art-cant" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-art-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
        </div>

        `
        
        
        art.innerHTML = artCarritoContenido;
        artsCarrito.append(art);

        /*Agregamos la funcionalidad eliminar del nuevo art*/
        art.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarArtCarrito);

        /*Agrego la funcionalidad de sumar del nuevo item */
        var botonSumarCantidad = art.getElementsByClassName('fa-solid fa-plus sumar-cantidad')[0];
        botonSumarCantidad.addEventListener('click',sumarCantidad);

           /*Agrego la funcionalidad de restar del nuevo item */
            var botonRestarCantidad = art.getElementsByClassName('fa-solid fa-minus restar-cantidad')[0];
            botonRestarCantidad.addEventListener('click',restarCantidad);

        /*Actualizar total*/
        actualizarTotalCarrito();

    }

    function pagarClicked(event){
        alert("Gracias por su compra")
        /*elimino todos los elementos del carrito*/
        var carritoArts = document.getElementsByClassName('arts-carrito')[0];
        while(carritoArts.hasChildNodes()){
            carritoArts.removeChild(carritoArts.firstChild);

        }
        actualizarTotalCarrito();

        /*funcion que oculta el carrito*/
        ocultarCarrito();

    }

    function hacervisibleCarrito(){
        carritovisible = true;
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '0';
        carrito.style.opacity = '1';

        var arts = document.getElementsByClassName('box2')[0];
        arts.style.width = '60%';

    }





















