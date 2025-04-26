// Hàm lấy danh sách điểm đến từ API
async function fetchDestinations() {
    try {
        // Thay thế bằng URL API thực tế của bạn
        const response = await fetch('https://your-api-url.com/api/destinations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Thêm khóa API hoặc token nếu cần
                // 'Authorization': 'Bearer your-token-here'
            }
        });

        if (!response.ok) {
            throw new Error('Không thể lấy danh sách điểm đến');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách điểm đến:', error);
        return null;
    }
}

// Hàm cập nhật DOM với dữ liệu đã lấy
function updateFeatures(destinations) {
    const featuresContainer = document.getElementById('features');
    featuresContainer.innerHTML = ''; // Xóa nội dung hiện có

    if (!destinations || destinations.length === 0) {
        featuresContainer.innerHTML = '<p>Không có điểm đến nào.</p>';
        return;
    }

    // Ví dụ: Hiển thị 3 điểm đến đầu tiên trong các hộp tính năng
    const titles = ['Lựa Chọn Hàng Đầu', 'Hướng Dẫn Chất Lượng', 'Đặt Vé Dễ Dàng'];
    destinations.slice(0, 3).forEach((destination, index) => {
        const featureBox = document.createElement('div');
        featureBox.className = 'feature-box';
        featureBox.innerHTML = `
            <h3>${titles[index]}</h3>
            <p>${destination.name || 'Điểm đến'} - ${destination.description || 'Khám phá địa điểm tuyệt vời này!'}</p>
        `;
        featuresContainer.appendChild(featureBox);
    });
}

// Hàm khởi tạo trang
async function init() {
    const destinations = await fetchDestinations();
    if (destinations) {
        updateFeatures(destinations);
    }
}

// Chạy khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', init);