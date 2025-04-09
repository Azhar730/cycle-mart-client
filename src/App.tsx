import DashboardLayout from "./Layout/DashboardLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute role={undefined}>
        <DashboardLayout />
      </ProtectedRoute>
    </>
  );
}

export default App;
