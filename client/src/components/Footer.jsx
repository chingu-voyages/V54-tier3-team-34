import React from "react";

export default function Footer() {
  return (
    <div className="bg-green-500 pt-5 pb-2">
      <div className="grid grid-cols-2">
        <ul className="list-none">
          <li>
            <a href="#" className="text-white">
              Anita Boakye-Yiadom
            </a>
            - Scrum Master
          </li>
          <li>
            <a href="" className="text-white">
              Anas Maddah
            </a>
            - Developer
          </li>
          <li>
            <a href="" className="text-white">
              Greg Minezzi
            </a>
            - Developer
          </li>
        </ul>
        <ul className="list-none">
          <li>
            <a href="" className="text-white">
              Pat Okwu
            </a>
            - Product Owner
          </li>
          <li>
            <a href="" className="text-white">
              Rafael Vecchi
            </a>
            - Developer
          </li>
          <li>
            <a href="" className="text-white">
              Abdulsamad Yusuf
            </a>
            - Developer
          </li>
        </ul>
      </div>
      <div className="mt-3"><a href="https://github.com/chingu-voyages/V54-tier3-team-34" className="text-white font-bold">GitHub </a>© 2025 Team 54-3-34. All rights reserved. </div>
    </div>
  );
}
