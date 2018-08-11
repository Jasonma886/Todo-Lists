import forage from 'localforage'

forage.setDriver([forage.WEBSQL, forage.INDEXEDDB, forage.LOCALSTORAGE])

forage.config({
  name: 'Todo List Diary',
  size: 4980736
})

export const listsDB = forage.createInstance({
  name: 'lists'
})

export const loginDB = forage.createInstance({
  name: 'loginInfo'
})

// 每日完成工作database
export const doneDB = forage.createInstance({
  name: 'doneLists'
})
