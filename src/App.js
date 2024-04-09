import { Route, BrowserRouter, Routes } from "react-router-dom";
import WebLayout from "./layouts/WebLayout/WebLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import FreeLayout from "./layouts/FreeLayout/FreeLayout";
import CustomerLayout from "./layouts/CustomerLayout/CustomerLayout";
import {  SiteForm } from "./pages/admins";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/web" element={<WebLayout />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="temletes/save" element={<SiteForm />} />
     
          </Route>
          <Route path="/free" element={<FreeLayout />} />
          <Route path="/customer" element={<CustomerLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
