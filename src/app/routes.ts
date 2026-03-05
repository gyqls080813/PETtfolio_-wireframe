import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import OnboardingPage from "./components/pages/OnboardingPage";
import HomePage from "./components/pages/HomePage";
import LedgerPage from "./components/pages/LedgerPage";
import AccountPage from "./components/pages/AccountPage";
import SavingsPage from "./components/pages/SavingsPage";
import ReportPage from "./components/pages/ReportPage";
import SuppliesPage from "./components/pages/SuppliesPage";
import MyPage from "./components/pages/MyPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "ledger", Component: LedgerPage },
      { path: "accounts", Component: AccountPage },
      { path: "savings", Component: SavingsPage },
      { path: "reports", Component: ReportPage },
      { path: "supplies", Component: SuppliesPage },
      { path: "mypage", Component: MyPage },
    ],
  },
]);
