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
          <li>
            <a href="" className="text-white">
              Pat Okwu
            </a>
            - Product Owner
          </li>
        </ul>
        <ul className="list-none">
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
          <li>
            <a href="" className="text-white">
              Kosiso
            </a>
            - Developer
          </li>
        </ul>
      </div>
      <div>© 2025 Chingu. All rights reserved.</div>
    </div>
  );
}
