import classnames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from '@rsuite/icons/Search';
import { useAppSelector } from "store/hook";
import { setQuery } from "store/slices/appSlice";


export default function NavSearch() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [query, setQueryValue] = useState("");
    const [focus, setFocus] = useState(false)
    const onKeyDown = (e) => {
      if( e.key === "Enter" ){
        // router.push("/search?q=" + searchTerm)
        dispatch(setQuery(query));
        if(router.pathname == '/') {
          router.push('/bookings?q=' + query);
        }
      }
    }

    const onChange = (e) => {
      setQueryValue(e.target.value)
      if(e.target.value == "")
        dispatch(setQuery(""));
    };
    
    return (
      <div className={classnames(`index-search bg-transparent items-center rounded-lg flex relative pl-3 overflow-hidden border border-grey h-[3rem] mr-4`, focus && 'flex-grow w-[20rem] border-[#43913e]') }>
        <SearchIcon />
        <input type="search" value={query} onKeyDown={onKeyDown} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className={classnames("pl-3 pr-4 focus:outline-none bg-transparent", (focus?"flex-grow":""))} name="" placeholder="Search ..." />
      </div>
    );
  }
  