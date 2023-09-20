import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("- -");
  const [cache, setCache] = useState({});
  let api = `https://api.agify.io/?name=${name}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cache.hasOwnProperty(name)) {
      setAge(cache[name]);
      setName("");
      // console.log("from cache");
    } else {
      // console.log("from api");
      const res = await fetch(api);
      const data = await res.json();
      setAge(data.age);
      setCache({ ...cache, [name]: data.age });
      setName("");
    }
  };
  console.log(cache);
  return (
    <div className="app">
      <div className="card_div">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="age_div">{age}</div>
      </div>
    </div>
  );
}

export default App;
