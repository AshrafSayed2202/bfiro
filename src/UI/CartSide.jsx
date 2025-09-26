import React, { useEffect, useState } from 'react';
import { useCart } from "../store/Cart";
import CustomInput from './CustomInput';
import masterCard from '../assets/images/mastercard.png';
import visa from '../assets/images/visa.png';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import MainBtn from './MainBtn';
import LockIcon from '../assets/images/svgs/LockIcon';
import { IoArrowBack } from "react-icons/io5";

const CartSide = ({ setIsOpen, hasCard = true, showCheckout, setShowCheckout }) => {
    const { cart, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [newCardName, setNewCardName] = useState('');
    const [newCardExp, setNewCardExp] = useState('');
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardCvv, setNewCardCvv] = useState('');
    const [cartTotal, setCartTotal] = useState(0);

    const card = hasCard ? {
        index: 1,
        Number: '5424123412343015',
        exp: '09/25',
    } : null;

    useEffect(() => {
        let total = 0;
        cart.items.forEach((item) => {
            total += item.price * item.quantity;
        });
        setCartTotal(total);

        if (card && hasCard) {
            setNewCardNumber(formatCardNumber(card.Number));
            setNewCardExp(card.exp);
        }
    }, [cart.items, hasCard, card]);

    const handleExpDateChange = (value) => {
        let cleaned = value.replace(/\D/g, '').slice(0, 4);
        if (cleaned.length >= 2) {
            const month = parseInt(cleaned.slice(0, 2));
            const day = parseInt(cleaned.slice(2));
            if (month > 12) cleaned = '12' + cleaned.slice(2);
            if (day > 31) cleaned = cleaned.slice(0, 2) + '31';
            cleaned = cleaned.slice(0, 2) + ' / ' + cleaned.slice(2);
        }
        setNewCardExp(cleaned);
    };

    const formatCardNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (hasCard && cleaned.length >= 8) {
            return `${cleaned.slice(0, 4)} **** **** ${cleaned.slice(-4)}`;
        }
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 16);
        setNewCardNumber(formatCardNumber(cleaned));
    };

    const getCardType = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        return null;
    };

    if (!cart.items.length) {
        return (
            <div className='w-[390px] max-w-full flex flex-col gap-[25px] justify-center items-center'>
                <div className='flex flex-col gap-[15px] w-full'>
                    <div className='w-full h-[256px] bg-[#282828] rounded-[20px]' />
                    <div className='w-full h-[25px] bg-[#282828] rounded-[20px]' />
                    <div className='w-1/3 h-[25px] bg-[#282828] rounded-[20px]' />
                </div>
                <div className='flex flex-col gap-[15px] w-full'>
                    <div className='w-full h-[256px] bg-[#282828] rounded-[20px]' />
                    <div className='w-full h-[25px] bg-[#282828] rounded-[20px]' />
                    <div className='w-1/3 h-[25px] bg-[#282828] rounded-[20px]' />
                </div>
                <div className='flex flex-col gap-[15px] w-full'>
                    <div className='w-full h-[256px] bg-[#282828] rounded-[20px]' />
                    <div className='w-full h-[25px] bg-[#282828] rounded-[20px]' />
                    <div className='w-1/3 h-[25px] bg-[#282828] rounded-[20px]' />
                </div>
            </div>
        );
    }

    return (
        <div className='h-full w-full flex flex-col sm:flex-row gap-10 items-start mt-[24px] overflow-x-hidden relative sm:static max-h-screen'>
            {cart.items.length > 0 && (
                <div className={`max-w-full w-full flex-col sm:w-auto sm:min-h-[500px] flex-1 sm:h-screen relative sm:absolute overflow-x-hidden sm:bg-[#262626BF] sm:right-full top-0 sm:rounded-l-[20px] sm:p-5 overflow-y-auto flex mx-auto gap-6 items-center ${(showCheckout && window.innerWidth < 992) ? 'hidden' : 'flex'}`}>
                    <div className='gap-1 items-center font-[600] border-[2px] rounded-xl bg-[#1D1C1E] border-[#FF4A4A] hover:underline cursor-pointer py-[10px] px-[18px] ml-auto hidden sm:flex' onClick={() => clearCart()}>
                        Clear Cart
                    </div>
                    <div className='w-full flex-1'>
                        {cart.items?.map((item) => (
                            <div key={item.id} className='flex gap-[10px] w-full sm:w-[390px] flex-col mx-auto sm:mx-0 sm:ml-auto mb-3'>
                                <img src={item.img} alt="item" className='rounded-[20px] w-full' />
                                <div className='text-[16px] text-nowrap text-ellipsis overflow-hidden flex flex-col gap-1'>
                                    {item.title}
                                    <div className='flex justify-between items-center'>
                                        <div className="flex items-center gap-2">
                                            <span className="opacity-50 line-through">${item.price}</span>
                                            <span className="font-[600]">${(item.price - item.discount) > 0 ? (item.price - item.discount) : 0}</span>
                                        </div>
                                        <div className='text-[#FF3B30] cursor-pointer hover:underline flex gap-1 items-center' onClick={() => removeItem(item.id)}>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {window.innerWidth < 992 && (
                        <div className='w-full mt-auto'>
                            <div className='text-[14px] text-[#9CA7B4] text-center mb-[15px] sm:mb-[25px]'>
                                Paying a total of <span className='font-bold text-white opacity-100'>${cartTotal}</span> for 1 product. <br />
                                Download with <span className='font-bold text-white hover:underline cursor-pointer' onClick={() => { navigate('./pricing'); window.scrollTo(0, 0); setIsOpen(false) }}>Yearly-Access</span> instead?
                            </div>
                            <MainBtn
                                text='Continue to Checkout'
                                className="group w-full text-center"
                                spanClass="px-[65px] !font-[300] w-full !font-[600]"
                                onClick={() => setShowCheckout(true)}
                            />
                            <p className='flex gap-1 items-center text-[#9CA7B4] text-[14px] justify-center my-[15px] sm:my-[25px]'>
                                <LockIcon /> Your payment is secured by Stripe
                            </p>
                        </div>
                    )}
                </div>
            )}
            <div className={` h-full flex flex-col gap-[25px] justify-center overflow-hidden w-full mx-auto ${!showCheckout && window.innerWidth < 992 ? 'hidden' : 'flex'}`}>
                <div className='flex gap-[15px] justify-between items-center'>
                    <div className='flex items-start gap-2'>
                        <button
                            onClick={() => setShowCheckout(false)}
                            className='text-[#9CA7B4] hover:text-white sm:hidden flex items-center justify-center rounded-full border-[2px] p-[6px] border-[#9CA7B4]'
                        >
                            <IoArrowBack size={24} />
                        </button>
                        <div className='flex flex-col w-full leading-none'>
                            <h2 className='text-[30px] font-[500] mb-2'>Checkout</h2>
                            <p className='opacity-65 text-[14px]'>bfiro.inc@gmail.com</p>
                        </div>
                    </div>
                    <span className='px-[20px] py-[6px] rounded-xl border-[2px] border-[#2194FF] bg-[#1D1C1E] sm:flex hidden'>
                        Stripe
                    </span>
                </div>
                <div className='border-[2px] border-[#424242] rounded-[18px] relative mt-[50px]'>
                    <h3 className="text-[16px] font-[400] absolute top-[-15px] left-[15px] filter-blur-4 bg-[#262626cc] px-[10px]">
                        {hasCard && card ? `Card ${card.index}` : 'Card Information'}
                    </h3>
                    {(!hasCard || !card) && (
                        <CustomInput custom label="" divClass={'!mt-0'}>
                            <input
                                id="card-name"
                                type="text"
                                placeholder="Card Name"
                                value={newCardName}
                                onChange={(e) => setNewCardName(e.target.value)}
                                className="font-[300] bg-transparent h-full p-[20px] border-b-[2px] border-[#424242] trans-3 outline-none pr-[50px]"
                                required
                            />
                        </CustomInput>
                    )}
                    <CustomInput custom label="" divClass={'!mt-0'}>
                        <input
                            type="text"
                            placeholder="1234 1234 1234 1234"
                            value={newCardNumber}
                            onChange={hasCard && card ? undefined : (e) => handleCardNumberChange(e.target.value)}
                            readOnly={hasCard && card}
                            className={`font-[300] bg-transparent h-full p-[20px] border-b-[2px] border-[#424242] trans-3 outline-none pr-[50px] ${hasCard && card ? 'cursor-not-allowed' : ''}`}
                            required
                            maxLength={19}
                        />
                        <div className="absolute right-[20px] top-1/2 -translate-y-1/2">
                            {getCardType(hasCard && card ? card.Number : newCardNumber) === 'visa' && (
                                <img src={visa} alt="Visa" className="h-6 opacity-100" />
                            )}
                            {getCardType(hasCard && card ? card.Number : newCardNumber) === 'mastercard' && (
                                <img src={masterCard} alt="Mastercard" className="h-6 opacity-100" />
                            )}
                            {!getCardType(hasCard && card ? card.Number : newCardNumber) && (
                                <BsFillCreditCardFill className='opacity-20' size={24} />
                            )}
                        </div>
                    </CustomInput>
                    <div className="grid grid-cols-2 w-full">
                        <CustomInput custom label="" divClass={'!mt-0'}>
                            <input
                                id="exp-date"
                                type="text"
                                placeholder="MM / YY"
                                value={newCardExp}
                                onChange={hasCard && card ? undefined : (e) => handleExpDateChange(e.target.value)}
                                readOnly={hasCard && card}
                                className={`font-[300] bg-transparent h-full p-[20px] border-r-[2px] border-[#424242] trans-3 outline-none pr-[50px] ${hasCard && card ? 'cursor-not-allowed' : ''}`}
                                required
                                maxLength={7}
                            />
                        </CustomInput>
                        <CustomInput custom label="" divClass={'!mt-0'}>
                            <input
                                id="ccv"
                                type="text"
                                placeholder="CCV"
                                value={newCardCvv}
                                onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, ''))}
                                className="font-[300] bg-transparent h-full p-[20px] trans-3 outline-none pr-[50px]"
                                required
                                maxLength={4}
                            />
                        </CustomInput>
                    </div>
                </div>
                {hasCard && (
                    <div className='text-center text-lg font-[600] text-[#1FCCFF] cursor-pointer hover:underline' onClick={() => {
                        setIsOpen(false);
                        navigate('/settings?tab=Payment+methods');
                        window.scrollTo(0, 0);
                    }}>
                        Add a new card
                    </div>
                )}
                <div className='w-full mt-auto'>
                    <div className='text-[14px] text-[#9CA7B4] text-center mb-[15px] sm:mb-[25px]'>
                        Paying a total of <span className='font-bold text-white opacity-100'>${cartTotal}</span> for 1 product. <br />
                        Download with <span className='font-bold text-white hover:underline cursor-pointer' onClick={() => { navigate('./pricing'); window.scrollTo(0, 0); setIsOpen(false) }}>Yearly-Access</span> instead?
                    </div>
                    <MainBtn
                        text={'Pay' + (cartTotal ? ` $${cartTotal}` : '')}
                        className="group w-full text-center"
                        spanClass="px-[65px] !font-[600] w-full"
                    />
                    <p className='flex gap-1 items-center text-[#9CA7B4] text-[14px] justify-center my-[15px] sm:my-[25px]'>
                        <LockIcon /> Your payment is secured by Stripe
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartSide;