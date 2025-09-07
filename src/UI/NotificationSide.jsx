import React, { useState } from 'react';
import fawzi from '../assets/images/fawzy.png';
const NotificationSide = () => {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            user: {
                name: 'Fawzi Sayed',
                image: fawzi,
            },
            description: `You're now part of a growing community where every pixel counts and every click opens a new realm of design possibilities. With your new account, managing your purchases is just the beginning. Dive into a vast network of talented designers offering quality creative resources that help you deliver projects faster than ever before. Here's to shaping the future of design, together!`,
            timestamp: new Date(Date.now() - 3600000).toISOString(), // Example: 1 hour ago
        }
    ]);

    const handleToggleNotification = () => {
        setNotificationToggle(!notificationToggle);
    };

    const getTimeElapsed = (timestamp) => {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - notificationTime) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} sec`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
    };

    return (
        <div className='mt-[24px] w-[390px] h-full flex flex-col gap-[25px]'>
            <div className="flex justify-between items-center">
                <span className="text-[30px] font-[500] text-white">Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer gap-2">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationToggle}
                        onChange={handleToggleNotification}
                    />
                    <div className="w-11 h-6 bg-[#070707] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full relative after:leading-tight peer-checked:after:content-['✓'] after:font-bold peer-checked:after:border-white after:content-[''] after:text-[#13151F] after:text-center after:absolute after:top-[2px] after:left-[2px] after:bg-[#E9FAFF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137C9C]"></div>
                </label>
            </div>
            <div className='mt-[32px]'>
                {notifications.map((notification) => (
                    <div key={notification.id} className='flex flex-col gap-[10px] mb-[20px]'>
                        <div className='flex items-center gap-[10px]'>
                            <img
                                src={notification.user.image}
                                alt={notification.user.name}
                                className='w-[40px] h-[40px] rounded-full'
                            />
                            <span className='text-[20px] font-[500] text-white'>{notification.user.name}</span>
                        </div>
                        <span className='text-[16px] font-[400] text-[#9CA7B4]'>{notification.description}</span>
                        <span className='text-[14px] font-[400] text-[#6B7280]'>{getTimeElapsed(notification.timestamp)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationSide;