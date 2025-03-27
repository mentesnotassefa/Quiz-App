import { useNavigate } from "react-router-dom";

function Category({ setQuizConfig }) {
  const navigate = useNavigate();
  const categories = [
    "Biology", "Chemistry", "General Knowledge", "History",
    "Mathematics", "Physics", "Social Science", "Science",
  ];

  const handleCategorySelect = (category) => {
    setQuizConfig((prev) => ({ ...prev, category }));
    navigate("/quiz"); // Navigate to quiz after selection
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 text-center"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;