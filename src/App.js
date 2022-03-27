import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./app/components/route/PrivateRoute";
import { PubclicRoute } from "./app/components/route/PubclicRoute";
import Dashboard from "./app/container/auth/dashboard/Dashboard";
import Home from "./app/container/public/Home";
import Login from "./app/container/public/Login";
import Register from "./app/container/public/Register";

const DashBoardPage = lazy(() =>
  import(`./app/container/auth/dashboard/Dashboard`)
);

function App() {
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <PubclicRoute>
              <Home />{" "}
            </PubclicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PubclicRoute>
              <Register />{" "}
            </PubclicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PubclicRoute>
              <Login />{" "}
            </PubclicRoute>
          }
        />

        {/* Lazy Loading or Code Spliting */}
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<h1>...Loading</h1>}>
              <PrivateRoute>
                <DashBoardPage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route path="*" element={<h1>404:Page not found!</h1>} />
      </Routes>
    </Fragment>
  );
}

export default App;
