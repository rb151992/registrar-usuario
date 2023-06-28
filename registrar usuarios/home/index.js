const formC= document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notification = document.querySelector('.notification');

formC.addEventListener('submit', async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', { method: 'GET' });
    const users = await response.json();
    
    const user = users.find(user => user.username === createInput.value);
    
    if (!createInput.value) {
        notification.innerHTML = "El campo usuario no puede estar vacío";
        notification.classList.add('show-notification');

        setTimeout(() => {
            notification.classList.remove('show-notification');
        }, 3000);
    } else if (user) {
        notification.innerHTML = "El usuario ya existe";
        notification.classList.add('show-notification');
       
        setTimeout(() => {
            notification.classList.remove('show-notification');
        }, 3000);
    } else {
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: createInput.value }),
        });
        notification.innerHTML = `El usuario ${createInput.value} ha sido creado`;
        notification.classList.add('show-notification');
       
        setTimeout(() => {
            notification.classList.remove('show-notification');
        }, 3000);
        createInput.value = "";
    }
});

formL.addEventListener('submit', async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users', { method: 'GET' });
    const users = await response.json();

    const user = users.find(user => user.username === loginInput.value);

    if (!user) {
        notification.innerHTML = 'El usuario no existe';
        notification.classList.add('show-notification');
       
        setTimeout(() => {
            notification.classList.remove('show-notification');
        }, 3000);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';
    }
});
