import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, Bell, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { deleteNotification, getAllNotifications, markAllAsRead } from '@/store/admin/notification-slice';
// move your item into a separate component if needed
const NotificationItem = ({ 
  title, 
  description, 
  status, 
  time,
  onClose,
  isVisible = true
}) => {
  if (!isVisible) return null;
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  const getStatusStyles = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500'
      case 'error':
        return 'bg-red-50 border-l-4 border-red-500'
      case 'warning':
        return 'bg-amber-50 border-l-4 border-amber-500'
      case 'info':
      default:
        return 'bg-blue-50 border-l-4 border-blue-500'
    }
  }
  
  return (
    <div className={`mb-4 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${getStatusStyles(status)}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            {getStatusIcon(status)}
          </div>
          <div className="ml-3 w-0 flex-1">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <span className="text-xs text-gray-500">{time}</span>
            </div>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            {onClose && (
              <button
                className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notification);

  // Fetch notifications on mount
  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleDismiss = (id) => {
    dispatch(deleteNotification(id));
  };

  const markAllAsReadfunc = () => {
  dispatch(markAllAsRead());
};


  const clearAll = () => {
    notifications.forEach((notification) => {
      dispatch(deleteNotification(notification._id));
    });
  };

  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-white" />
              <h1 className="text-xl font-bold text-white ml-2">Notifications</h1>
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={markAllAsReadfunc}
                className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded transition-colors"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-6 bg-gray-50 min-h-[300px]">
          {loading ? (
            <p className="text-gray-500 text-center">Loading notifications...</p>
          ) : notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  title={notification.title}
                  description={notification.description}
                  status={notification.status === 'unread' ? 'info' : 'success'}
                  time={new Date(notification.date).toLocaleString()}
                  onClose={() => handleDismiss(notification._id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
              <Bell className="h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
