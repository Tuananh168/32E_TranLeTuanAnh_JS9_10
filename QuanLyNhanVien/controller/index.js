var mangNhanVien = [];
document.querySelector('#btnThemNV').onclick = function() {
    var nv = new NhanVien();


    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    // Xử lý ngày làm 

    var ngayLam = document.querySelector('#datepicker').value
    nv.ngayLam = moment(ngayLam).format('DD/MM/YYYY')

    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;
    // console.log(nv);
    // Check Validation .
    var valid = true;



    // Kiểm tra rỗng 
    valid &= kiemTraRong(nv.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nv.hoTen, '#tbTen', 'Họ tên') & kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nv.luongCoBan, '#tbLuongCB', 'Lương Cơ Bản') & kiemTraRong(nv.gioLam, '#tbGiolam', 'Giờ làm') & kiemTraRong(nv.ngayLam, '#tbNgay', 'Ngày làm') & kiemTraRong(nv.chucVu, '#tbChucVu', 'Chức vụ')


    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }

    // Kiểm tra ký tự số
    valid &= kiemTraTatCaSo(nv.taiKhoan, '#tbTKNV', 'Tài khoản')

    // Kiểm tra ký tự
    valid &= kiemTraTatCaKyTu(nv.hoTen, '#tbTen', 'Họ tên')

    // Kiểm tra Email
    valid &= kiemTraEmail(nv.email, '#tbEmail', 'Email')

    // Kiểm tra tiền lương 
    valid &= kiemTraLuongCoBan(nv.luongCoBan, '#tbLuongCB', 'Lương cơ bản', 1000000, 20000000)

    // kiểm tra ký tự mật khẩu.
    valid &= kiemTraKyTu(nv.matKhau, '#tbMatKhau', 'Mật khẩu');
    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }
    //  Kiểm tra mật khẩu 
    valid &= kiemTraDoDai(nv.matKhau, '#tbMatKhau', 'Mật khẩu', 6, 10);

    // Kiểm tra giờ làm
    valid &= kiemTraGioLam(nv.gioLam, '#tbGiolam', 'Giờ làm', 80, 200);

    // Kiểm tra ngày
    valid &= kiemTraNgay(nv.ngayLam, '#tbNgay', 'Ngày làm')


    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }

    // Mỗi lần bấm thêm nhân viên thêm oblect vào mang nhân viên
    mangNhanVien.push(nv);


    renderTableNhanVien(mangNhanVien)

    luuLocalStorage();
}

function renderTableNhanVien(mangNhanVien) {
    var html = '';
    for (index = 0; index < mangNhanVien.length; index++) {
        // Mỗi lần duyệt lấy ra 1 nhân viên
        var nv = mangNhanVien[index];
        // Bổ sung phương thức loại nhân viên
        nv.loaiNhanVien = function() {
                var xepLoai = '';
                if (this.gioLam >= 160 && this.gioLam < 176) {
                    xepLoai = 'Khá';
                } else if (this.gioLam >= 176 && this.gioLam < 192) {
                    xepLoai = 'Giỏi'
                } else if (this.gioLam >= 192) {
                    xepLoai = 'Xuất sắc'
                } else {
                    xepLoai = 'Trung Bình';
                }
                return xepLoai;
            }
            // Bổ sung phương thức tổng lương :
        nv.tongLuong = function() {
            if (this.chucVu === "Sếp") {
                tongLuong = this.luongCoBan * 3;
            } else if (this.chucVu === "Trưởng phòng") {
                tongLuong = this.luongCoBan * 2;
            } else {
                tongLuong = this.luongCoBan;
            }
            return tongLuong;
        }

        // Tạo 1 chuỗi html tr đưa vào output;
        html += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.loaiNhanVien()}</td>
        <td>${nv.tongLuong()}</td>
        <td class="btn btn-primary" onclick="chinhSua('${nv.taiKhoan}')">Edit</td>
        <td class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Delete</td>
        </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}

// Xóa nhân viên .
function xoaNhanVien(taiKhoanNhanVienClick) {
    var indexDel = mangNhanVien.findIndex(NhanVien => NhanVien.taiKhoan === taiKhoanNhanVienClick);
    if (indexDel != -1) {
        mangNhanVien.splice(indexDel, 1);
    }
    renderTableNhanVien(mangNhanVien)
}

// Chỉnh sửa.

function chinhSua(taiKhoanNhanVienClick) {
    // Tìm ra vị trí của nhân viên bị click trong mảng 
    var indexEdit = mangNhanVien.findIndex(nv => nv.taiKhoan === taiKhoanNhanVienClick);
    // Lấy ra thông tin nhân viên tại vị trí đó .
    var nvEdit = mangNhanVien[indexEdit];
    // Khóa lại mã nhân viên .
    document.querySelector('#tknv').disabled = true;
    // Gán các giá trị lên giao diện.
    document.querySelector('#tknv').value = nvEdit.taiKhoan;
    document.querySelector('#name').value = nvEdit.hoTen;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#luongCB').value = nvEdit.luongCoBan;
    document.querySelector('#chucvu').value = nvEdit.chucVu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;


}

