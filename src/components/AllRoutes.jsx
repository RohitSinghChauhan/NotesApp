import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { Notes } from "../pages/Notes";
import PrivateRoutes from '../utils/PrivateRoutes';
import InvalidPage from "../pages/InvalidPage";

export default function AllRoutes() {

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route element={<PrivateRoutes />}>
                <Route path='/notes' element={<Notes />} exact />
                <Route path='*' element={<InvalidPage />} exact />
            </Route>

        </Routes>
    )
};