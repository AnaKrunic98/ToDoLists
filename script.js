const addButtons = document.querySelectorAll('.addBtn')
const olLists = document.querySelectorAll('ol')

const toDoLists = {
    list1 : [{id:11, caption:"Test 1.1"},{id:22, caption:"Test 1.2"}],
    list2 : [{id:33, caption:"Test 2.1"},{id:44, caption:"Test 2.2"}],
    list3 : [{id:55, caption:"Test 3.1"},{id:66, caption:"Test 3.2"}],
}

const mapTargetListObj = {
    ol1 : "list1",
    ol2 : "list2",
    ol3 : "list3",
}

const mapTargetInputObj = {
    ol1 : "input1",
    ol2 : "input2",
    ol3 : "input3",
}

function renderLiEl (olId) {
    const olElement = document.getElementById(olId)
    const listToTarget = mapTargetListObj[olId]

    olElement.innerHTML=""

    toDoLists[listToTarget].forEach(task => {
        olElement.innerHTML += `<li>${task.caption}<span onclick=removeTask('${task.id}','${listToTarget}','${olId}')>x</span></li>`
    })
}

// olLists.forEach (ol =>updateListDom(ol.getAttribute('id')))

// Object.keys(mapTargetListObj).forEach(ol => {
//     updateListDom(ol);
// });

for (let ol in mapTargetListObj){
    renderLiEl(ol)
}

function addNewTask(e) {
    const {targetOl} = e.target.dataset
    const listToTarget = mapTargetListObj[targetOl]
    const targetInput = mapTargetInputObj[targetOl]
    const inputEl = document.getElementById(targetInput)

    const newTask = {
        id: Date.now(), 
        caption: inputEl.value
    }

    toDoLists[listToTarget].push(newTask)
    inputEl.value = ""

    renderLiEl(targetOl)
}

function removeTask(taskId,listId,olId) {
    const index = toDoLists[listId].findIndex(task => task.id === +taskId)          
    toDoLists[listId].splice(index, 1)
    renderLiEl(olId)
}


document.addEventListener("keydown",(event => {
    if (event.key === "Enter"){

        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            if(input.value){
                Object.entries(mapTargetInputObj).forEach(([key,value]) => {
                    if (value === input.getAttribute('id')){
                        oLToTarget = key
                    }
                })
                //mock
                const event = {
                    target: {
                        dataset:{
                            targetOl:oLToTarget
                        }
                    }
                }
            addNewTask(event)
            }
        })
    
    }
}))

// addButtons.forEach(btn => btn.addEventListener('click', (e) => addNewTask(e)))

addButtons.forEach(addBtn => addBtn.addEventListener("click", (e) => addNewTask(e)))