// tạo sự kiện cho thẻ cập nhật 
document.querySelector('#btnCapNhat').onclick = function() {
    var nv = new NhanVien();

    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    // Xử lý ngày làm 

    var ngayLam = document.querySelector('#datepicker').value
    nv.ngayLam = moment(ngayLam).format('DD-MM-YYYY')

    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    // Tìm ra thằng trong mảng cần chỉnh sửa .
    var indexEdit = mangNhanVien.findIndex(NhanVien => NhanVien.taiKhoan === nv.taiKhoan);

    //    Lấy thông tin nhân viên trên mảng thay đổi thành trên giao diện sau khi đã edit
    mangNhanVien[indexEdit].hoTen = nv.hoTen;
    mangNhanVien[indexEdit].email = nv.email;
    mangNhanVien[indexEdit].matKhau = nv.matKhau;
    mangNhanVien[indexEdit].ngayLam = nv.ngayLam;
    mangNhanVien[indexEdit].luongCoBan = nv.luongCoBan;
    mangNhanVien[indexEdit].chucVu = nv.chucVu;
    mangNhanVien[indexEdit].gioLam = nv.gioLam;


    var valid = true;



    // Kiểm tra rỗng 
    valid &= kiemTraRong(nv.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nv.hoTen, '#tbTen', 'Họ tên') & kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nv.luongCoBan, '#tbLuongCB', 'Lương Cơ Bản') & kiemTraRong(nv.gioLam, '#tbGiolam', 'Giờ làm') & kiemTraRong(nv.ngayLam, '#tbNgay', 'Ngày làm') & kiemTraRong(nv.chucVu, '#tbChucVu', 'Chức vụ')


    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }

    // Kiểm tra ký tự số
    valid &= kiemTraTatCaSo(nv.taiKhoan, '#tbTKNV', 'Tài khoản')

    // Kiểm tra ký tự
    valid &= kiemTraTatCaKyTu(nv.hoTen, '#tbTen', 'Họ tên')

    // Kiểm tra Email
    valid &= kiemTraEmail(nv.email, '#tbEmail', 'Email')

    // Kiểm tra tiền lương 
    valid &= kiemTraLuongCoBan(nv.luongCoBan, '#tbLuongCB', 'Lương cơ bản', 1000000, 20000000)

    // kiểm tra ký tự mật khẩu.
    valid &= kiemTraKyTu(nv.matKhau, '#tbMatKhau', 'Mật khẩu');
    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }
    //  Kiểm tra mật khẩu 
    valid &= kiemTraDoDai(nv.matKhau, '#tbMatKhau', 'Mật khẩu', 6, 10)

    // Kiểm tra giờ làm
    valid &= kiemTraGioLam(nv.gioLam, '#tbGiolam', 'Giờ làm', 80, 200)

    // Kiểm tra ngày
    valid &= kiemTraNgay(nv.ngayLam, '#tbNgay', 'Ngày làm')


    if (!valid) { //khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }


    // Tạo lại table
    renderTableNhanVien(mangNhanVien);
    // Mở lại nút tài khoản nhân viên
    document.querySelector('#tknv').disabled = false;
    luuLocalStorage();
}


//Tìm nhân viên theo từng loại (Xuất sắc , giỏi ,khá) và hiển thị.

document.querySelector('#btnTimNV').onclick = function() {
    var xepLoaiNhanVien = document.querySelector('#searchName').value;
    indexSearch = -1;
    var html = '';
    for (index = 0; index < mangNhanVien.length; index++) {
        if (xepLoaiNhanVien === mangNhanVien[index].loaiNhanVien()) {
            indexSearch = index;
            nv = mangNhanVien[indexSearch];
            html += `
            <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.loaiNhanVien()}</td>
            <td>${nv.tongLuong()}</td>
            <td class="btn btn-primary" onclick="chinhSua('${nv.taiKhoan}')">Edit</td>
            <td class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Delete</td>
            </tr>
            `
        }

    }
    document.querySelector('#tableDanhSach').innerHTML = html;

}



function luuLocalStorage() {
    //Biến đổi mảng thành => string
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    //Sau đó dùng string lưu vào localstorage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}


function layLocalStorage() {
    //check xem storage có dữ đó hay không
    if (localStorage.getItem('mangNhanVien')) {
        //Lấy ra
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //Lấy mangNhanVien gán = chuỗi được lấy từ localstorage ra (phải dùng hàm JSON.parse để chuyển về mảng lại)
        mangNhanVien = JSON.parse(sMangNhanVien);
        //tạo ra table nhan viên từ mảng
        renderTableNhanVien(mangNhanVien);
    }
}

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function() {
    //Browser vừa load lên làm gì thì sẽ code ở đây
    layLocalStorage();
}