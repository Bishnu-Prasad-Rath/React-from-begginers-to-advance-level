import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/addpost", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-black">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex ml-auto items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-white inline-block px-6 py-2 duration-200 hover:bg-gray-50 hover:text-black rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        {mobileMenu && (
          <div className="md:hidden mt-3 bg-black border border-gray-700 rounded-lg p-4">
            <ul className="flex flex-col gap-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMobileMenu(false);
                        }}
                        className="text-white w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 hover:text-black duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
