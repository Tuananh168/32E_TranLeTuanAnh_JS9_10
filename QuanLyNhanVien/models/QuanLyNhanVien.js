// Tạo ra kiểu dữ liệu nhân viên.

function NhanVien() {
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.loaiNhanVien = function() {
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
    this.tongLuong = function() {
        if (this.chucVu === "Sếp") {
            tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            tongLuong = this.luongCoBan * 2;
        } else {
            tongLuong = this.luongCoBan;
        }
        return tongLuong;
    }
}