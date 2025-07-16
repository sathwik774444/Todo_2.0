import { Link } from 'react-router-dom';
import TodoForm from './TodoForm';

const CategoryList = ({ categories }) => {
  if (!categories.length) return <p>No categories yet.</p>;

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id} style={{ marginBottom: '2rem' }}>
          <h3>
            <Link to={`/category/${cat._id}`}>{cat.name}</Link>
          </h3>

          {/* TodoForm below each category */}
          <TodoForm
            categoryId={cat._id}
            onTodoAdded={() => {
              // You can later implement reloading todos for this category
              console.log(`Todo added in category ${cat.name}`);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
