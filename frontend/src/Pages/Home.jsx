import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen p-0 bg-indigo-400 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-white font-bold">LawSetu</h1>
      <h2 className="font-bold text-2xl">🏠 Welcome to Home Page!</h2>
      <button className="p-3 bg-blue-400 border border-white rounded-lg" onClick={() => {
        navigate("/editor")
      }}>Editor</button>
    </div>
  );
};

export default Home;
