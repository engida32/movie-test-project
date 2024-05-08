import React from "react";

const Navbar = () => {
  return (
    <div style={{}}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid black",
          width: "100%",
          position: "fixed",
          top: 0,
          background: "white",
        }}
      >
        Movie Search API
      </nav>
    </div>
  );
};

export default Navbar;
