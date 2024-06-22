import { useState } from "react";


export default function Form({ onAddItems }){
    const [ description, setDescription] = useState("");
    const [ quantity, setQuantity ] = useState(1);
  
  
    function handleSubmit(e){
      e.preventDefault();
  
      if( !description ) return;
  
      const newItem = { description, quantity, packed: false, id: Date.now() }

      const newItemRow = { description: description, quantity: quantity, packed: false };

      function addDbRow(){
 
        fetch('http://localhost:3000/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItemRow),
        })
        .then(response => response.json())
        // .then(newDB => console.log(newDB));
 
      }

      console.log(newItem);
  
      onAddItems(newItem);
      addDbRow()
  
      setDescription("");
      setQuantity(1);
    }
  
    return (
    <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip</h3>
        <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
          { Array.from({ length: 20}, (_, i) => i+1).map(
            (num)=>(
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Item.." value={description} onChange={(e)=>setDescription(e.target.value)} />
        <button>Add</button>
      </form>
    );
  }