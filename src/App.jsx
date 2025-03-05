import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Images from "./pages/Images";
import Videos from "./pages/Videos";
import Archive from "./pages/Archive";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import Database from "./pages/Database";
import Climb from "./features/Database/Climb";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import { HelmetProvider } from "react-helmet-async";
import Image from "./pages/Image";
import Profile from "./pages/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />

        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="home" element={<Home />} />
                <Route path="images" element={<Images />} />
                <Route path="videos" element={<Videos />} />
                <Route path="archive" element={<Archive />} />
                <Route path="images/:imageId" element={<Image />} />

                <Route
                  path="database"
                  element={
                    <ProtectedRoute>
                      <Database />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="database/:climbId"
                  element={
                    <ProtectedRoute>
                      <Climb />
                    </ProtectedRoute>
                  }
                />

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "400px",
              padding: "16px 24px",
            },
          }}
        />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
