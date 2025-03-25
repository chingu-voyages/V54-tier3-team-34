function App() {
  return (
    <div class="flex min-h-screen flex-col items-center gap-5 bg-black">
        <div className="flex flex-col items-center justify-center">
          <h1 class="mt-10 text-center text-4xl text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            Penta AI
          </h1>
          <div className="text-xs text-green-500">March 24, 2025</div>
        </div>
{/* header */}
<div className="w-full max-w-[1000px] flex-1 border border-green-500">
<div className="bg-green-500 p-3">
            A <strong>persona</strong> describes who the result will be tailored
            for
          </div>
{/* input area */}
{/* if there is output */}
<div className="mx-1 mt-5 flex-1 border text-sm border-white bg-green-500/20 p-3 text-amber-50 tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            consectetur quidem perferendis sint! Expedita ullam nemo esse officiis
            sunt. Nihil consequuntur accusamus minima voluptatibus corrupti saepe
            dolorem assumenda voluptatum praesentium quasi quae voluptate hic et
            similique eaque voluptates totam mollitia sapiente iste, libero vero!
            Sapiente beatae minus sequi omnis quaerat! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptates consectetur quidem
            perferendis sint! Expedita ullam nemo esse officiis sunt. Nihil
            consequuntur accusamus minima voluptatibus corrupti saepe dolorem
            assumenda voluptatum praesentium quasi quae voluptate hic et similique
            eaque voluptates totam mollitia sapiente iste, libero vero! Sapiente
            beatae minus sequi omnis quaerat!
          </div>
<div class="relative mx-1 mt-5 p-1">
            <textarea
              class="peer field-sizing-content min-h-52 w-full border border-green-500 p-3 pt-8 pb-12 text-green-500 outline-offset-3 valid:pt-2 valid:pb-2 valid:outline valid:outline-green-500 focus:pt-2 focus:pb-18 focus:outline focus:outline-green-500"
              placeholder="You are a Product Owner, Scrum Master, UI/UX Designer, Web Developer, or
  Data Scientist who is at the beginning of your career and is looking to apply
  what you've learned to build practical experience to help you get noticed in
  the job market."
              required
            ></textarea>
            <label
              for="name"
              class="pointer-events-none absolute top-0 left-1 m-2 bg-black px-1 text-green-500 transition-all duration-400 peer-valid:-top-[15px] peer-valid:bg-green-500 peer-valid:text-xs peer-valid:text-white peer-focus:-top-[15px] peer-focus:bg-green-500 peer-focus:text-xs peer-focus:text-white"
            >
              Persona
            </label>
            <div className="absolute bottom-5 flex w-full items-center justify-around gap-3">
              <button className="bg-green-500 px-3 py-1 shadow-[3px_3px_white] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_white] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_white]">
                clear
              </button>
              <button className="bg-green-500 px-3 py-1 shadow-[3px_3px_white] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_white] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_white]">
                continue
              </button>
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
          <div className="absolute text-white z-10 mt-[10px] ml-[12px] text-xs leading-[10px]"><div>gen</div><div>er</div>ate</div>
          <button className="penta animate-rotate h-12 w-12 bg-green-500 "></button>
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
