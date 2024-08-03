import { useEffect, useState } from "react";
import Logo from"./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import addItem from "./AddItem";
import getData from "./GetItems";
import removeItems from "./RemoveItems";
import updateDbItem from "./UpdateItem";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
 
 
export default function App(){

  const provider = new GoogleAuthProvider();
  const auth = getAuth();



  const [ items, setItems ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ signedIn, setsignedIn ] = useState(false);
  const [ dbKeys, setdbKeys ] = useState([]);
 
  function signInWithGoogle(){

    signInWithPopup(auth, provider)
    .then( async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
 
      setsignedIn(true)
      if( user.email == 'ycherednikov@gmail.com' ){
        await getDB().then(()=>setIsLoading(false))
      }else{
        setIsLoading(false)
        
      } 
 
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode: ', errorCode)
      console.log('errorMessage: ', errorMessage)
 
    });
 
 
  }
  async function getDB(){
 
    const  data = await getData();
      setItems(Array.from(data.db));
      setdbKeys(data.keys)
 
  }
 
  function handleAdditems(item){
    const newItemRow = { description: item.description, quantity: item.quantity, packed: false, id: items.length };
    setItems((items) => [ ...items, item ]);
    items != "" && addItem( newItemRow, 'list' );
 
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id ));
    items != "" && removeItems(dbKeys[id], "list/")
  }
 
  function handleToggleItem(id, packed){
      const updatePacked = packed ? false : true;
      setItems((items) => 
        items.map((item)=> 
          item.id === id ? { ...item, packed: !item.packed } : item
        )
      );
      items != "" && updateDbItem(dbKeys[id], updatePacked)
  }
 
  function handleClearList(id){
    const confirmed = window.confirm("Are you sure you want to delete all items?");

    if( confirmed ) {
      items != "" && removeItems(dbKeys[id], "list/", true);
      setItems([])
    }
    
  }
  return (
  <div className="app">
    {  ! signedIn ?
        <div className="item-wrapper">
          <button onClick={signInWithGoogle}>sign in with google</button>
        </div>
        :
      <>
        <Logo />
        <Form onAddItems={handleAdditems} />
        <PackingList 
            isLoading={isLoading}
            items={items} 
            onDeleteItem={handleDeleteItem} 
            onToggleItem={handleToggleItem}
            onClearList={handleClearList}
        />
        <Stats items={items} />
      </>
    }
  </div>
  );
}