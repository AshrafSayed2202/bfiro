import bg from "../../assets/images/bg.webp";
import fawzy from "../../assets/images/fawzy.png";
import Card from "../../UI/Card.jsx";

import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";

import ItemCard from "../../UI/ItemCard.jsx";
import { useNavigate } from "react-router";
const Profile = () => {
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      img: project1,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
    {
      id: 2,
      img: project2,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
  ];
  return (
    <div>
      <section className="relative overflow-x-hidden pt-[320px] !overflow-y-hidden min-h-svh flex flex-col">
        <div className="absolute top-0 left-0 inset-0 size-full z-[-1] select-none pointer-events-none opacity-15 flex items-center justify-center">
          <img src={bg} className="min-w-full min-h-screen object-cover absolute top-0 " />
          <div className="absolute inset-0 size-full bg-gradient-to-t from-[#121212] from-[60%] to-transparent" />
        </div>
        <div className="content-contain flex flex-col">
          <div className="flex gap-[16px] mb-[100px]">
            <div className="flex items-center justify-center size-[100px] overflow-hidden rounded-full">
              <img src={fawzy} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center items-start ">
              <h2 className="text-[30px] font-[400]">Fawzi Sayed</h2>
              <span className="text-[16px] font-[300]">
                bfiro.inc@gmail.com
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-[60px]">
            <div className="flex justify-center items-center gap-[20px]">
              <button className="h-[58px] rounded-[50px] border-[2px] flex px-[16px] border-[#1FCCFF] justify-center items-center text-[18px] font-[600]">
                Favorites 2
              </button>
              <button className="h-[58px] text-[#9CA7B4] trans-3 hover:text-white hover:border-white rounded-[50px] border-[2px] flex px-[16px] border-[#424242] justify-center items-center text-[18px] font-[600]">
                Purchases
              </button>
            </div>
            <button className="h-[58px] text-[#9CA7B4] trans-3 hover:text-white hover:border-white rounded-[50px] border-[2px] flex px-[16px] border-[#424242] justify-center items-center text-[18px] font-[600]" onClick={() => navigate("/settings")}>
              Edit Profile
            </button>
          </div>
          <Card
            animateInint={{ opacity: 0 }}
            animateWhileInView={{ opacity: 1 }}
            animateTransition={{ duration: 1.5, delay: 1 }}
            className={
              "col-span-12 grid sm:grid-cols-4 gap-[5px] items-center !p-0 relative bg-transparent md:!p-0"
            }
          >
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Profile;
