import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bg from "../../assets/images/pageBg.png";
import fawzy from "../../assets/images/fawzy.png";
import Card from "../../UI/Card.jsx";
import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";
import ItemCard from "../../UI/ItemCard.jsx";
import { useFavorite } from '../../store/Favorite.jsx';
import { RiSettings4Fill } from "react-icons/ri";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorite();

  // Get active tab from URL query parameter, default to 'favorites'
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'favorites';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sample purchases data (replace with actual purchases data if available)
  const purchases = [
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

  // Update URL when activeTab changes
  useEffect(() => {
    navigate(`?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Determine which items to display based on active tab
  const displayedItems = activeTab === 'favorites' ? favorites.items : purchases;

  return (
    <div className='min-h-[calc(100vh-160px)] xs:min-h-[calc(100vh-100px)]'>
      <section className="relative overflow-x-hidden pt-[100px] xs:pt-[320px] !overflow-y-hidden flex flex-col">
        <div className="absolute top-0 left-0 inset-0 size-full z-[-1] select-none pointer-events-none opacity-15 flex items-center justify-center">
          <img
            src={bg}
            className="min-w-full !h-screen object-cover absolute top-0"
          />
          <div className="absolute inset-0 min-w-full !h-screen sm:!min-h-screen bg-gradient-to-t from-[#121212] from-[30%] to-transparent" />
        </div>
        <div className="content-contain flex flex-col">
          <div className="flex gap-[16px] mb-[60px] xs:mb-[100px]">
            <div className="flex items-center justify-center size-[70px] xs:size-[100px] overflow-hidden rounded-full">
              <img src={fawzy} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-[24px] xs:text-[30px] font-[400]">Fawzi Sayed</h2>
              <span className="text-[14px] xs:text-[16px] font-[300] opacity-60">
                bfiro.inc@gmail.com
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-[60px] flex-wrap gap-[10px]">
            <div className="flex justify-center items-center gap-[10px] xs:gap-[20px]">
              <button
                className={`h-[40px] xs:h-[58px] rounded-[50px] border-[2px] flex px-[16px] justify-center items-center text-[14px] xs:text-[18px] font-[600] ${activeTab === 'favorites'
                  ? 'border-[#1FCCFF] text-white'
                  : 'border-[#424242] text-[#9CA7B4] hover:text-white hover:border-white trans-3'
                  }`}
                onClick={() => handleTabClick('favorites')}
              >
                Favorites {favorites.items.length}
              </button>
              <button
                className={`h-[40px] xs:h-[58px] rounded-[50px] border-[2px] flex px-[16px] justify-center items-center text-[14px] xs:text-[18px] font-[600] ${activeTab === 'purchases'
                  ? 'border-[#1FCCFF] text-white'
                  : 'border-[#424242] text-[#9CA7B4] hover:text-white hover:border-white trans-3'
                  }`}
                onClick={() => handleTabClick('purchases')}
              >
                Purchases
              </button>
            </div>
            <button
              className="h-[40px] xs:h-[58px] text-[#9CA7B4] trans-3 hover:text-white hover:border-white rounded-[50px] xs:border-[2px] flex px-[16px] border-[#424242] justify-center items-center text-[25px] xs:text-[18px] font-[600]"
              onClick={() => navigate("/settings")}
            >
              <span className='hidden xs:block'>Edit Profile</span>
              <RiSettings4Fill className='block xs:hidden' />
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
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-[#9CA7B4] text-[14px] xs:text-[18px] col-span-12 text-center">
                {activeTab === 'favorites'
                  ? 'No favorites added yet.'
                  : 'No purchases made yet.'}
              </p>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Profile;