const user = JSON.parse(localStorage.getItem('user'));
const formulario = document.querySelector('#form-todos');
const lista= document.querySelector('#todos-list');
const inputF= document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');
const listaA= document.querySelector('#todos-list');
console.log(user.username)


if(!user){
    window.location.href='../home/index.html'
}


formulario.addEventListener('submit', async e=>{
    e.preventDefault();
    await fetch('http://localhost:3000/tareas',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text:inputF.value,user:user.username})
    })
    if(inputF.value == ''){
        console.log("vacio")
    }else{
        const listado = document.createElement('li');
    listado.innerHTML = `
        <li id=${lista.id} class="todo-item">
            <button class="delete-btn">&#10006;</button>
            ${inputF.value}
            <button class="check-btn">&#10003;</button>
        </li> 
        `;
        lista.appendChild(listado);
        inputF.value='';
    }
    
})

const obtenerLista  = async ()=>{
    const respuesta = await fetch('http://localhost:3000/tareas',{method:'GET'});
    const list = await respuesta.json();
    const userList = list.filter(lista =>  lista.user === user.username);
    
        userList.forEach(lista => 
        {
        const listado = document.createElement('li');
        listado.innerHTML = `
        <li id=${lista.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        <p class="${lista.checked ? 'check-todo' : ''}">${lista.text}</p>
        <button class="check-btn">&#10003;</button>
      </li>
      `
      listaA.appendChild(listado);
    })
}
obtenerLista();

lista.addEventListener('click',async e => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.parentElement.id;

        await fetch(`http://localhost:3000/tareas/${id}`,{method:'DELETE'});
        e.target.parentElement.remove();    
    
    }else if(e.target.classList.contains('check-btn')){
        const salida = e.target.parentElement.id;
        console.log(salida)

        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${salida}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({checked: e.target.parentElement.classList.contains('check-todo')? false:true})
        })
        const response = await respuestaJSON.json();
        console.log(response);
        e.target.parentElement.classList.toggle('check-todo');
    }
})

cerrarBtn.addEventListener('click',async e =>{
    localStorage.removeItem('user');
    window.location.href = '../home/index.html'
})