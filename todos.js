const todos = getFromStorage()

const filters = {
    searchValue: ''
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
        id: uuidv4()
    })

    eventInfo.target.elements.input1.value = ''
    saveToStorage(todos)
    renderFilteredTodos(todos, filters)
})

// document.querySelector('#remove').addEventListener('click', (eventInfo) => {

//     const removeItem = (arr,id)=>{

//     const index=arr.findIndex((value,index) =>  )

//     }})