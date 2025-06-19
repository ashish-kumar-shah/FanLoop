// utils/notificationStorage.js

const NOTIFICATION_KEY = "notification";

/**
 * Get all notifications from localStorage
 * @returns {Array} Array of notifications or empty array
 */
export const getNotifications = () => {
  try {
    const data = localStorage.getItem(NOTIFICATION_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return [];
  }
};

/**
 * Save a new notification (append)
 * @param {Object} notification - New notification object
 */
export const saveNotification = (notification) => {
  try {
    const current = getNotifications();
    const updated = [notification, ...current];
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save notification:", error);
  }
};

/**
 * Overwrite all notifications
 * @param {Array} notifications - Array of notification objects
 */
export const setNotifications = (notifications) => {
  try {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error("Failed to set notifications:", error);
  }
};

/**
 * Remove all notifications
 */
export const clearNotifications = () => {
  try {
    localStorage.removeItem(NOTIFICATION_KEY);
  } catch (error) {
    console.error("Failed to clear notifications:", error);
  }
};

/**
 * Remove a specific notification by index
 * @param {number} index - Index of the notification to remove
 */
export const removeNotification = (index) => {
  try {
    const current = getNotifications();
    current.splice(index, 1);
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(current));
  } catch (error) {
    console.error("Failed to remove notification:", error);
  }
};
