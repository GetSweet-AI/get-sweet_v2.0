"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/useContext";
import { Bot, LayoutDashboard, UsersRound, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

// --- NAV LINKS ---
const NavLinks = ({
  pathname,
  logout,
  isAuthenticated,
  user,
  isMobile = false,
  setMenuOpen,
}) => (
  <nav
    className={`flex ${
      isMobile
        ? "flex-col space-y-3"
        : "items-center gap-4 bg-gray-100 rounded-xl p-2"
    }`}
  >
    <Link
      href="/home"
      onClick={() => isMobile && setMenuOpen(false)}
      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-white/70 transition ${
        pathname === "/home"
          ? "bg-white font-semibold text-purple-600 shadow-md"
          : "text-gray-700"
      }`}
    >
      <LayoutDashboard className="w-4 h-4" /> Home
    </Link>

    {/* <Link
      href="/review-queue"
      onClick={() => isMobile && setMenuOpen(false)}
      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-white/70 transition ${
        pathname === "/review-queue"
          ? "bg-white font-semibold text-purple-600 shadow-md"
          : "text-gray-700"
      }`}
    >
      <UsersRound className="w-4 h-4" /> Review Queue
    </Link> */}

    {isAuthenticated ? (
      <button
        onClick={() => {
          logout();
          isMobile && setMenuOpen(false);
        }}
        className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
          isMobile
            ? "text-left text-red-500 hover:bg-gray-100"
            : " text-gray-700 hover:bg-gray-200 ml-2"
        }`}
      >
        Sign Out
      </button>
    ) : (
      <Link
        href="/sign-in"
        onClick={() => isMobile && setMenuOpen(false)}
        className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
          isMobile
            ? "text-left bg-linear-to-r from-fuchsia-500 to-purple-600 text-white shadow-md"
            : "ml-2 bg-linear-to-r from-fuchsia-500 to-purple-600 hover:opacity-90 text-white shadow-md"
        }`}
      >
        Sign In
      </Link>
    )}
  </nav>
);

// --- SIDEBAR MÓVIL ---
const MobileSidebar = ({ isOpen, setMenuOpen, children }) => {
  const sidebarVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 p-6 md:hidden"
        style={{
          borderTopLeftRadius: "2rem",
          borderBottomLeftRadius: "2rem",
        }}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {children}
      </motion.div>
    </>
  );
};

// --- HEADER PRINCIPAL ---
const HeaderChat = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navProps = { pathname, logout, isAuthenticated, user, setMenuOpen };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 w-full bg-white backdrop-blur-md shadow-lg z-50 border-b border-gray-100 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-800 text-xl">
                AgentWave
              </span>
              <span className="text-xs text-gray-500 -mt-0.5 hidden sm:block">
                Your marketing, automated through AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <NavLinks {...navProps} isMobile={false} />
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMenuOpen} setMenuOpen={setMenuOpen}>
        <NavLinks {...navProps} isMobile={true} />
      </MobileSidebar>
    </>
  );
};

export default HeaderChat;
