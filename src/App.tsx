import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Main } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          {/* <Route path="/" element={} />
          <Route path="/" element={} /> */}
          {/* <Route path="*" element={<NotFoundPage/>} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
