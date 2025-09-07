import React, { useState } from 'react';
import bg from "../../assets/images/bg.webp";
import { motion } from 'framer-motion';
import Card from '../../UI/Card';
import CustomInput from '../../UI/CustomInput';
import MainBtn from '../../UI/MainBtn';
import fawzi from '../../assets/images/fawzy.png';
import { BsFillCreditCardFill } from "react-icons/bs";
import masterCard from '../../assets/images/mastercard.png';
import visa from '../../assets/images/visa.png';
const Settings = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [name, setName] = useState('Fawzi Sayed'); // Dummy initial name
    const [email, setEmail] = useState('bfiro.inc@gmail.com'); // Dummy initial email
    const [profileImage, setProfileImage] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [cards, setCards] = useState([]); // Example: [{id: 1, name: 'My Card', number: '4111111111111111', exp: '12/25', cvv: '123', type: 'visa', isDefault: true}]
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);
    const [newCardName, setNewCardName] = useState('');
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardExp, setNewCardExp] = useState('');
    const [newCardCvv, setNewCardCvv] = useState('');
    const [notifications, setNotifications] = useState({
        'New releases': false,
        'UX Camp': false,
        'Offers': false
    });

    const tabs = ['Profile', 'Change Password', 'Payment methods', 'Notifications', 'Delete Account'];

    const tabContent = {
        Profile: {
            title: 'Profile',
            text: 'Update your avatar by clicking the image below. 288x288 px size recommended in PNG or JPG format only.'
        },
        'Change Password': {
            title: 'Update your password',
            text: 'You can update your password below. If you forgot your current password please contact support for assistance.'
        },
        'Payment methods': {
            title: 'Add new card',
            text: 'Add a new card for future purchases and enable a more seamless shopping experience. Your card details are secured and encrypted by Stripe.'
        },
        Notifications: {
            title: 'Email notifications',
            text: 'Trigger email notifications based on the following events:'
        },
        'Delete Account': {
            title: 'Delete account',
            text: 'Permanently deleting your account and all associated data is irreversible. Proceed'
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = async () => {
        try {
            // Dummy POST request for profile update
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email })
            });
            const data = await response.json();
            console.log('Profile updated:', data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSavePassword = async () => {
        try {
            // Dummy POST request for password update
            const response = await fetch('/api/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
            });
            const data = await response.json();
            console.log('Password updated:', data);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };
    const getCardType = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        return null;
    };
    const handleAddCard = () => {
        const type = getCardType(newCardNumber);
        const newId = cards.length + 1;
        const updatedCards = [...cards, { id: newId, name: newCardName, number: newCardNumber, exp: newCardExp, cvv: newCardCvv, type, isDefault: cards.length === 0 }];
        setCards(updatedCards);
        setIsAddingNewCard(false);
        setNewCardName('');
        setNewCardNumber('');
        setNewCardExp('');
        setNewCardCvv('');
    };

    const handleCancelAddCard = () => {
        setIsAddingNewCard(false);
        setNewCardName('');
        setNewCardNumber('');
        setNewCardExp('');
        setNewCardCvv('');
    };

    const handleToggleDefault = (id) => {
        setCards(cards.map(card => ({
            ...card,
            isDefault: card.id === id ? true : false
        })));
    };

    const handleToggleNotification = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveNotifications = async () => {
        try {
            // Dummy POST request for notification preferences update
            const response = await fetch('/api/update-notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notifications)
            });
            const data = await response.json();
            console.log('Notification preferences updated:', data);
        } catch (error) {
            console.error('Error updating notification preferences:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // Dummy DELETE request for account deletion
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('Account deleted:', data);
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    // Format card number with spaces every 4 digits
    const formatCardNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    // Handle card number input
    const handleCardNumberChange = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 16);
        setNewCardNumber(formatCardNumber(cleaned));
    };

    // Handle expiration date input
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

    // Validate form
    const isFormValid = () => {
        const cleanedCardNumber = newCardNumber.replace(/\D/g, '');
        const cleanedExp = newCardExp.replace(/\D/g, '');
        return (
            newCardName.trim() !== '' &&
            cleanedCardNumber.length === 16 &&
            cleanedExp.length === 4 &&
            parseInt(cleanedExp.slice(0, 2)) <= 12 &&
            newCardCvv.length >= 3
        );
    };
    return (
        <section className="relative overflow-x-hidden pt-[100px] !overflow-y-hidden min-h-svh flex flex-col">
            <div className="absolute top-0 left-0 inset-0 size-full z-[-1] select-none pointer-events-none opacity-15 flex items-center justify-center">
                <img src={bg} className="w-full object-cover absolute top-0" />
                <div className="absolute inset-0 size-full bg-gradient-to-t from-[#121212] from-[60%] to-transparent" />
            </div>
            <div className="content-contain mx-auto text-center flex flex-col justify-start items-center flex-1 mt-[150px] pb-[50px]">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-[600] text-[48px] md:text-[64px] leading-[100%] select-none">
                    Account settings
                </motion.h1>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[#9CA7B4] text-[24px] font-[300] leading-[100%] mt-[20px] mb-[150px] select-none">
                    Manage your profile, security, payment and notification settings.
                </motion.span>
                <div className='max-w-[663px] flex justify-center items-start gap-[24px]'>
                    <Card
                        animateInint={{ opacity: 0, x: -50 }}
                        animateWhileInView={{ opacity: 1, x: 0 }}
                        className="!px-[20px] !py-[20px] relative text-center flex flex-col gap-[8px] w-1/3"
                    >
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-[50px] w-full border-[2px] flex p-[16px] justify-center items-center text-[14px] font-[600] ${activeTab === tab
                                        ? 'border-[#1FCCFF] text-white'
                                        : 'text-[#9CA7B4] border-[#424242] hover:text-white hover:border-white duration-500'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </Card>
                    <Card
                        animateInint={{ opacity: 0, x: 50 }}
                        animateWhileInView={{ opacity: 1, x: 0 }}
                        className="!px-[32px] !py-[32px] !pb-[40px] relative flex flex-col w-2/3 !text-left"
                    >
                        <h2 className="text-[24px] font-[600] mb-2">{tabContent[activeTab].title}</h2>
                        <p className="text-[#9CA7B4] text-[16px] font-[300]">{tabContent[activeTab].text}</p>
                        {activeTab === 'Profile' && (
                            <div className="flex flex-col items-center">
                                <div className="relative size-[160px] overflow-hidden rounded-full cursor-pointer my-4 group">
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                    <img
                                        src={profileImage || fawzi}
                                        className="w-full h-full object-cover"
                                        alt="Profile"
                                    />
                                    <div className='absolute top-0 left-0 inset-0 size-full bg-black opacity-0 bg-opacity-0 group-hover:bg-opacity-50 hover:opacity-100 duration-500 flex items-center justify-center text-white'>
                                        Upload
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <h3 className="text-[20px] font-[500]">Details</h3>
                                    <CustomInput
                                        id="name"
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full"
                                    />
                                    <CustomInput
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className='w-full mt-[60px]'>
                                    <MainBtn
                                        text="Save changes"
                                        onClick={handleSaveProfile}
                                        className="!w-full"
                                        spanClass="!w-full"
                                        noScale={true}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'Change Password' && (
                            <div>
                                <div className="w-full flex flex-col gap-4 mt-8">
                                    <CustomInput
                                        id="current-password"
                                        label="Current password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <CustomInput
                                        id="new-password"
                                        label="New password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <CustomInput
                                        id="confirm-new-password"
                                        label="Confirm new password"
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div className='!w-full mt-[60px] relative'>
                                    <MainBtn
                                        text="Save changes"
                                        onClick={handleSavePassword}
                                        className="!w-full !max-w-full"
                                        spanClass="!w-full"
                                        noScale={true}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'Payment methods' && (
                            <div className="w-full flex flex-col gap-[20px]">
                                {cards.map((card, index) => (
                                    <div key={card.id} className="flex flex-col gap-[10px]">
                                        <div className='border-[2px] border-[#424242] rounded-[18px] relative mt-[50px]'>
                                            <h3 className="text-[16px] font-[400] absolute top-[-15px] left-[15px]">Card {index + 1}</h3>
                                            <CustomInput custom label="" divClass={'!mt-0'}>
                                                <input
                                                    type="text"
                                                    placeholder="1234 1234 1234 1234"
                                                    value={formatCardNumber(card.number)}
                                                    readOnly
                                                    onChange={(e) => setNewCardNumber(e.target.value)}
                                                    className="font-[300] bg-transparent h-full p-[20px] border-b-[2px] border-[#424242] trans-3 outline-none pr-[50px]"
                                                />
                                                <div className="absolute right-[20px] top-1/2 -translate-y-1/2">
                                                    {getCardType(card.number) === 'visa' && (
                                                        <img src={visa} alt="Visa" className="h-6 opacity-100" />
                                                    )}
                                                    {getCardType(card.number) === 'mastercard' && (
                                                        <img src={masterCard} alt="Mastercard" className="h-6 opacity-100" />
                                                    )}
                                                    {!getCardType(card.number) && (
                                                        <BsFillCreditCardFill className='opacity-20' size={24} />
                                                    )}
                                                </div>
                                            </CustomInput>
                                            <div className="grid grid-cols-2 w-full">
                                                <span className="font-[300] bg-transparent text-[16px] leading-tight p-[20px] border-r-[2px] border-[#424242] trans-3 outline-none pr-[50px] h-[56px]">{card.exp}</span>
                                                <label className="relative inline-flex items-center cursor-pointer gap-2 p-[20px] text-[16px] leading-tight h-[56px]">
                                                    <span className="text-[16px] font-[500] text-[#9CA7B4]">Default</span>
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={card.isDefault}
                                                        onChange={() => handleToggleDefault(card.id)}
                                                    />
                                                    <div className="w-11 h-6 bg-[#070707] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full relative after:leading-tight peer-checked:after:content-['✓'] after:font-bold peer-checked:after:border-white after:content-[''] after:text-[#13151F] after:text-center after:absolute after:top-[2px] after:left-[2px] after:bg-[#E9FAFF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137C9C]"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {cards.length > 0 && !isAddingNewCard && (
                                    <MainBtn
                                        text="Add a new card"
                                        onClick={() => setIsAddingNewCard(true)}
                                        divClass='!flex-1 !w-full'
                                        className='!flex-1 !w-full mt-[20px]'
                                        spanClass='!flex-1 !w-full'
                                    />
                                )}
                                {(cards.length === 0 || isAddingNewCard) && (
                                    <div className="flex flex-col gap-[20px]">
                                        <div className='border-[2px] border-[#424242] rounded-[18px] relative mt-[50px]'>
                                            <h3 className="text-[16px] font-[400] absolute top-[-15px] left-[15px]">Card Information</h3>
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
                                            <CustomInput custom label="" divClass={'!mt-0'}>
                                                <input
                                                    type="text"
                                                    placeholder="1234 1234 1234 1234"
                                                    value={newCardNumber}
                                                    onChange={(e) => handleCardNumberChange(e.target.value)}
                                                    className="font-[300] bg-transparent h-full p-[20px] border-b-[2px] border-[#424242] trans-3 outline-none pr-[50px]"
                                                    required
                                                    maxLength={19}
                                                />
                                                <div className="absolute right-[20px] top-1/2 -translate-y-1/2">
                                                    {getCardType(newCardNumber) === 'visa' && (
                                                        <img src={visa} alt="Visa" className="h-6 opacity-100" />
                                                    )}
                                                    {getCardType(newCardNumber) === 'mastercard' && (
                                                        <img src={masterCard} alt="Mastercard" className="h-6 opacity-100" />
                                                    )}
                                                    {!getCardType(newCardNumber) && (
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
                                                        onChange={(e) => handleExpDateChange(e.target.value)}
                                                        className="font-[300] bg-transparent h-full p-[20px] border-r-[2px] border-[#424242] trans-3 outline-none pr-[50px]"
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
                                        <div className="flex gap-[10px] mt-[20px] w-full">
                                            {cards.length > 0 && (
                                                <MainBtn
                                                    text="Cancel"
                                                    onClick={handleCancelAddCard}
                                                    divClass='!flex-1 !w-full'
                                                    className='!flex-1 !w-full'
                                                    spanClass='!flex-1 !w-full'
                                                />
                                            )}
                                            <MainBtn
                                                text="Save Card"
                                                onClick={handleAddCard}
                                                disabled={!isFormValid()}
                                                divClass='!flex-1 !w-full'
                                                className='!flex-1 !w-full'
                                                spanClass='!flex-1 !w-full'
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'Notifications' && (
                            <div className='mt-8'>
                                <div className="w-full flex flex-col gap-4">
                                    {['New releases', 'UX Camp', 'Offers'].map((notification) => (
                                        <div key={notification} className="flex justify-between items-center">
                                            <span className="text-[16px] font-[500] text-white">{notification}</span>
                                            <label className="relative inline-flex items-center cursor-pointer gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={notifications[notification]}
                                                    onChange={() => handleToggleNotification(notification)}
                                                />
                                                <div className="w-11 h-6 bg-[#070707] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full relative after:leading-tight peer-checked:after:content-['✓'] after:font-bold peer-checked:after:border-white after:content-[''] after:text-[#13151F] after:text-center after:absolute after:top-[2px] after:left-[2px] after:bg-[#E9FAFF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137C9C]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-[60px] w-full'>
                                    <MainBtn
                                        text="Save Preferences"
                                        onClick={handleSaveNotifications}
                                        className="w-full"
                                        spanClass="w-full"
                                        noScale={true}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'Delete Account' && (
                            <div>
                                <div className="w-full flex flex-col">
                                    <br />
                                    <p className='text-[#9CA7B4] text-[16px] font-[300]'>with caution. You can delete your account by clicking the Delete Account button below.</p>
                                </div>
                                <div className='mt-[60px] w-full'>
                                    <MainBtn
                                        text="Delete Account"
                                        onClick={handleDeleteAccount}
                                        className="w-full"
                                        spanClass="w-full"
                                        noScale={true}
                                        colorScheme="red"
                                    />
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Settings;