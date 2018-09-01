const todos = getFromStorage()

const uid = location.hash.substring(1, )

document.querySelector('#editedAt').textContent=lastEdition(uid)


const editTitle = (text, uid) => {

    const index = finder(uid)
    todos[index].title = text
    todos[index].editedAt = moment().valueOf()
    saveToStorage(todos)
}

document.querySelector('#inputEdit').addEventListener('input', (eventInfo) => {

    editTitle(eventInfo.target.value, uid)

})









