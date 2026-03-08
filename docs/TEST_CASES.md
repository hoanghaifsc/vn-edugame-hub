# TEST CASES - VIETNAM EDUGAME HUB MVP
**Phiên bản:** 1.0 | **Ngày tạo:** 2026-03-08
**Dựa trên:** User Stories US01 - US05

---

## TC-US01: Học sinh chọn và chơi game

### TC-US01-01: Hiển thị danh sách game khi online
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US01-01 |
| **Ưu tiên** | P0 - Critical |
| **Loại test** | Functional / E2E |
| **Precondition** | Học sinh đã đăng nhập, có kết nối mạng |
| **Steps** | 1. Mở trang chủ `/`  2. Quan sát màn hình |
| **Expected Result** | Danh sách game hiển thị trong vòng 3 giây. Mỗi thẻ game có: ảnh thumbnail, tên game, môn học, nút "Chơi ngay". |
| **AC liên quan** | US01-AC1 |

### TC-US01-02: Lọc game theo môn học
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US01-02 |
| **Ưu tiên** | P0 - Critical |
| **Loại test** | Functional / Unit |
| **Precondition** | Trang danh sách game đang hiển thị |
| **Steps** | 1. Click filter "Toán"  2. Quan sát danh sách game |
| **Expected Result** | Chỉ hiển thị các game có `subject = "math"`. Các game môn khác biến mất. |
| **AC liên quan** | US01-AC1 |

### TC-US01-03: Lọc "Tất cả" hiển thị mọi game
| Test ID | TC-US01-03 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | 1. Chọn filter "Toán" → 2. Chọn filter "Tất cả" |
| **Expected** | Tất cả game hiển thị lại |

### TC-US01-04: Click game và load đúng nội dung
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US01-04 |
| **Ưu tiên** | P0 - Critical |
| **Steps** | 1. Click vào game "Ô Ăn Quan - Toán Cơ Bản"  2. Quan sát màn hình game |
| **Expected Result** | - Navigate đến `/game/{gameId}`. - Canvas Phaser.js load đúng game đã chọn. - Bàn cờ Ô Ăn Quan hiển thị đầy đủ 12 ô. - Câu hỏi Toán xuất hiện ngay. |
| **AC liên quan** | US01-AC2 |

### TC-US01-05: Không có game nào khớp filter
| Test ID | TC-US01-05 | Ưu tiên | P2 |
|---|---|---|---|
| **Steps** | Chọn filter môn không có game |
| **Expected** | Hiển thị thông báo "Không có game nào cho môn này." |

---

## TC-US02: Chơi game khi offline

### TC-US02-01: Game tiếp tục khi rớt mạng đột ngột
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US02-01 |
| **Ưu tiên** | P0 - CRITICAL (Core Feature) |
| **Loại test** | Functional / E2E |
| **Precondition** | Học sinh đang chơi game, đang online |
| **Steps** | 1. Đang chơi game → 2. Tắt WiFi / mô phỏng offline (DevTools → Network: Offline) → 3. Tiếp tục chơi thêm 2 phút |
| **Expected Result** | - Game KHÔNG bị crash hoặc hiển thị lỗi. - Banner "Bạn đang offline" xuất hiện. - Câu hỏi Toán vẫn tiếp tục hoạt động. - Quân cờ vẫn di chuyển được. |
| **AC liên quan** | US02-AC1 |

### TC-US02-02: Tiến trình được lưu local khi offline
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US02-02 |
| **Ưu tiên** | P0 - CRITICAL |
| **Steps** | 1. Offline → 2. Hoàn thành 1 game → 3. Kiểm tra IndexedDB |
| **Expected Result** | IndexedDB store `pendingSessions` có 1 record mới với `syncStatus = "local"`, `offlineCreated = true`. Điểm số và kết quả được lưu chính xác. |
| **AC liên quan** | US02-AC1 |

### TC-US02-03: Tự động sync khi có mạng lại - không gián đoạn UX
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US02-03 |
| **Ưu tiên** | P0 - CRITICAL |
| **Steps** | 1. Offline → Chơi 2 game → 2. Bật lại mạng (DevTools: Online) → 3. Quan sát UX trong 5 giây |
| **Expected Result** | - Banner "Đang đồng bộ dữ liệu..." xuất hiện ngắn gọn. - Học sinh KHÔNG bị navigate khỏi màn hình hiện tại. - Game KHÔNG bị reload. - Sau đồng bộ: sessions trong IndexedDB có `syncStatus = "synced"`. - Firestore/server nhận đủ 2 sessions. |
| **AC liên quan** | US02-AC2 |

