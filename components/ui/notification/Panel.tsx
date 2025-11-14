import React, { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useBottomBar } from '@/context/BottomBarProvider'

interface NotificationData {
  id: string
  date: string
  title: string
  content: string
  isNew: boolean
  isRead: boolean
}

const notifications: NotificationData[] = [
  {
    id: '1',
    date: 'Finishes on July 23, 2025',
    title: 'First Deposit 150% Activity Rules',
    content: `The 150% first deposit promotion is not allowed to be used in Texas Hold'em games.

If it is discovered that users participating in this activity are placing bets on Texas Hold'em, the platform has the right to deduct the balance in the account without further notice.

Please be aware of and abide by the activity rules. Thank you for your understanding and cooperation! The final right of interpretation belongs to our company!`,
    isNew: true,
    isRead: false,
  },
  {
    id: '2',
    date: 'Finishes on July 23, 2025',
    title: "Texas Hold'em Poker is officially launched!",
    content: `[Texas Hold'em] Now available!

Luck and wisdom coexist, strategy and courage collide

Real matches, real-time start, authentic Texas Hold'em experience! Join Texas Hold'em now and start your own winning game!

Good luck!`,
    isNew: true,
    isRead: false,
  },
  {
    id: '3',
    date: 'Finishes on July 23, 2025',
    title:
      'Important notice: This platform does not support contract address betting',
    content: `This platform does not support contract address betting, and no rewards will be returned even if bets are placed

If you have any questions, please contact our online customer service in time, we will answer and assist you as soon as possible. Thank you for your understanding and support!`,
    isNew: true,
    isRead: false,
  },
]
interface NotificationPanelProps {
  onClose: () => void
}
const NotificationsPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'Platform' | 'Events' | 'Personal'
  >('Platform')
  const [notificationsList, setNotificationsList] =
    useState<NotificationData[]>(notifications)
  const { isHidden: isBottomBarHidden } = useBottomBar()

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const platformCount = notificationsList.filter(n => !n.isRead).length

  return (
    <div className="w-full h-full flex flex-col bg-[#111923]/[0.54] lg:rounded-t-[30px] relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pl-6 bg-gradient-to-b from-[#002554] to-[rgba(17,25,35,0.54)] border-b border-gray-700 lg:rounded-t-[30px]">
        <h1 className="text-white text-lg font-bold">Notifications</h1>
        <div
          onClick={onClose}
          className="flex items-center cursor-pointer justify-center w-9 h-9 bg-[#434444] hover:bg-[#111923] rounded-lg transition-colors lg:ml-0 ml-2"
        >
          <span>
            <X className="w-4 h-4 text-white" />
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-4 pt-0 bg-[#111923] overflow-hidden">
        {/* Segmented Control */}
        <div className="flex p-1 bg-gray-800 rounded-xl mb-4 mt-4">
          <div
            onClick={() => setActiveTab('Platform')}
            className={`flex items-center justify-center gap-2 flex-1 h-9 px-3 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
              activeTab === 'Platform'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span>Platform</span>
            {activeTab === 'Platform' && platformCount > 0 && (
              <span className="flex items-center justify-center h-5 px-1.5 bg-green-500 border border-white rounded-md text-white text-xs font-bold">
                {platformCount}
              </span>
            )}
          </div>
          <div
            onClick={() => setActiveTab('Events')}
            className={`flex items-center justify-center gap-2 flex-1 h-9 px-3 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
              activeTab === 'Events'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span>Events</span>
          </div>
          <div
            onClick={() => setActiveTab('Personal')}
            className={`flex items-center justify-center gap-2 flex-1 h-9 px-3 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
              activeTab === 'Personal'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span>Personal</span>
          </div>
        </div>

        {/* Content based on active tab */}
        <div
          className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent `}
        >
          {activeTab === 'Platform' && (
            <div className="space-y-3">
              {notificationsList.map(notification => (
                <div
                  key={notification.id}
                  className="p-4 bg-[#1A222E] rounded-xl"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <span className="text-gray-400 text-sm font-normal">
                      {notification.date}
                    </span>
                    {notification.isNew && (
                      <span className="flex items-center justify-center h-5 px-2 bg-green-500 border border-white rounded-2xl text-white text-xs font-bold shrink-0">
                        New
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="mb-2">
                    <h3 className="text-white text-base font-bold leading-normal">
                      {notification.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm font-normal leading-relaxed whitespace-pre-line">
                      {notification.content}
                    </p>
                  </div>

                  {/* Mark as read button */}
                  <div
                    onClick={() => markAsRead(notification.id)}
                    className={`flex items-center gap-2 h-9 px-4 bg-gray-800 rounded-lg transition-opacity cursor-pointer ${
                      notification.isRead
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      pointerEvents: notification.isRead ? 'none' : 'auto',
                    }}
                  >
                    <span className="text-white text-sm font-bold">
                      Mark as read
                    </span>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Events' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#1A222E] rounded-xl">
                <h3 className="text-white text-base font-bold mb-2">
                  Upcoming Events
                </h3>
                <p className="text-gray-400 text-sm">
                  No upcoming events at the moment.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'Personal' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#1A222E] rounded-xl">
                <h3 className="text-white text-base font-bold mb-2">
                  Personal Notifications
                </h3>
                <p className="text-gray-400 text-sm">
                  No personal notifications available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Menu - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700 bg-[#111923] lg:rounded-b-[30px]">
        <div
          onClick={markAllAsRead}
          className="flex items-center gap-2 h-9 px-4 hover:opacity-80 transition-opacity w-full justify-center cursor-pointer"
        >
          <span className="text-gray-400 text-sm font-bold">
            Mark all as read
          </span>
          <CheckCircle className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default NotificationsPanel
