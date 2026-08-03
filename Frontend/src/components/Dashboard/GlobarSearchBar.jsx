import { Search,  Command } from "lucide-react";

const GlobalSearchBar = () => {

    return (
     <div className="flex justify-center w-100 -mt-1 ml-30  ">
  <div className="relative w-full max-w-2xl">
    <Search
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search anything..."
      className="
        w-full
        h-10
        rounded-xl
        border
        border-slate-200
        bg-white
        pl-12
        pr-20
        text-sm
        placeholder:text-slate-400
        shadow-sm
        outline-none
        transition-all
        duration-200
       
        
       "/>

    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
      <Command size={13} />
      K
    </div>
  </div>
</div>
  );
 
};

export default GlobalSearchBar;