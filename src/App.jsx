import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BooksPage from "./pages/Books/BooksPage";
import BookDetailsPage from "./pages/BookDetails/BookDetailsPage";
import MyBooksPage from "./pages/MyBooks/MyBooksPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/my-books" element={<MyBooksPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
