import { Link } from "react-router-dom";

const categories = [
  "Biology", "Chemistry", "General Knowledge", "History",
  "Mathematics", "Physics", "Social Science", "Science",
];

function Category({ setQuizConfig }) {
  const handleCategorySelect = (category) => {
    setQuizConfig((prev) => ({ ...prev, category }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to="/quiz"
            onClick={() => handleCategorySelect(cat)}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 text-center"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;