import { useState } from "react";
import Logo from"./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const dbName = 'list';
 
const fetchDB = async ( dbName ) => fetch(`http://localhost:3000/${dbName}`).then((response) => response.json()); 
const fetchDBbyId = async ( dbName, id ) => fetch(`http://localhost:3000/${dbName}/${id}`).then((response) => response.json());
const deleteItem = async (itemId) => fetch(`http://localhost:3000/${dbName}/${itemId}`, {method: "DELETE",}).then((response) => response.json()); 
const updateItem = async ( itemId, updateItemPacked ) => fetch(`http://localhost:3000/${dbName}/${itemId}`, {method: 'PATCH',headers: {'Content-Type': 'application/json',},body: JSON.stringify(updateItemPacked),}).then((response) => response.json()); 
const addItem = async ( newItemRow ) => fetch(`http://localhost:3000/${dbName}`, {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(newItemRow),}).then(response => response.json());

const list = await fetchDB( dbName );

export default function App(){
  const [ items, setItems ] = useState(list);

  function removeAllItems(list){
    for (const item of list) {
      deleteItem( item.id );
    }
  }
 
  function handleAdditems(item){
    const newItemRow = { description: item.description, quantity: item.quantity, packed: false };

    setItems((items) => [ ...items, item ]);
    addItem( newItemRow );
 
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id ));
    deleteItem( id );
  }
 
  async function handleToggleItem(id){

      const updateItemPacked = {packed: null};
      const currItem = await fetchDBbyId( dbName, id);
      currItem.packed ? updateItemPacked.packed = false : updateItemPacked.packed = true;

      setItems((items) => 
        items.map((item)=> 
          item.id === id ? { ...item, packed: !item.packed } : item
        )
      );
      updateItem( id, updateItemPacked );

  }
 
  function handleClearList(){
    const confirmed = window.confirm("Are you sure you want to delete all items?");

    if( confirmed ) {
      setItems([]); 
      removeAllItems(list);
    }
    
  }
  return (
  <div className="app">
    <Logo />
    <Form onAddItems={handleAdditems} />
    <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
    />
    <Stats items={items} />
  </div>
  );
}

 

