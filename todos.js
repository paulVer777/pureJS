const todos = getFromStorage()



const filters = {
    searchValue: '',
    completed:false,
    sortBy:'alphabetically'
}


////render Todos
renderFilteredTodos(todos, filters)


/// Input for filtering

document.querySelector('#filter').addEventListener('input', (eventInfo) => {
    filters.searchValue = eventInfo.target.value
    renderFilteredTodos(todos, filters)
})

document.querySelector('#adder').addEventListener('submit', (eventInfo) => {

    eventInfo.preventDefault()

    todos.push({
        title: eventInfo.target.elements.input1.value,
        completed: false,
        id: uuidv4(),
        createdAt:moment().valueOf(),
        editedAt:null
    })

    eventInfo.target.elements.input1.value = ''
    saveToStorage(todos)
    renderFilteredTodos(todos, filters)
})

document.querySelector('#completed').addEventListener('change',(e) => {

filters.completed=e.target.checked
renderFilteredTodos(todos,filters)
})


document.querySelector('#sort-by').addEventListener('change',(e)=>{

    filters.sortBy=e.target.value
    renderFilteredTodos(todos,filters)
})
