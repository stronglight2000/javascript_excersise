// Yêu cầu
// Highlight tất cả các từ có độ dài lớn hơn hoặc bằng 5 ký tự trong đoạn văn(background = “yellow”)
const p = document.querySelector("p");
let text = p.innerText;
let string = text.split(' ');


let highlightedText = string.map(word => {
    if (word.length >= 5) {
        let span = document.createElement("span");
        span.innerText = word; // Gán nội dung chữ
        span.style.backgroundColor = "yellow"; // Đặt màu nền
        return span.outerHTML; // Trả về thẻ <span>
    }
    return word; // Giữ nguyên các từ nhỏ hơn 5 ký tự
}).join(" ");





console.log(string);
// Thêm link hiển thị text“ facebook” link đến trang facebook.com ở sau thẻ p
const a = document.createElement("a");
a.href = "https://facebook.com";
a.innerHTML = "Facebook";
p.insertAdjacentElement('afterend', a);
// C2: document.body.appendChild(a);
// Đếm số từ có trong đoạn văn.Tạo 1 thẻ div để hiển thị số từ
const div = document.createElement("div");
count = 0;
for (let index = 0; index < string.length; index++) {
    count = index + 1;

}
div.innerText = count;
// Thay thế ký hiệu(, -dấu phẩy) => 🤔và(. - dấu chấm) => 😲