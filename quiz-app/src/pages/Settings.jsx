function Settings({ setQuizConfig }) {
  const difficulties = ["easy", "medium", "hard"];
  const amounts = [5, 10, 15, 20];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Difficulty:</label>
          <select name="difficulty" onChange={handleChange} className="w-full p-2 border rounded">
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Number of Questions:</label>
          <select name="amount" onChange={handleChange} className="w-full p-2 border rounded">
            {amounts.map((num) => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;