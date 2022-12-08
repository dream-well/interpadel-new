import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import cn from "classnames";

export default function Centers() {
  return (
    <div className="rs-theme-light">
      <Search />
      <Body />
    </div>
  );
}

function Search() {
  return (
    <div>
      <div className="flex mt-[6.25rem] justify-between">
        <InputPicker
          placeholder="In/out condition"
          className="w-[20rem]"
          data={[]}
        />
        <Input placeholder="Find venue, city..." className="w-[20rem]" />
        <DatePicker className="w-[15rem]" size="lg" />
        <div>
          <Button
            appearance="primary"
            className="!bg-green !text-black h-[3rem] w-[9rem]"
          >
            Search <SearchIcon className="ml-2"/>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div>
      <div className="font-Saira text-[1.5rem] font-semibold my-[2rem]">
        18 found clubs, 12 with availability
      </div>
      <div className="flex flex-wrap justify-between">
        {data.map((item, key) => (
          <div key={key} className="mb-[1.5rem] flex flex-col mx-2">
            <img src="images/centers/01.png" className="w-[22rem]"/>
            <div className="bg-dark text-white flex flex-col p-[1rem] rounded-b-2xl">
              <div className="font-Saira text-[1.75rem] font-semibold">
                Sanset Padel
              </div>
              <div>
                <LocationIcon />
                &nbsp;Helsingborg
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const data = [
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
  {
    name: "Sanset Padel",
    location: "Helsingborg",
  },
];
