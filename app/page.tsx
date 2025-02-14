'use client'

import Image from "next/image";
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./dashboard";
import NotFound from "./notfound";
import Draft from "./draft";
import Settings from "./settings";
import Contact from "./contact";
import Rules from "./rules";
import Links from "./links";

// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// const root = ReactDOM.createRoot(dcument.getElementById('root'));
// root.render(<App />);

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ <Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />}></Route>

        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/draft" element={<Draft />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/links" element={<Links />}></Route>

        
      </Routes>
    </BrowserRouter>
  );
}
