import React from "react";

export default function Footer() {
  return (
    <div className="bg-primary-green pt-5 pb-2">
      <div className="grid grid-cols-2">
        <ul className="list-none">
          <li>
            <a href="https://www.linkedin.com/in/anitaboakyeyiadom/" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">
              Anita Boakye-Yiadom
            </a>
            - Scrum Master
          </li>
          <li>
            <a href="https://github.com/snowbytes" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">
              Anas Maddah
            </a>
            - Developer
          </li>
          <li>
            <a href="https://github.com/minezzig" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">
              Greg Minezzi
            </a>
            - Developer
          </li>
        </ul>
        <ul className="list-none">
          <li>
            <a href="https://github.com/SnowmanP423" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">
              Pat Okwu
            </a>
            - Product Owner
          </li>
          <li>
            <a href="https://github.com/VecchiR" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">
              Rafael Vecchi
            </a>
            - Developer
          </li>
        </ul>
      </div>

      <div className="mt-3"><a href="https://github.com/chingu-voyages/V54-tier3-team-34" target="_blank" rel="noopener noreferrer" className="text-dark-text font-semibold">GitHub </a>© 2025 Team 54-3-34. All rights reserved. </div>

    </div>
  );
}
