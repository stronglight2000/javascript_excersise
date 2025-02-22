const btn = document.getElementById('btn');
const image = document.getElementById('image');
const select = document.getElementById('breed-list');

// Vừa load trang phải gọi API để render danh sách breed
// API : https://dog.ceo/api/breeds/list/all

async function getBreedList() {
    try {
        // Gọi API để lấy danh sách giống loài
        let res = await axios.get("https://dog.ceo/api/breeds/list/all")

        // Sau khi có data thì hiển thị kết quả trên giao diện
        renderBreed(res.data.message)
    } catch (error) {
        console.error("Lỗi khi lấy danh sách breed:", error);
    }
}


function renderBreed(breeds) {
    // Duyệt qua object breeds -> tạo thẻ option -> gắn vào DOM

    // Cách 1: Sử dụng for ... in
    // Cách 2 : Lấy ra danh sách keys của objec (Object.keys) => Duyệt mảng
    let html = "";
    for (let breed in breeds) {
        html += `<option value="${breed}">${breed}</option>`;
    }
    select.innerHTML = html;
}

// Fetch ảnh theo giống loài được chọn
async function fetchDogImage() {
    let breed = select.value;
    try {
        let res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        image.src = res.data.message;
    } catch (error) {
        console.error("Lỗi khi lấy ảnh:", error);
    }
}
// Khi bấm nút Fetch, lấy ảnh chó theo giống đã chọn
btn.addEventListener("click", fetchDogImage);

getBreedList()