function ToDoList() {

    let section = document.createElement('section'),
        container = document.createElement('div'),
        title = document.createElement('p'),
        input = document.createElement('input'),
        ul = document.createElement('ul'),
        btn = document.createElement('div'),
        btnSave = document.createElement('button'),
        btnReset = document.createElement('button');

    document.body.appendChild(section);

    section.appendChild(container);
    container.classList.add('container');

    title.innerHTML = 'Список дел';
    container.appendChild(title);
    
    container.appendChild(input);
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'text');
    input.setAttribute('placeholder', 'Добавить в список');

    container.appendChild(ul);
    ul.classList.add('list');

    container.appendChild(btn);
    btn.classList.add('button');

    btn.appendChild(btnSave);
    btnSave.innerHTML = 'Добавить';
    btnSave.classList.add('save');

    btn.appendChild(btnReset);
    btnReset.innerHTML = 'Очистить';
    btnReset.classList.add('reset');


    input.addEventListener('keyup', function(event) { 
        p = document.createElement('p');
        p.append(event.target.value); 
    });
    

    function Save() {

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

        if (input.value === '') {
            alert('Введите задачу.');
            li.remove();
        } else {
            li.append(checkbox, p, pencil, trash);
            input.value = '';
        }

        
        let arrCheckbox = document.querySelectorAll('.list input');

        arrCheckbox.forEach(function(element) {
            checkbox.onchange = function() {
                if (element.checked) {
                    li.classList.toggle('checked'); 
                } else {
                    li.classList.toggle('checked'); 
                }
            };
        });

        btnReset.addEventListener('click', () => {
            li.remove();
        });

        pencil.addEventListener('click', function() {
            edit = prompt('Редактировать список:');

            if (edit) {
                li.innerHTML = '';
                editP = document.createElement('p');
                editP.append(edit);
                li.append(checkbox, editP, pencil, trash);
            } 
        });

        trash.addEventListener('click', function() {
            trash.parentElement.remove();
        });
        
    };

    input.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            Save();
        }
    });

    btnSave.addEventListener('click', Save);

};

window.addEventListener('load', ToDoList);