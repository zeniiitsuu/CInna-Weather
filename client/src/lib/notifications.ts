export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  return permission === "granted";
}

export function sendNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "https://i.pinimg.com/originals/95/bd/8d/95bd8d946d66c6c7a2c78a0dcc2a500b.png"
    });
  }
}

export function scheduleWeatherNotification(
  weatherCheck: () => Promise<void>,
  times: { hour: number; minute: number }[]
) {
  const checkAndNotify = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (const time of times) {
      if (currentHour === time.hour && currentMinute === time.minute) {
        await weatherCheck();
      }
    }
  };

  // Check every minute
  setInterval(checkAndNotify, 60000);
  
  // Initial check
  checkAndNotify();
}