### TC-US02-04: Load game khi offline (cache assets)
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US02-04 |
| **Ưu tiên** | P1 |
| **Precondition** | Học sinh đã vào game ít nhất 1 lần khi online (assets đã cache) |
| **Steps** | 1. Offline → 2. Refresh trang → 3. Vào game |
| **Expected Result** | Game assets load từ Service Worker cache. Phaser.js khởi động thành công. |

### TC-US02-05: Danh sách game hiển thị từ cache khi offline
| Test ID | TC-US02-05 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Offline → Mở trang chủ |
| **Expected** | Danh sách game hiển thị từ IndexedDB cache. Banner "Đang offline" hiện. |

### TC-US02-06: Xử lý sync failure
| Test ID | TC-US02-06 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Offline → Chơi game → Online → Server trả lỗi 500 khi sync |
| **Expected** | Sessions vẫn ở `syncStatus = "local"`. Không mất data. Sẽ retry lần sau. |

---

## TC-US03: Giáo viên giao bài tập

### TC-US03-01: Tạo bài tập mới thành công
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US03-01 |
| **Ưu tiên** | P0 - Critical |
| **Loại test** | Functional / Integration |
| **Precondition** | Người dùng đã đăng nhập với role = "teacher" |
| **Steps** | 1. Vào Teacher Dashboard → Tab "Giao bài" → 2. Nhập tiêu đề: "Bài tập Toán tuần 10" → 3. Chọn game: "Ô Ăn Quan - Toán Cơ Bản" → 4. Nhập mã lớp: "3A" → 5. Chọn hạn nộp → 6. Click "Giao bài" |
| **Expected Result** | - Hiển thị thông báo "Giao bài thành công!". - Assignment xuất hiện trong bảng "Bài tập đã giao". - API `POST /api/assignments` trả về 201. - Firestore: document mới trong `assignments` collection. - Firestore: mỗi học sinh lớp 3A có status record `status: "pending"`. |
| **AC liên quan** | US03-AC1 |

### TC-US03-02: Validation form giao bài
| Test ID | TC-US03-02 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Submit form trống / thiếu field |
| **Expected** | Form validation ngăn submit. Highlight field lỗi. |

### TC-US03-03: Trạng thái bài tập sau khi giao
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US03-03 |
| **Ưu tiên** | P0 - Critical |
| **Steps** | 1. Giao bài thành công → 2. Click "Xem báo cáo" của bài đó |
| **Expected Result** | Tất cả học sinh trong lớp hiển thị trạng thái "Chưa làm". |
| **AC liên quan** | US03-AC2 |

### TC-US03-04: Trạng thái cập nhật khi học sinh hoàn thành
| Test ID | TC-US03-04 | Ưu tiên | P0 |
|---|---|---|---|
| **Steps** | Học sinh hoàn thành game → Giáo viên xem lại báo cáo |
| **Expected** | Trạng thái học sinh đó chuyển từ "Chưa làm" → "Hoàn thành" |

### TC-US03-05: Role enforcement - Học sinh không giao được bài
| Test ID | TC-US03-05 | Ưu tiên | P0 - Security |
|---|---|---|---|
| **Steps** | Gọi `POST /api/assignments` với token của học sinh |
| **Expected** | API trả về `403 Forbidden` |

---

## TC-US04: Giáo viên xem báo cáo

### TC-US04-01: Xem bảng thống kê kết quả bài tập
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US04-01 |
| **Ưu tiên** | P0 - Critical |
| **Precondition** | Có ít nhất 1 học sinh đã hoàn thành bài tập |
| **Steps** | 1. Teacher Dashboard → Tab "Báo cáo" → 2. Click "Xem báo cáo" cho một bài tập |
| **Expected Result** | Bảng hiển thị với các cột: Học sinh, Trạng thái, Điểm, Câu đúng, Câu sai, Thời gian (giây). Dữ liệu khớp với kết quả thực tế học sinh đã chơi. |
| **AC liên quan** | US04-AC1 |

### TC-US04-02: Dữ liệu điểm và câu hỏi chính xác
| Test ID | TC-US04-02 | Ưu tiên | P0 |
|---|---|---|---|
| **Steps** | Học sinh chơi game: 8 câu đúng, 2 câu sai, điểm 80 → Giáo viên xem báo cáo |
| **Expected** | Báo cáo hiển thị: Câu đúng=8, Câu sai=2, Điểm=80 |

### TC-US04-03: Học sinh chưa làm hiển thị dấu trống
| Test ID | TC-US04-03 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Xem báo cáo cho học sinh chưa hoàn thành |
| **Expected** | Điểm, Câu đúng/sai, Thời gian hiển thị "-" |

### TC-US04-04: Xuất báo cáo (future scope - ghi nhận)
| Test ID | TC-US04-04 | Ưu tiên | P3 - Future |
|---|---|---|---|
| **Note** | Tính năng xuất Excel/PDF sẽ bổ sung sau MVP |

---

## TC-US05: Phụ huynh theo dõi tiến độ

