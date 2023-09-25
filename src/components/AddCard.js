// components/AddCard.js
function AddCard({ onAdd }) {
    return (
      <div className="card add-card" onClick={onAdd}>
        <div className="plus-sign">+</div>
      </div>
    );
  }
  
  export default AddCard;
  