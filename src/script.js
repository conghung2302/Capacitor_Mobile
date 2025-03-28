import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';

document.addEventListener('DOMContentLoaded', () => {
    const showTimeBtn = document.getElementById('showTimeBtn');
    const timeDisplay = document.getElementById('timeDisplay');

    showTimeBtn.addEventListener('click', async () => {
        // Lấy thời gian hiện tại
        const now = new Date();
        const timeString = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Hiển thị thời gian trên giao diện
        timeDisplay.textContent = `Thời gian hiện tại: ${timeString}`;

        // Gửi thông báo cục bộ
        await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Thời gian hiện tại',
                    body: timeString,
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000) },
                },
            ],
        });

        // Chia sẻ thời gian
        await Share.share({
            title: 'Thời gian hiện tại',
            text: `Thời gian hiện tại của tôi là: ${timeString}`,
            dialogTitle: 'Chia sẻ thời gian',
        });
    });

});