function ToDoList() {

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


    input.addEventListener('keyup', function(event) { 
        p = document.createElement('p');
        p.append(event.target.value); 
    });

    function addTask() {

        let li = document.createElement('li');
        ul.appendChild(li);

        let checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.setAttribute('type', 'checkbox');

        let pencil = document.createElement('i');
        pencil.classList.add('fa');
        pencil.classList.add('fa-pencil');

        let trash = document.createElement('i');
        trash.classList.add('fa');
        trash.classList.add('fa-trash-o');

        let error = document.createElement('p');
        error.classList.add('error');

        if (input.value === '') {
            error.innerHTML = 'Task not added.';
            if (document.getElementsByClassName('error').length === 0) container.insertBefore(error, btn);
            li.remove();
        } else {
            if (document.querySelector('.error')) document.querySelector('.error').remove();
            li.append(checkbox, p, pencil, trash);
            input.value = '';
        }

        
        let arrCheckbox = document.querySelectorAll('.list input');

        arrCheckbox.forEach(function(element) {
            checkbox.onchange = function() {
                if (element.checked) {
                    li.classList.add('checked'); 
                } else {
                    li.classList.remove('checked'); 
                }
            };
        });

        btnReset.addEventListener('click', () => {
            li.remove();
        });

        pencil.addEventListener('click', function() {
            //edit = prompt('Редактировать список:');

            let modalWindow = document.createElement('div'),
                modalWindowInput = document.createElement('input'),
                buttonClose = document.createElement('i'),
                buttonSave = document.createElement('button');

            section.appendChild(modalWindow);
            modalWindow.classList.add('modalWindow');
            
            modalWindow.appendChild(modalWindowInput);
            modalWindowInput.setAttribute('type', 'text');
            modalWindowInput.setAttribute('id', 'textEdit');
            modalWindowInput.value = pencil.parentElement.querySelector('p').textContent;

            modalWindow.appendChild(buttonSave);
            buttonSave.classList.add('save');
            buttonSave.innerHTML = 'Save the changes';

            buttonSave.addEventListener('click', function() {
                pencil.parentElement.querySelector('p').innerHTML = modalWindowInput.value;
                modalWindow.remove();
            });

            modalWindow.appendChild(buttonClose);
            buttonClose.classList.add('fa');
            buttonClose.classList.add('fa-times');
        
            buttonClose.addEventListener('click', function() {
                modalWindow.remove();
            });

            /*
            if (edit) {
                li.innerHTML = '';
                editP = document.createElement('p');
                editP.append(edit);
                li.append(checkbox, editP, pencil, trash);
            } */
        });

        trash.addEventListener('click', function() {
            trash.parentElement.remove();
        });
        
    };

    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) addTask();
    });

    btnAdd.addEventListener('click', addTask);

};

window.addEventListener('load', ToDoList);