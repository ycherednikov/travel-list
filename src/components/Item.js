export default function Item({ item, isLoading, onDeleteItem, onToggleItem }) {

  return (
    <li id={item.id}>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id, item.packed)} checked={ item.packed ? true : false } />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );

}
