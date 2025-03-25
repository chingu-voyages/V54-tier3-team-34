import Button from "./components/Button";
import Header from "./components/Header";
import OutputField from "./components/OutputField";
import TextArea from "./components/TextArea";

function App() {
  return (
    <div class="flex min-h-screen flex-col items-center gap-5 bg-black">
<Header />
      <div className="w-full max-w-[1000px] flex-1 border border-green-500">
        <div className="bg-green-500 p-3">
          A <strong>persona</strong> describes who the result will be tailored
          for
        </div>
        {/* if there is output */}
        <OutputField />
        <div class="relative mx-1 mt-5 p-1">
          <TextArea
            title={"persona"}
            placeholder={
              "You are a Product Owner, Scrum Master, UI/UX Designer, Web Developer, or Data Scientist who is at the beginning of your career and is looking to apply what you've learned to build practical experience to help you get noticed in the job market."
            }
          />

          <div className="absolute bottom-5 flex w-full items-center justify-around gap-3">
            <Button text="clear" />
            <Button text="continue" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-5 text-4xl text-green-500">
          <span className="mt-2 text-2xl">←</span>
          <span className="text-2xl">⬟</span>
          <span>⬠</span>
          <span>⬠</span>
          <span>⬠</span>
          <span>⬠</span>
          <span className="mt-2 text-2xl">→</span>
        </div>
      </div>
      {/* initial button */}
      {/* <button className="penta absolute right-1/2 bottom-5 h-28 w-28 translate-x-1/2 bg-green-500 text-lg font-bold opacity-50 drop-shadow-[3px_3px_0px_white] filter hover:drop-shadow-[1px_1px_0px_white] active:drop-shadow-[0px_0px_0px_white]">
        generate
      </button> */}
      {/* output already visible */}
      <div className="fixed right-3 bottom-3">
        <div className="absolute z-10 mt-[10px] ml-[12px] text-xs leading-[10px] text-white">
          <div>gen</div>
          <div>er</div>ate
        </div>
        <button className="penta animate-rotate h-12 w-12 bg-green-500"></button>
      </div>
      <footer className="hidden w-full translate-y-full bg-black text-center md:block">
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
      </footer>
    </div>
  );
}

export default App;
