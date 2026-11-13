Để xây dựng hệ thống tự động phát hiện và phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA) cho chỉ số **Leadtime Unload-to-Stow (U2S)** trong Inbound Control Tower, bạn cần kết hợp hai yếu tố cốt lõi: **Hạ tầng Telemetry Logs đủ độ phân giải** và **Thuật toán mô phỏng phản thực (Counterfactual Modeling)** dựa trên tư duy của David Lewis.

  

Dưới đây là thiết kế chi tiết cho cả hai phần:

  

## 1. Mô hình Telemetry Logs để phát hiện nghẽn U2S (WMS / WCS Data Schema)

Để chạy được thuật toán phản thực, hệ thống cần ghi nhận dữ liệu theo chuỗi thời gian (time-series event logs) ở mức độ chi tiết đến từng container, pallet hoặc SKU, thay vì chỉ lưu các chỉ số tổng hợp cuối ngày.

  

Các trường dữ liệu (fields) bắt buộc phải có từ các hệ thống WMS (Warehouse Management System), WCS (Warehouse Control System) và LMS (Labor Management System):

  

|**Nhóm dữ liệu**|**Tên trường (Field Name)**|**Kiểu dữ liệu**|**Mô tả chi tiết**|
|---|---|---|---|
|**Định danh & Bối cảnh**|`container_id` / `pallet_id`|String|Mã định danh duy nhất của kiện hàng inbound.|
||`sku_category` / `size_tier`|String|Phân loại hàng (Standard, Oversize, Hazmat, Fragile).|
||`po_id`|String|Mã đơn hàng nhập (Purchase Order).|
|**Mốc thời gian (Timestamps)**|`dock_arrival_time`|Timestamp|Thời điểm xe container đến bãi đỗ (Dock).|
||`unload_start_time` / `end_time`|Timestamp|Bắt đầu và kết thúc quá trình dỡ hàng xuống sàn.|
||`decant_start_time` / `end_time`|Timestamp|Thời điểm mở thùng, quét mã, tách kiện tại bàn Decant.|
||`stow_start_time` / `end_time`|Timestamp|Thời điểm stower nhận task và hoàn tất cất hàng lên kệ.|
|**Biến số vận hành (State Variables)**|`assigned_dock_bay`|String|Cửa nhập hàng được phân bổ.|
||`bin_utilization_at_stow`|Float (%)|Tỷ lệ lấp đầy của khu vực kệ (Aisle/Zone) tại thời điểm cất hàng.|
||`stow_travel_distance_m`|Float (m)|Quãng đường stower phải di chuyển từ khu vực buffer đến vị trí kệ.|
||`wms_allocation_latency_ms`|Integer|Thời gian hệ thống WMS phản hồi để cấp phát vị trí ô kệ (Bin Assignment).|
|**Yếu tố nguồn lực (Labor & Equipment)**|`active_unloaders_count`|Integer|Số lượng nhân sự dỡ hàng thực tế tại khu vực đó trong ca.|
||`active_stowers_count`|Integer|Số lượng nhân sự stow thực tế trong ca.|

## 2. Thiết kế Thuật toán RCA Tự động (Counterfactual Impact Score)

Thuật toán này mô phỏng lại cách David Lewis tìm "thế giới khả dĩ gần nhất" bằng cách sử dụng **Machine Learning Surrogate Models** kết hợp với **Do-Calculus / Counterfactual Inference**.

  

### Kiến trúc 4 bước của thuật toán:

```
[1. Real-time Telemetry Stream] 
       │
       ▼
[2. Surrogate Prediction Model] (Học hàm ánh xạ: X_features → U2S)
       │
       ▼
[3. Counterfactual Intervention Engine] (Can thiệp do(X_i = X'_i))
       │
       ▼
[4. Causal Impact Scoring & Alert] (Xác định biến gây lệch U2S lớn nhất)
```

#### Bước 1: Xây dựng Mô hình dự đoán cơ sở (Surrogate Model)

- **Mục tiêu:** Huấn luyện một mô hình học máy (như **XGBoost** hoặc **LightGBM**) lấy các biến trạng thái làm đầu vào ($X$) và dự đoán chỉ số U2S ($Y$).
    
      
    
- **Hàm mục tiêu:**
    
      
    
    $$Y_{U2S} = f(\text{Bin Utilization}, \text{Travel Distance}, \text{WMS Latency}, \text{Labor Count}, \dots)$$
    
- Mô hình này đóng vai trò là "vũ trụ ảo" phản ánh chính xác quy luật vận hành của kho hàng.
    
      
    

#### Bước 2: Kích hoạt mô hình khi U2S vượt ngưỡng (Anomaly Trigger)

- Khi hệ thống Control Tower phát hiện giá trị U2S trung bình trong cửa sổ 30 phút vượt quá SLA (ví dụ: $> 180$ phút), thuật toán tự động lấy **State Snapshot** hiện tại của kho ($X_0$) làm điểm mốc thực tế ($W_0$).
    
      
    

#### Bước 3: Mô phỏng can thiệp phản thực (Counterfactual Intervention)

Thuật toán lần lượt "đóng băng" hoặc "đưa về trạng thái lý tưởng" từng biến số độc lập ($X_i$) trong khi giữ nguyên các biến khác để tạo ra các thế giới phản thực ($W_1, W_2, \dots$):

  

- _Can thiệp 1 ($W_1$):_ Đặt giả định $\text{Bin Utilization}$ về mức tối ưu ($50\%$), giữ nguyên các yếu tố còn lại $\rightarrow$ Dự đoán $Y_{W1}$.
    
      
    
- _Can thiệp 2 ($W_2$):_ Đặt giả định $\text{WMS Latency}$ về $0$ms $\rightarrow$ Dự đoán $Y_{W2}$.
    
      
    
- _Can thiệp 3 ($W_3$):_ Tăng $\text{Active Stowers}$ lên mức định biên $\rightarrow$ Dự đoán $Y_{W3}$.
    
      
    

#### Bước 4: Tính toán điểm tác động nhân quả (Counterfactual Impact Score)

Tính độ lệch giữa thực tế ($Y_{actual}$) và kết quả sau khi can thiệp phản thực ($\Delta Y_i$):

  

$$\text{Impact Score}(X_i) = Y_{actual} - Y_{counterfactual}(do(X_i = X_{ideal}))$$

- **Biến số nào tạo ra $\Delta Y$ lớn nhất chính là Nguyên nhân Gốc rễ (Root Cause).**
    
      
    
- _Ví dụ:_ Nếu ép $\text{Bin Utilization}$ về mức tối ưu làm U2S giảm từ 300 phút xuống 130 phút ($\Delta Y = 170$ phút), hệ thống lập tức gán điểm số cao nhất cho "Nghẽn kệ (Bin Congestion)" và gửi cảnh báo trực tiếp kèm vị trí khu vực bị nghẽn tới quản lý ca trực.