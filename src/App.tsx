import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Dashboard } from "@/pages/Dashboard";
import { Registration } from "@/pages/Registration";
import { Login } from "@/pages/Login";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "./components/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ErrorBoundary>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/registration"
                                element={
                                    <ProtectedRoute>
                                        <Registration />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <Navigate to="/registration" replace />
                                }
                            />
                        </Routes>
                        <Toaster
                            toastOptions={{
                                className:
                                    "outline outline-[1px] outline-white",
                            }}
                        />
                    </AuthProvider>
                </Router>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
