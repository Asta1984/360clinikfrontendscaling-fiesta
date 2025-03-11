import { StackingNavbar } from "../ui/stacking-navbar";

export default function Navbar() {
    return(
        <div className="relative flex justify-center ">
        <div className="absolute p-5">
          <StackingNavbar/>
        </div>
      </div>
    )
}