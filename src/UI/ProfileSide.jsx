import { Link } from "react-router-dom";

import ProfileIcon from "../assets/images/svgs/ProfileIcon";
import HeartIcon from "../assets/images/svgs/HeartIcon";
import PurchasesIcon from "../assets/images/svgs/PurchasesIcon";
import SettingsIcon from "../assets/images/svgs/SettingsIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";
const storageUrl = import.meta.env.VITE_BASE_STORAGE_URL;
const ProfileSide = ({ setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <div className="mt-[24px] w-[400px] h-full flex flex-col gap-[25px]">
      {/* Title */}
      <div className="flex gap-[8px]">
        <div className="flex items-center justify-center size-[80px] border border-[--black]  bg-[--black] overflow-hidden rounded-full">
          {user?.avatar_url ? (
            <img
              src={
                user?.avatar_url.startsWith("https://")
                  ? user?.avatar_url
                  : `${storageUrl}${user?.avatar_url}`
              }
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-3xl">{user?.name[0]}</div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start ">
          <h2 className="text-[30px] font-[400] text-nowrap truncate ">
            {user?.name}
          </h2>
          <span className="text-[16px] font-[300]">{user?.email}</span>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-[12px]">
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex-col gap-[10px] p-1 cursor-pointer text-[#9CA7B4] hover:text-white size-[192px] border-[#5B5E79] border rounded-[20px] hover:border-[#1FCCFF] trans-3 group flex items-center justify-center"
        >
          <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
            <ProfileIcon className={"size-[35px]"} />
          </span>
          Profile
        </Link>
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex-col gap-[10px] p-1 cursor-pointer text-[#9CA7B4] hover:text-white size-[192px] border-[#5B5E79] border rounded-[20px] hover:border-[#1FCCFF] trans-3 group flex items-center justify-center"
        >
          <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
            <HeartIcon className={"size-[35px]"} />
          </span>
          Favorite
        </Link>
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex-col gap-[10px] p-1 cursor-pointer text-[#9CA7B4] hover:text-white size-[192px] border-[#5B5E79] border rounded-[20px] hover:border-[#1FCCFF] trans-3 group flex items-center justify-center"
        >
          <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
            <PurchasesIcon className={"size-[35px]"} />
          </span>
          Purchases
        </Link>
        <Link
          to="/settings"
          onClick={() => setOpen(false)}
          className="flex-col gap-[10px] p-1 text-[#9CA7B4] cursor-pointer hover:text-white size-[192px] border-[#5B5E79] border rounded-[20px] hover:border-[#1FCCFF] trans-3 group flex items-center justify-center"
        >
          <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
            <SettingsIcon className={"size-[35px]"} />
          </span>
          Account Settings
        </Link>
      </div>
      <div className=" grow-[1] flex items-end justify-center">
        <button
          onClick={() => handleLogout()}
          className="bg-white flex items-center justify-center w-full border border-b-[6px] text-[18px] text-black border-b-[#cccccc] rounded-[50px] relative z-[4] px-[50px] py-[20px] font-[600]"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfileSide;
