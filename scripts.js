function ToDoList() {
    let tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

    let section = document.createElement('section'),
        container = document.createElement('div'),
        title = document.createElement('p'),
        div = document.createElement('div'),
        input = document.createElement('input'),
        ul = document.createElement('ul'),
        btn = document.createElement('div'),
        btnAdd = document.createElement('button'),
        btnReset = document.createElement('button');

    document.body.appendChild(section);

    section.appendChild(container);
    container.classList.add('container');

    title.innerHTML = 'ToDo List';
    container.appendChild(title);

    container.appendChild(div);
    div.classList.add('block');
    
    div.appendChild(input);
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'text');
    input.setAttribute('placeholder', 'Type your task');

    container.appendChild(ul);
    ul.classList.add('list');

    container.appendChild(btn);
    btn.classList.add('button');

    btn.appendChild(btnAdd);
    btnAdd.innerHTML = 'Add';
    btnAdd.classList.add('add');

    btn.appendChild(btnReset);
    btnReset.innerHTML = 'Reset';
    btnReset.classList.add('reset');

    if (tasks.length !== 0) tasks.forEach(item => createTask(item));

    function createTask(item) {
        let task = document.getElementById('text').value;
        task = task.trim();

        const li = document.createElement('li');
        ul.appendChild(li);

        const p = document.createElement('p');

        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.setAttribute('type', 'checkbox');

        const pencil = document.createElement('i');
        pencil.classList.add('fa');
        pencil.classList.add('fa-pencil');

        const trash = document.createElement('i');
        trash.classList.add('fa');
        trash.classList.add('fa-trash-o');

        const error = document.createElement('p');
        error.classList.add('error');

        if (task === '' && typeof item !== 'string') {
            error.innerHTML = 'Task not added.';
            if (document.getElementsByClassName('error').length === 0) container.insertBefore(error, btn);
            li.remove();
        } else if (typeof item === 'string') {
            if (document.querySelector('.error')) document.querySelector('.error').remove();
            p.innerHTML = item;
            li.append(checkbox, p, pencil, trash);
            deleteTask(trash);
            checkedTask(checkbox);
            editTask(pencil);
        } else {
            if (document.querySelector('.error')) document.querySelector('.error').remove();
            p.innerHTML = task;
            li.append(checkbox, p, pencil, trash);
            deleteTask(trash);
            checkedTask(checkbox);
            editTask(pencil);
            tasks.push(task);
            localStorage.setItem('Tasks', JSON.stringify(tasks));
            input.value = '';
        }
    }

    function deleteTask(element) {
        element.addEventListener('click', (event) => {
            element.parentElement.remove();
            event.stopPropagation();
            tasks.map((item, index, array) => {
                if (element.parentElement.querySelector('p').textContent === item) return array.splice(index, 1);
            });
            localStorage.setItem('Tasks', JSON.stringify(tasks));
        });
    }

    function checkedTask(element) {
        element.onchange = function() {
            if (element.checked) element.parentElement.classList.add('checked'); 
            else element.parentElement.classList.remove('checked'); 
        };
    }

    function editTask(element) {
        element.addEventListener('click', openModalWindow);
    }

    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) createTask();
    });

    btnAdd.addEventListener('click', createTask);

    btnReset.addEventListener('click', () => {
        ul.innerHTML = '';
        localStorage.removeItem('Tasks');
    });

    function openModalWindow(event) {
        container.classList.remove('fadeIn');

        let modalWindow = document.createElement('div'),
            modalWindowWrapper = document.createElement('div'),
            modalWindowInput = document.createElement('input'),
            buttonClose = document.createElement('i'),
            buttonSave = document.createElement('button'),
            overlay = document.createElement('div');

        document.body.appendChild(modalWindow);
        modalWindow.classList.add('modalWindow');

        document.body.appendChild(overlay);
        overlay.classList.add('overlay');

        modalWindow.appendChild(modalWindowWrapper);
        modalWindowWrapper.classList.add('modalWindowWrapper');
            
        modalWindowWrapper.appendChild(modalWindowInput);
        modalWindowInput.setAttribute('type', 'text');
        modalWindowInput.setAttribute('id', 'textEdit');
        modalWindowInput.value = event.target.parentElement.querySelector('p').textContent;

        modalWindowWrapper.appendChild(buttonSave);
        buttonSave.classList.add('save');
        buttonSave.innerHTML = 'Save the changes';

        function closeModalWindow() {
            tasks.map((item, index, array) => {
                if (event.target.parentElement.querySelector('p').textContent === item) {
                    return array.splice(index, 1, modalWindowInput.value);
                } 
            });
            localStorage.setItem('Tasks', JSON.stringify(tasks));
            event.target.parentElement.querySelector('p').innerHTML = modalWindowInput.value;
            overlay.remove();
            modalWindow.remove();
            container.classList.add('fadeIn');
        }

        buttonSave.addEventListener('click', closeModalWindow);

        modalWindowInput.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) closeModalWindow();
        });

        modalWindowWrapper.appendChild(buttonClose);
        buttonClose.classList.add('fa');
        buttonClose.classList.add('fa-times');
        
        buttonClose.addEventListener('click', function() {
            overlay.remove();
            modalWindow.remove();
            container.classList.add('fadeIn');
        });
    }
};

window.addEventListener('load', ToDoList);