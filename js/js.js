


const apiUrl = "https://api.datamuse.com/words?md=d";
document.getElementById("btnBuscar").addEventListener("click", () => {

// Obtener la palabra a buscar  
const palabra = document.getElementById("palabra").value;
const url = `${apiUrl}&sp=${palabra}`;
const surl = `${apiUrl}&rel_syn=${palabra}`;

// con esta funcion se obtiene la definiciones de la palabra
fetch(url)
.then(response => response.json())
.then(data => {

    // Obtener las definiciones de la palabra en caso de funcionar
    const definitions = data[0].defs.slice(0, 3); // Limita a 3 resultados
    const lista = document.getElementById("listaDefiniciones");
    
    // Mostrar las definiciones en una lista
    lista.innerHTML = "";
    definitions.forEach(def => {
    const li = document.createElement("li");
    li.classList.add("definicion");
    li.textContent = def;
    lista.appendChild(li);
    });
})
// en caso de no funcionar se muestra un error en la consola
.catch(error => console.error("Error al obtener las definiciones:", error));



// Realizar una solicitud a la API de Datamuse para obtener los sinónimos de la palabra
fetch(`https://api.datamuse.com/words?rel_syn=${palabra}`) // 
.then(response => response.json())
.then(data => {
    data = data.slice(0, 3);
    const sinonimos = data.map(d => d.word);
  // Mostrar los sinónimos en una lista
  const listaSinonimos = document.getElementById("listasinonimos");
  listaSinonimos.innerHTML = "";
  for (const sinonimo of sinonimos) {
    const elementoLista = document.createElement("li");
    elementoLista.textContent = sinonimo;
    elementoLista.classList.add("sinonimo");
    listaSinonimos.appendChild(elementoLista);
  }
})
.catch(error => console.error(error));
});


fetch("https://random-word-api.herokuapp.com/word")
.then(response => response.json())
.then(data => {
    document.getElementById("palabra").value = data[0];
    document.getElementById("btnBuscar").click();
})
.catch(error => console.error("Error al obtener las definiciones:", error));





