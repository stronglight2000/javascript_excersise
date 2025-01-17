// Bài 1: Viết
// function truyền vào 1 số nguyên dường.Tính giai thừa của số đó

function giaiThua(n) {
    if (n == 0) return 1;
    return n * giaiThua(n - 1);
}
console.log(giaiThua(5));

// Ví dụ: calculateFactorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// Bài 2: Viết
// function truyền vào 1 chuỗi.In ra chuỗi đảo ngược của chuỗi đó
function reverseString(s) {
    let charArray = s.split('');
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        let temp = charArray[left]
        charArray[left] = charArray[right]
        charArray[right] = temp

        left++
        right--
    }
    // Ghép mảng thành chuỗi và trả về
    return charArray.join('');
}
console.log(reverseString('hello'));
// Ví dụ: reverseString(‘hello’) => olleh
// Bài 3: Viết

// function truyền vào mã quốc gia.Trả về message có ý nghĩa là“ Xin chào”, tương ứng với mã quốc gia được truyền vào

// Ví dụ: translate(‘VN’) => “Xin chào”
// translate(‘EN’) => “Hello”
// Gợi ý: Sử dụng
// switch -
// case .Học viên tự nghĩ ra 1 vài mã quốc gia và câu chào tương ứng với quốc gia đó
function sayHi(s) {
    switch (s) {
        case 'VN':
            return "Xin chao";
            break;
        case 'EN':
            return "hello";
            break;
        case 'Korea':
            return "an-nyeong-ha-se-yo";
            break;
        case 'Japan':
            return "konnichiwa"
            break;
    }
}
console.log(sayHi('Korea'));

// Bài 4:
//     Cho

// function truyền vào 1 chuỗi dài hơn 15 ký tự.Viết 1

// function cắt chuỗi, lấy ra 10 ký tự đầu tiên và thêm vào dấu“…” ở cuối chuỗi.

// Ví dụ: subString(“xinchaocacbandenvoiTechmaster”) => “xinchaocac…”
function subString(input) {
    if (input.length > 15) {
        return input.slice(0, 10) + "…";
    }
    return input; // Nếu chuỗi không dài hơn 15 ký tự, trả về chính chuỗi đó
}
console.log(subString('xinchaocacbannha'));