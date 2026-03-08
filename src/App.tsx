import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-warm-white">
      <h1 className="lens-wordmark text-4xl">lens.</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
