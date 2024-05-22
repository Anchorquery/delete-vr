import { Routes, Route } from "react-router-dom";

import ImageDetail from "./page/imageDetail";
import ImageForm from "./page/imageForm";
import ImageGallery from "./page/imageGallery";
import Login from "./components/login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
  
      <div className="container p-4">
        <Routes> {/* Usa Routes para definir tus rutas */}
          <Route path='/' element={<Login />} />
          <Route path='/gallery' element={<ImageGallery />} />
          <Route path='/upload' element={<ImageForm />} />
          <Route path='/images/:id' element={<ImageDetail />} />
        </Routes>
      </div>
   );
}

export default App;