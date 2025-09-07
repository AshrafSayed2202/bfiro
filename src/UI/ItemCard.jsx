import React from "react";
import bfiro from "../assets/images/smallLogo.png";
import { MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Heart from "../assets/images/svgs/Heart";
import Cart from "../assets/images/svgs/Cart";
import View from "../assets/images/svgs/View";
import { useCart } from "../store/Cart";
import { useFavorite } from "../store/Favorite";
import { toast } from "react-toastify";

const ItemCard = ({ item, className }) => {
    const { id, img, title, type, price, labels, popularity, releaseDate, formats } = item;
    const { cart, addItem, removeItem } = useCart();
    const { favorites, addFavorite, removeFavorite } = useFavorite();

    // Check if the item is in the cart
    const isInCart = cart.items.some(cartItem => cartItem.id === id);
    // Check if the item is in favorites
    const isFavorite = favorites.items.some(favItem => favItem.id === id);

    // Handle cart toggle
    const handleCartToggle = () => {
        if (isInCart) {
            removeItem(id);
            toast.info(`${title} removed from cart`, {
                position: "bottom-center",
                autoClose: 1500,
            });
        } else {
            addItem(item);
            toast.success(`${title} added to cart`, {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    // Handle favorite toggle
    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(id);
        } else {
            addFavorite(item);
        }
    };

    return (
        <div
            className={`flex flex-col justify-between group/group1 cursor-pointer gap-[10px] bg-[#171718CC] rounded-[20px] overflow-hidden min-h-[355px] ${className}`}
        >
            <div className="h-[256px] flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[#171718CC] opacity-0 group-hover/group1:opacity-80 trans-3"></div>
                <div className="absolute text-[#9CA7B4] group-hover/group1:opacity-100 opacity-0 trans-3 top-[20px] right-[20px] flex items-center justify-end gap-[5px]">
                    {popularity && (
                        <span className="text-[14px] font-[600]">{popularity}</span>
                    )}
                    <button
                        onClick={handleFavoriteToggle}
                        className={`size-[55px] border-[3px] group flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full ${isFavorite ? "bg-[#44494e]" : ""}`}
                    >
                        <Heart isActive={isFavorite} />
                    </button>
                </div>
                <div className="absolute text-[#9CA7B4] group-hover/group1:opacity-100 opacity-0 gap-[30px] trans-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
                    <Link
                        className="size-[55px] border-[3px] group flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full"
                        to={`/browse/${id}`}
                    >
                        <View />
                    </Link>
                    <button
                        onClick={handleCartToggle}
                        className={`size-[55px] group border-[3px] flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full ${isInCart ? "bg-[#44494e]" : ""}`}
                    >
                        <Cart isActive={isInCart} />
                    </button>
                </div>
                <img src={img} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-[8px] px-[20px]">
                <div className="text-[#9CA7B4] truncate font-[300] flex items-center justify-start">
                    {title}
                </div>
                {labels && labels.length > 0 && (
                    <div className="text-[#9CA7B4] text-sm font-[300] flex items-center justify-between gap-1 truncate">
                        <div className="flex items-center gap-1">
                            {labels.slice(0, 2).map((label, index) => (
                                <span
                                    key={index}
                                    className="bg-[#424242cc] text-white font-[600] px-2 py-1 rounded-full text-xs"
                                >
                                    {label.text}
                                </span>
                            ))}
                            {labels.length > 2 && (
                                <span className="text-[#9CA7B4] p-1 bg-[#424242cc] rounded-full size-6 text-[12px] leading-[12px] flex items-center justify-center">
                                    +{labels.length - 2}
                                </span>
                            )}
                        </div>
                        {formats && formats.length > 0 && (
                            <div className="text-[#9CA7B4] text-sm font-[300] flex items-center justify-between gap-2 truncate">
                                <div className="flex items-center gap-2">
                                    {formats.map((format, index) => (
                                        <div key={index} className="flex items-center">
                                            {format.icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center justify-between pb-[10px]">
                    <div className="flex items-center gap-[3px] text-[#9CA7B4] font-[300]">
                        <div className="flex items-center justify-center mr-[8px] bg-[#000000] rounded-full size-[30px] flex-1 overflow-hidden">
                            <img className="size-[14px] object-contain" src={bfiro} />
                        </div>
                        <span>BeFiro</span>
                        <MdOutlineArrowRight className="text-[22px]" />
                        {type}
                    </div>
                    <div>${price}</div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;