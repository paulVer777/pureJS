!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.uuidv4=e()}}(function(){return function e(n,r,o){function t(f,u){if(!r[f]){if(!n[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var p=r[f]={exports:{}};n[f][0].call(p.exports,function(e){var r=n[f][1][e];return t(r?r:e)},p,p.exports,e,n,r,o)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<o.length;f++)t(o[f]);return t}({1:[function(e,n,r){function o(e,n){var r=n||0,o=t;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}for(var t=[],i=0;i<256;++i)t[i]=(i+256).toString(16).substr(1);n.exports=o},{}],2:[function(e,n,r){var o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(o){var t=new Uint8Array(16);n.exports=function(){return o(t),t}}else{var i=new Array(16);n.exports=function(){for(var e,n=0;n<16;n++)0===(3&n)&&(e=4294967296*Math.random()),i[n]=e>>>((3&n)<<3)&255;return i}}},{}],3:[function(e,n,r){function o(e,n,r){var o=n&&r||0;"string"==typeof e&&(n="binary"===e?new Array(16):null,e=null),e=e||{};var f=e.random||(e.rng||t)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,n)for(var u=0;u<16;++u)n[o+u]=f[u];return n||i(f)}var t=e("./lib/rng"),i=e("./lib/bytesToUuid");n.exports=o},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});


/////////////Saves array to local storage

const saveToStorage=(arr) => localStorage.setItem('Todos',JSON.stringify(arr))


/////////////Filter arrays

const renderFilteredTodos = (arr, filters) => {
    console.log(arr)
     
    let filteredArr=arr.sort((a,b)=>{

     if(filters.sortBy === 'alphabetically') return a.title[0].toLowerCase() < b.title[0].toLowerCase() ? -1 : 1 
     if(filters.sortBy === 'edited') return a.editedAt > b.editedAt ? -1 : 1
     if(filters.sortBy === 'created') return a.createdAt < b.createdAt ? -1 :1 
    })
     console.log(filteredArr)
    
    
     filteredArr = arr.filter((value, index) => value.title.toLowerCase().includes(filters.searchValue.toLowerCase()))
    
    filteredArr=filteredArr.filter((value,index) => filters.completed ? ! value.completed : true )

  
  
  
  
  
  
    createTodoDom(filteredArr, filters)
}

//////////////// Creates elements in DOM tree

const createTodoDom = (arr, filters) => {


    document.querySelector('#todo').innerHTML = ''

    arr.forEach((value, index) => {

        const div = document.createElement('div')

        ////////////////RemoveButton

        const buttonRemove=document.createElement('button')
        buttonRemove.textContent='X'
        // buttonRemove.setAttribute('class','remove')
        
        
        buttonRemove.addEventListener('click',(eventInfo)=>{

         removeItem(value.id)

        })
     
       //////////////Editbutton//////////////////////
     
        const buttonEdit=document.createElement('button')
        buttonEdit.textContent='Edit'
          
        buttonEdit.addEventListener('click',(eventInfo)=>{
               location.assign(`/edit.html#${value.id}`)
        })

         //////////CheckBox////////////////////

        const checkbox=document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        
        value.completed ? checkbox.setAttribute('checked',value.completed) : ""
        
       checkbox.addEventListener('click',(eventInfo)=>{
        
          checkOrNot(value.id,eventInfo.target.checked)      
       })

      //////////////Paragraph//////////////////////

        const paragraph = document.createElement('paragraph')
        paragraph.textContent = value.title
        
        div.appendChild(buttonRemove)
        div.appendChild(buttonEdit)
        div.appendChild(paragraph)
        div.appendChild(checkbox)
        document.querySelector('#todo').appendChild(div)
    });
}
/////// Gets items from storage

const getFromStorage = ()=> {

 const arr = localStorage.getItem('Todos')
  
  return arr ? JSON.parse(arr) : []
  
}
///// Finds the defined index in the array

const finder = id => todos.findIndex((value,index)=> value.id === id)

/////removes items from array

const removeItem = id => {

 const index = finder(id)
  
 todos.splice(index,1)
 
  saveToStorage(todos)
  renderFilteredTodos(todos,filters)
}

/////// Checkes the checkbox and saves info to object if is checked or not

const checkOrNot= (id,status) =>{

console.log(status)

 const index=finder(id)
 todos[index].completed=status
 saveToStorage(todos,filters)

}

////// Calculates howm many time passed grom last edition of item

const lastEdition = (uid)=>{

    const index = finder(uid)
    const item = todos[index].editedAt
    const lastEdited= moment(todos[index].editedAt)

   return item ? `Last edition was ${lastEdited.fromNow(moment())} ago ` : `This item hasn't been edited yet`
}