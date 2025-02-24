// Tạo mảng todo ( mockup data)
const API_URL = "http://localhost:8000/todos";
let todos = [];

// Lấy danh sách todo từ server
const getAllTodos = async() => {
    try {
        let res = await axios.get(API_URL); // GỌi API
        todos = res.data; // Gán dữ liệu từ server vào mảng todos
        renderTodos(todos); // Hiển thị danh sách todos ra ngoài màn hình

    } catch (error) {
        console.log(error);
    }
};

// Hiển thị danh sách todo ra ngoài giao diện
const ul = document.querySelector("ul"); // truy cập vào thẻ ul để về sau có thể thay đổi nội dung cho phần tử
const renderTodos = (todos) => {
        if (todos.length == 0) {
            ul.innerHTML = "<li> Không tìm thấy công việc nào </li>";
            return; // kết thúc
        }

        let html = "";
        todos.forEach((todo) => { // onchange: thay đổi giá trị của ô input
            // C1
            html += `<li>
            <input type="checkbox" ${todo.status ? "checked":""} onchange = "toggleStatus(${todo.id})" /> 
            <span class = "${todo.status ? "active":""}">${todo.name}</span>
            <button onclick = editTodo(${todo.id})>Edit</button>
            <button onclick = deleteTodo(${todo.id})>Delete</button>
        </li>`; // Hỏi lại chat gpt tại sao phải dùng dấu ``

            // C2
            /*
            if (!todo.status) { //Nếu là false thì cộng với đoạn thường
                html += `<li>
                <input type="checkbox" />
                <span>${todo.name}</span>
                <button>Edit</button>
                <button>Delete</button>
            </li>`;
            } else { // Nếu là true thì thêm checked với class activee
                html += `
        
            <li>
                <input type="checkbox" checked />
                <span class="active">${todo.name}</span>
                <button>Edit</button>
                <button>Delete</button>
            </li>`;
            }*/
        });
        console.log(html);
        ul.innerHTML = html; // Bởi vì bên trong thẻ li lại có các thẻ con, bên trong thẻ con lại có nội đung, làm vậy để hiển thị được.
    }
    // Hàm xóa
const deleteTodo = async(id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (!isConfirm) return; // nếu không đồng ý thì kết thúc
    //C1 Lọc ra những thằng khác id.
    // todos = todos.filter(todo => todo.id !== id); // trả về mảng mới
    // C2: Tìm chỉ sổ
    try {
        // Xóa ở server ( ở file db.json)
        await axios.delete(`${API_URl}/${id}`);

        // Xóa ở client
        const index = todos.findIndex(todo => todo.id === id);
        todos.splice(index, 1);

        renderTodos(todos);
    } catch (error) {
        console.log(error);
    }

};
const toggleStatus = async(id) => {
    try {
        // Update status ở server
        const todo = todos.find((todo) => todo.id === id);
        const request = {
            name: todo.name,
            status: !todo.status
        }
        await axious.put(`${API_URL}/${id}`, request);
        // Update status ở client
        // C2
        todos.status = !todos.status;
        renderTodos(todos);
    } catch (error) {
        console.log(error);
    }
    //C1
    /*
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].status = !todos[index].status; */

};
//Edit button
const editTodo = async(id) => {
    let newTitle = window.prompt("Nhập tiêu đề công việc:");
    if (newTitle === null || newTitle.trim() === "") return; // Kiểm tra nếu người dùng không nhập gì
    try {
        const todo = todos.find((todo) => todo.id === id);
        const updatedTodo = {...todo, name: newTitle };

        await axios.put(`${API_URL}/${id}`, updatedTodo);

        // Cập nhật trên client
        todo.name = newTitle;
        renderTodos(todos);
    } catch (error) {
        console.log(error);
    }

}


// Add Button

// Hàm tạo ID ngẫu nhiên
const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
};


const addBtn = document.getElementById("#btn-add");
const addTodo = async() => {
    const inputTodo = document.getElementById("input-todo");
    const todoName = inputTodo.value.trim();

    if (todoName === "") {
        alert("Vui lòng nhập công việc");
        return;
    }

    const newTodo = {
        // id: generateId(), // Tạo ID ngẫu nhiên
        name: todoName,
        status: false
    };
    try {
        const res = await axios.post(API_URL, newTodo);
        todos.push(res.data); // Lấy dữ liệu từ server
        renderTodos(todos); // Cập nhật giao diện
        inputTodo.value = ""; // Xóa nội dung input
    } catch (error) {
        console.log(error);
    }


}

// Lắng nghe sự kiện khi click vào nút Add
document.getElementById("btn-add").addEventListener("click", addTodo);
// Lắng nghe sự kiện khi nhấn phím Enter trong input
document.getElementById("input-todo").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
getAllTodos();