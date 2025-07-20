import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} BookSto. All rights reserved.</p>
        <p>Contact: support@bootsto.ai</p>
      </div>
    </footer>
  );
}