### TC-US05-01: Hiển thị dashboard tổng quan
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US05-01 |
| **Ưu tiên** | P0 - Critical |
| **Precondition** | Tài khoản phụ huynh đã liên kết với học sinh (`linkedStudentUid` được set) |
| **Steps** | 1. Đăng nhập với tài khoản role="parent" → 2. Vào Parent Dashboard |
| **Expected Result** | 4 thẻ tổng quan hiển thị: (1) Thời gian online tuần này (giờ:phút), (2) Số game đã chơi tuần này, (3) Điểm trung bình, (4) Tỷ lệ bài tập hoàn thành. |
| **AC liên quan** | US05-AC1 |

### TC-US05-02: Tiến độ môn học hàng tuần
| Thuộc tính | Giá trị |
|---|---|
| **Test ID** | TC-US05-02 |
| **Ưu tiên** | P0 - Critical |
| **Steps** | Xem bảng tiến độ môn học |
| **Expected Result** | Bảng hiển thị từng môn học với: Số lần chơi, Tổng thời gian, Điểm TB, Xu hướng (↑/↓/→). |
| **AC liên quan** | US05-AC1 |

### TC-US05-03: Xu hướng so sánh tuần này vs tuần trước
| Test ID | TC-US05-03 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Học sinh tăng điểm TB môn Toán từ 60 → 80 so với tuần trước |
| **Expected** | Xu hướng hiển thị "↑ Tốt hơn" màu xanh |

### TC-US05-04: Role enforcement - Học sinh không truy cập được
| Test ID | TC-US05-04 | Ưu tiên | P0 - Security |
|---|---|---|---|
| **Steps** | Gọi `GET /api/progress/overview` với token học sinh |
| **Expected** | API trả về `403 Forbidden` |

### TC-US05-05: Phụ huynh không có học sinh liên kết
| Test ID | TC-US05-05 | Ưu tiên | P1 |
|---|---|---|---|
| **Steps** | Đăng nhập phụ huynh chưa có `linkedStudentUid` |
| **Expected** | Hiển thị thông báo hướng dẫn liên kết tài khoản con |

---

## CHECKLIST OFFLINE/ONLINE SYNC

### Pre-conditions
- [ ] PWA đã được install (hoặc chạy trong browser hỗ trợ Service Worker)
- [ ] Học sinh đã đăng nhập thành công
- [ ] Đã vào game ít nhất 1 lần khi online (cache assets)

### Kiểm tra Offline Readiness
- [ ] Rớt mạng giữa game → game không crash
- [ ] Banner offline xuất hiện trong < 2 giây
- [ ] Câu hỏi Toán vẫn hiển thị và chấp nhận đáp án
- [ ] Quân cờ vẫn di chuyển được
- [ ] Kết quả game lưu vào IndexedDB (`pendingSessions` store)
- [ ] `syncStatus = "local"`, `offlineCreated = true` trong record

### Kiểm tra Online Sync (sau khi bật mạng lại)
- [ ] Sync bắt đầu tự động trong < 3 giây khi có mạng
- [ ] Banner "Đang đồng bộ" xuất hiện
- [ ] UX không bị gián đoạn (không reload, không navigate)
- [ ] Tất cả sessions local được gửi lên server
- [ ] Server xác nhận nhận sessions (HTTP 200)
- [ ] `syncStatus` cập nhật thành `"synced"` trong IndexedDB
- [ ] Assignment status cập nhật nếu có
- [ ] Không có data loss

### Edge Cases
- [ ] Sync giữa chừng bị mất mạng lại → sessions chưa sync vẫn còn trong IndexedDB
- [ ] Duplicate sync attempt → server idempotent (không tạo duplicate session)
- [ ] Token hết hạn khi sync → refresh token và retry

### Performance (NFR)
- [ ] First load game < 3 giây trên mạng 3G (Lighthouse: simulate 3G)
- [ ] Offline gameplay không có UI lag > 100ms
- [ ] Service Worker cache hit rate > 90% cho game assets

---

## NFR TEST PLAN

### Performance Test
| Test | Tool | Target |
|---|---|---|
| First Contentful Paint | Lighthouse | < 2000ms |
| Time to Interactive | Lighthouse | < 3000ms (3G) |
| Game asset load | Chrome DevTools (throttle 3G) | < 3s |

### Responsive Test
| Breakpoint | Device | Pass Criteria |
|---|---|---|
| 375px | iPhone SE | Layout không vỡ, nút touch được |
| 768px | iPad | Layout 2 cột |
| 1280px | Desktop | Full layout |

### Security Test
| Scenario | Expected |
|---|---|
| Student gọi teacher API | 403 |
| Parent gọi teacher API | 403 |
| Invalid token | 401 |
| Teacher xem data lớp khác | 403 |
