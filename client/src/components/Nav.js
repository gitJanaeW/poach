import React from "react";

export default function Nav() {
    return (
        <nav className="px-5 py-3 bg-white shadow flex justify-between">
        <div>
          <div className="flex justify-between items-center w-10">
            <img src="../favicon.png" alt='Poachd logo, which is an anstract sunny side up egg'/>
            <h1 className="text-xl mx-2">Poachd</h1>
            <span className="text-3xl cursor-pointer mx-2 md:hidden block">
              <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
            </span>
          </div>
        </div>
        <form className="my-6 md:my-0 w-2/5">
          <input className='p-2 text-l w-full border-2 border-slate-300 rounded' type="text" id="search" placeholder='Search'></input>
        </form>
        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          <button className="bg-amber-300 text-black duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
            New Recipe
          </button>
          <li className="mx-4 my-6 md:my-0">
            <img className='rounded-full w-10' src="../images/profile-photo.jpg" alt="profile photo"/>
          </li>
        </ul>
      </nav>
    );
}