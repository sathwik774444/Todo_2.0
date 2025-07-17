const TodoItem = ({ todo, onDelete }) => (
  <div>
    <span>{todo.text}</span>
    <button onClick={() => onDelete(todo._id)}>Delete</button>
  </div>
);
export default TodoItem;
