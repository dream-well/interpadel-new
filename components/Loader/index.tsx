import { RiseLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className='flex grow w-full min-h-[6rem] items-center justify-center bg-grey'>
            <RiseLoader color='#C2FF00' />
        </div>
    )
}