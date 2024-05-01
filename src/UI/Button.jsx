import React from "react";

function Button({ children }) {
  return (
    <button className="absolute z-50 h-10 font-bold text-white bg-red-500 border-none rounded-full cursor-pointer top-2 right-2 aspect-square bg-slate-600">
      {children}
    </button>
  );
}

export default Button;
