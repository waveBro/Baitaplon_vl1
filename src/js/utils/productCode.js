class TrinhTaoMaSanPham {
    static nguon = {
        'HaNoi': 'HN',
        'HoChiMinh': 'HCM', 
        'DaNang': 'DN',
        'NhapKhau': 'NK',
        'XuatKhau': 'XK'
    };

    static loai = {
        'Giay': 'GY',
        'QuanAo': 'QA', 
        'DienTu': 'DT',
        'PhuKien': 'PK',
        'ThucPham': 'TP',
        'MyPham': 'MP'
    };

    static taoMa(nguon, loai, soLo, soSanPham) {
        const maNguon = this.nguon[nguon] || 'XXX';
        const maLoai = this.loai[loai] || 'XX';
        const maLo = soLo.toString().padStart(3, '0');
        const maSanPham = soSanPham.toString().padStart(4, '0');

        return `${maNguon}-${maLoai}-${maLo}-${maSanPham}`;
    }

    static phanTichMa(ma) {
        const [maNguon, maLoai, maLo, maSanPham] = ma.split('-');
        return {
            nguon: Object.keys(this.nguon).find(key => this.nguon[key] === maNguon) || 'KhongXacDinh',
            loai: Object.keys(this.loai).find(key => this.loai[key] === maLoai) || 'KhongXacDinh',
            soLo: parseInt(maLo),
            soSanPham: parseInt(maSanPham)
        };
    }
}
