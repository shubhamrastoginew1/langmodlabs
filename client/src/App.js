import { BrowserRouter, Routes, Route } from "react-router-dom";
import DropboxUploader from './components/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DropboxUploader />}>
          <Route path="/api/dropbox/redirect" element={<DropboxUploader />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // <div>
    //   <DropboxUploader/>
    // </div>
  );
}

export default App;
