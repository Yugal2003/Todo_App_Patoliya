function handleKeydown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// add a new todo
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        saveTodos(); // Save todo in localStorage
        renderTodos(); // Re-render todo deta
    } else {
        alert("Please fill the input field");
    }
}



//  localStorage.getItem(keyname ='todos') just keyname hear
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// save todos to localStorage
// localStorage.setItem(keyname, value)
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}



// render todos based on the filter 
function renderTodos(filter = 'all') {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // all the data in once timw
    });
    if(todos.length == 0){
        const li = document.createElement('li');
        li.className = 'no-data-availbale'
        li.innerHTML = "No Todos Data are Availbale !!!"
        todoList.appendChild(li);
    }
    else{
        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <div class='parent_div'>
                    <div class="circle" onclick="toggleComplete(${index})"></div>
                    <div class="image-container" id="image-${index}" onclick="toggleComplete(${index})">
                        <img class="img1" src="./img/true_2.png" alt="Completed" />
                    </div>
                    <span class="${todo.completed ? 'completed' : 'uncompleted'}" ondblclick="startEdit(${index})">${todo.text}</span>
                    <input type="text" class="edit-input" id="edit-input-${index}" style="display: none;" onblur="finishEdit(${index})" onkeydown="handleEditKeydown(event, ${index})">
                </div>
            `;
            todoList.appendChild(li);

            // Show/hide image based on completion status
            const imageContainer = document.getElementById(`image-${index}`);
            if (todo.completed) {
                imageContainer.style.display = 'block';
                li.querySelector('.circle').style.display = 'none'; // Hide the circle
            } else {
                imageContainer.style.display = 'none';
                li.querySelector('.circle').style.display = 'flex'; // Show the circle
            }
        });
    }

    updateTotalCount(); // Update the total count of todoss
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed; 
    saveTodos(); // Save the updated todos to localStorage
    renderTodos(); // Re-render todoss
}

// start editing a todo
function startEdit(index) {
    const editInput = document.getElementById(`edit-input-${index}`);
    const todoText = todos[index].text;
    editInput.value = todoText;
    editInput.style.display = 'inline';
    editInput.focus();

    // Hide the todo text span
    const todoSpan = editInput.previousElementSibling;
    todoSpan.style.display = 'none';
}

function finishEdit(index) {
    const editInput = document.getElementById(`edit-input-${index}`);
    const newText = editInput.value.trim();
    if (newText) {
        todos[index].text = newText;
        saveTodos(); 
        renderTodos();
    } else {
        // todos.splice(index, 1);  // delete data when text is empty
        todos[index].text = todos[index].text;
        saveTodos();
        renderTodos();
    }
    editInput.style.display = 'none';

    // Show the todo text span again
    const todoSpan = editInput.previousElementSibling;
    todoSpan.style.display = 'inline';
}

function handleEditKeydown(event, index) {
    if (event.key === 'Enter') {
        finishEdit(index);
    } else if (event.key === 'Escape') {
        const editInput = document.getElementById(`edit-input-${index}`);
        editInput.value = todos[index].text; // Revert to original text
        editInput.style.display = 'none';

        const todoSpan = editInput.previousElementSibling;
        todoSpan.style.display = 'inline';
    }
}

// update the total count of todos
function updateTotalCount() {
    const totalCount = document.getElementById('total-count');
    totalCount.textContent = `${todos.length} item left`;
}

// handle button clicks and toggle active state
function setActiveButton(buttonId) {
    const buttons = ['show-all', 'show-active', 'show-completed', 'clear-completed'];
    buttons.forEach(id => {
        const button = document.getElementById(id);
        if (id === buttonId) {
            button.classList.add('active'); // Add active class to the clicked button
        } else {
            button.classList.remove('active'); // Remove active class from other buttons
        }
    });
}

// Event listeners for filtering todos
document.getElementById('show-all').addEventListener('click', () => {
    renderTodos('all');
    setActiveButton('show-all'); 
});
document.getElementById('show-active').addEventListener('click', () => {
    renderTodos('active');
    setActiveButton('show-active'); 
});
document.getElementById('show-completed').addEventListener('click', () => {
    renderTodos('completed');
    setActiveButton('show-completed'); 
});
document.getElementById('clear-completed').addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos(); 
    renderTodos(); 
    setActiveButton('clear-completed'); 
});

renderTodos();






//new added code for dblclick 

// Add a double-click evente image
document.querySelector('img[src="./img/down-chevron_3.png"]').addEventListener('dblclick', toggleAllTodosCompletion);

// Function to toggle completion status of all todos
function toggleAllTodosCompletion() {
    // Check if all todos are completed  && always retur true oR false for slected todos complete or not//
    const allCompleted = todos.every(todo => todo.completed);

    // if   allcompleted return false so all todos are true & 
    // else allcompleted return true so all todos are false
    // toggle or vice-versa method implement hear...
    todos.forEach(todo => {
        todo.completed = !allCompleted;
    });

    saveTodos();
    renderTodos();
}





// all changes code

// 1. remove all console.log() from script.js file

// 2. Add a double-click event on image

// {document.querySelector('img[src="./img/down-chevron_3.png"]').addEventListener('dblclick', toggleAllTodosCompletion);

// // Function to toggle completion status of all todos
// function toggleAllTodosCompletion() {
//     // Check if all todos are completed  && always retur true oR false for slected todos complete or not//
//     const allCompleted = todos.every(todo => todo.completed);

//     // if   allcompleted return false so all todos are true & 
//     // else allcompleted return true so all todos are false
//     // toggle or vice-versa method implement hear...
//     todos.forEach(todo => {
//         todo.completed = !allCompleted;
//     });

//     saveTodos();
//     renderTodos();
// }}


// 3. No Todos Data are Availbale !!!


// {function renderTodos(filter = 'all') {
//     const todoList = document.getElementById('todo-list');
//     todoList.innerHTML = '';
//     const filteredTodos = todos.filter(todo => {
//         if (filter === 'active') return !todo.completed;
//         if (filter === 'completed') return todo.completed;
//         return true; // all the data in once timw
//     });
//     if(todos.length == 0){
//         const li = document.createElement('li');
//         li.className = 'no-data-availbale'
//         li.innerHTML = "No Todos Data are Availbale !!!"
//         todoList.appendChild(li);
//     }
//     else{
//         filteredTodos.forEach((todo, index) => {
//             const li = document.createElement('li');
//             li.className = 'todo-item';
//             li.innerHTML = }



// 4. when you edit text and nothing to write in todos so todos text is same to same show not remove that text from their place


// function finishEdit(index) {
//     const editInput = document.getElementById(`edit-input-${index}`);
//     const newText = editInput.value.trim();
//     if (newText) {
//         todos[index].text = newText;
//         saveTodos(); 
//         renderTodos();
//     } else {
//         // todos.splice(index, 1);  // delete data when text is empty
//         todos[index].text = todos[index].text;
//         saveTodos();
//         renderTodos();
//     }
//     editInput.style.display = 'none';

//     // Show the todo text span again
//     const todoSpan = editInput.previousElementSibling;
//     todoSpan.style.display = 'inline';
// }



