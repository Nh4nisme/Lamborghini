package com.lamborghini.service;

import com.lamborghini.dto.request.UpdateProfileRequest;
import com.lamborghini.dto.response.TaiKhoanResponse;
import com.lamborghini.entity.TaiKhoan;
import com.lamborghini.enums.VaiTro;
import com.lamborghini.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaiKhoanService {

    private final TaiKhoanRepository taiKhoanRepository;

    public List<TaiKhoanResponse> getDanhSachTaiKhoan() {
        return taiKhoanRepository.findAll().stream()
                .map(this::chuyenThanhResponse)
                .toList();
    }

    public TaiKhoanResponse getTaiKhoanTheoMa(Integer maTaiKhoan) {
        TaiKhoan tk = taiKhoanRepository.findById(maTaiKhoan)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        return chuyenThanhResponse(tk);
    }

    public List<TaiKhoanResponse> getDanhSachUser() {
        return taiKhoanRepository.findAllByVaiTro(VaiTro.CUSTOMER).stream()
                .map(this::chuyenThanhResponse)
                .toList();
    }

    public TaiKhoanResponse getUserTheoMa(Integer maTaiKhoan) {
        TaiKhoan tk = taiKhoanRepository.findByMaTaiKhoanAndVaiTro(maTaiKhoan, VaiTro.CUSTOMER)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        return chuyenThanhResponse(tk);
    }

    public List<TaiKhoanResponse> getDanhSachDealer() {
        return taiKhoanRepository.findAllByVaiTro(VaiTro.DEALER).stream()
                .map(this::chuyenThanhResponse)
                .toList();
    }

    public TaiKhoanResponse getDealerTheoMa(Integer maTaiKhoan) {
        TaiKhoan tk = taiKhoanRepository.findByMaTaiKhoanAndVaiTro(maTaiKhoan, VaiTro.DEALER)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"));
        return chuyenThanhResponse(tk);
    }

    public TaiKhoanResponse updateUser(Integer maTaiKhoan, UpdateProfileRequest request) {
        TaiKhoan tk = taiKhoanRepository.findByMaTaiKhoanAndVaiTro(maTaiKhoan, VaiTro.CUSTOMER)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản USER"));
        
        if (request.hoTen() != null && !request.hoTen().isBlank()) {
            tk.setHoTen(request.hoTen().trim());
        }
        if (request.sdt() != null && !request.sdt().isBlank()) {
            tk.setSdt(request.sdt().trim());
        }
        
        taiKhoanRepository.save(tk);
        return chuyenThanhResponse(tk);
    }

    public TaiKhoanResponse updateDealer(Integer maTaiKhoan, UpdateProfileRequest request) {
        TaiKhoan tk = taiKhoanRepository.findByMaTaiKhoanAndVaiTro(maTaiKhoan, VaiTro.DEALER)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản DEALER"));
        
        if (request.hoTen() != null && !request.hoTen().isBlank()) {
            tk.setHoTen(request.hoTen().trim());
        }
        if (request.sdt() != null && !request.sdt().isBlank()) {
            tk.setSdt(request.sdt().trim());
        }
        
        taiKhoanRepository.save(tk);
        return chuyenThanhResponse(tk);
    }

    private TaiKhoanResponse chuyenThanhResponse(TaiKhoan tk) {
        return new TaiKhoanResponse(
                tk.getMaTaiKhoan(),
                tk.getHoTen(),
                tk.getEmail(),
                tk.getSdt(),
                tk.getVaiTro(),
                tk.getTrangThai(),
                tk.getNgayTao()
        );
    }
}
