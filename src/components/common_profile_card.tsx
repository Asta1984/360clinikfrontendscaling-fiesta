import { ProfileCard } from "./HOC/profile_card";

export default function ProfileStucture() {
    return(
        <>
        <div className=" mx-10 flex p-4">
           <ProfileCard
             firstName="Sienna"
             lastName="Hewitt"
             email="siennahewitt@gmail.com"
             contact="9926339377"
             dateofbirth='23-09-2001'
           />
        </div>
        </>
    )
}