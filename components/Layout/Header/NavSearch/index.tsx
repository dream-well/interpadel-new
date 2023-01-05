import classnames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from '@rsuite/icons/Search';
import { useAppSelector } from "store/hook";
import { setQuery } from "store/slices/appSlice";

export default function NavSearch() {
    const query = useAppSelector(state => state.app.query);
    const dispatch = useDispatch();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [focus, setFocus] = useState(false)
    const onKeyDown = (e) => {
      if( e.key === "Enter" ){
        // router.push("/search?q=" + searchTerm)
        setSearchTerm("")
      }
    }
    return (
      <div className={classnames(`index-search bg-transparent items-center rounded-lg flex relative pl-3 overflow-hidden border border-grey h-[3rem] mr-4`, focus && 'flex-grow w-[20rem] border-[#43913e]') }>
        <SearchIcon />
        <input type="search" value={query} onKeyDown={onKeyDown} onChange={(e) => dispatch(setQuery(e.target.value))} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className={classnames("pl-3 pr-4 focus:outline-none bg-transparent", (focus?"flex-grow":""))} name="" placeholder="Search Centers"  />
      </div>
    );
  }
  