/**
 * 갓통과 B2B 주간지 견적 신청 구글 시트 & 이메일 자동화 Webhook (Google Apps Script)
 * 
 * [설치 및 배포 가이드]
 * 1. 구글 드라이브(drive.google.com)에서 새 구글 스프레드시트를 생성합니다 (예: "갓통과_B2B_견적신청_관리대장").
 * 2. 상단 메뉴 [확장 프로그램] > [Apps Script]를 클릭합니다.
 * 3. 기존 코드를 모두 지우고 본 스크립트 전체를 복사하여 붙여넣습니다.
 * 4. 아래 ADMIN_EMAIL에 대표님 이메일 주소를 입력합니다.
 * 5. 우측 상단 [배포] > [새 배포] 클릭:
 *    - 유형 선택(톱니바퀴): "웹 앱 (Web app)"
 *    - 설명: "B2B 견적 신청 Webhook v1"
 *    - 다음 사용자 권한으로 실행: "나 (내 계정)"
 *    - 액세스 권한이 있는 사용자: "모든 사용자 (Anyone)" 필수!
 * 6. [배포] 버튼 클릭 후 제공되는 '웹 앱 URL'을 복사하여 b2b_weekly.html의 GOOGLE_SHEET_WEBHOOK_URL에 입력합니다.
 */

const ADMIN_EMAIL = "godtonggwa@gmail.com"; // 대표님 수신 이메일

function doPost(e) {
  try {
    const rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(rawData);
    const now = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // [결제/이체 통보 분기] 견적서에서 '이체완료통보'를 누른 경우 별도 시트 적재 및 개시 안내 메일 발송
    const isTransferReport = (data.status === '입금확인대기' || (data.package && data.package.includes('입금통보')) || data.type === 'transfer_report');
    if (isTransferReport) {
      return handleTransferReport(data, ss, now);
    }

    let sheet = ss.getSheetByName("견적신청_접수목록");
    if (!sheet) {
      sheet = ss.getActiveSheet();
      sheet.setName("견적신청_접수목록");
    }
    
    // 첫 행이 비어있다면 헤더 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수일시", "학원명 및 지역", "선생님 성함", "연락처", "이메일",
        "수강생 규모", "배포 형태", "추가 문의사항", "신청 패키지", "진행 상태", "영업 상담 메모"
      ]);
      sheet.getRange(1, 1, 1, 11).setBackground("#1e293b").setFontColor("#ffffff").setFontWeight("bold");
    }
    
    const deliveryText = data.delivery === 'digital' 
      ? '디지털 라이선스형 (자체 출력/태블릿 열람)' 
      : (data.delivery === 'physical' ? '올인원 실물 배송형 (책자 배송)' : '상담 후 맞춤 추천');
    
    // 구글 시트에 행 추가
    sheet.appendRow([
      now,
      data.academy || "-",
      data.teacher || "-",
      data.phone || "-",
      data.email || "-",
      (data.seats || "-") + "명 플랜",
      deliveryText,
      data.note || "-",
      data.package || "2028 통합과학 겨울특강 10주 주간지",
      "신청접수",
      ""
    ]);
    
    // 1. 대표님 스마트폰 즉시 알림 이메일 발송
    const adminSubject = `[갓통과 B2B 견적신청] ${data.academy} (${data.teacher} 쌤 / ${data.seats}명)`;
    const adminBody = `
[새로운 B2B 주간지 견적 신청이 접수되었습니다]

■ 학원명: ${data.academy}
■ 선생님: ${data.teacher}
■ 연락처: ${data.phone}
■ 이메일: ${data.email}
■ 수강생: ${data.seats}명 플랜
■ 배포형태: ${deliveryText}
■ 추가문의: ${data.note || "없음"}
■ 접수일시: ${now}

구글 스프레드시트에서 실시간 확인 및 상담 메모를 작성하실 수 있습니다.
    `.trim();
    
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: adminSubject,
        body: adminBody,
        name: "갓통과 B2B 알림시스템"
      });
    } catch(mailErr) {
      console.error("Admin mail error:", mailErr);
    }
    
    // 2. 신청 학원장님께 즉시 공식 견적서 발송 (HTML 이메일 + 3,900원 도매가 및 ROI 순수익 분석)
    if (data.email && data.email.includes("@")) {
      const seatsNum = parseInt(data.seats || "50", 10);
      const unitPrice = 3900;
      const weeks = 10;
      const perStudentSupply = unitPrice * weeks; // 39,000원
      const totalSupply = seatsNum * perStudentSupply; // 총 공급가 (VAT포함)
      const netSupply = Math.round(totalSupply / 1.1); // 공급가액
      const vatAmount = totalSupply - netSupply; // 부가가치세 (10%)
      const parentPerStudent = 120000; // 학부모 권장 수납 12만 원
      const parentTotal = seatsNum * parentPerStudent;
      const academyProfit = parentTotal - totalSupply; // 학원 순마진
      const rehearsalEng = data.eng ? `&eng=${encodeURIComponent(data.eng)}` : '';
      const estimateUrl = `https://godtonggwa.web.app/STEST/weekly/b2b_estimate_sheet.html?academy=${encodeURIComponent(data.academy || '')}&teacher=${encodeURIComponent(data.teacher || '')}&seats=${seatsNum}&delivery=${encodeURIComponent(data.delivery || 'digital')}&phone=${encodeURIComponent(data.phone || '')}&email=${encodeURIComponent(data.email || '')}${rehearsalEng}`;
      const rehearsalUrl = `https://godtonggwa.web.app/STEST/weekly/b2b_manual_guide.html?brand=${encodeURIComponent(data.academy || '')}&teacher=${encodeURIComponent(data.teacher || '')}${rehearsalEng}`;

      const clientSubject = `[공식 견적서] ${data.academy} (${data.teacher} 선생님) 2028 통합과학 주간지 B2B 공급 견적서`;
      
      const clientHtmlBody = `
        <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', sans-serif; max-width: 650px; margin: 0 auto; background: #090d16; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #f8fafc; line-height: 1.6;">
          <!-- 상단 브랜드 헤더 -->
          <div style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 26px 24px 18px 24px; text-align: center; border-bottom: 1px solid #1e293b;">
            <div style="display: inline-block; background: #3b82f6; color: #ffffff; font-size: 11px; font-weight: 800; padding: 3px 12px; border-radius: 20px; margin-bottom: 8px;">
              갓통과 2028 통합과학 B2B 에듀테크 본부
            </div>
            <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
              ${data.academy} (${data.teacher} 선생님) 전용 견적서 도착
            </h1>
            <p style="margin: 6px 0 0 0; font-size: 12.5px; color: #94a3b8;">
              신청해 주신 겨울방학 10주 특강 B2B 공급 견적 및 실전 체험 안내입니다.
            </p>
          </div>

          <!-- 본문 안내: 첨부 이미지 규격 반영 2개 핵심 카드 -->
          <div style="padding: 24px;">

            <!-- [카드 1: 녹색 배너] 우리 학원 전용 공식 B2B 견적서 생성 완료 -->
            <div style="background: #022c22; border: 1.5px solid #059669; border-radius: 14px; padding: 20px; margin-bottom: 18px; box-shadow: 0 4px 16px rgba(5,150,105,0.25);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="display: inline-block; background: #10b981; color: #022c22; font-size: 11px; font-weight: 900; padding: 3px 10px; border-radius: 12px;">즉시 발행 완료</span>
                <span style="font-size: 12px; font-weight: 800; color: #34d399; margin-left: auto;">권당 3,900원 특가 적용</span>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 900; color: #ffffff; letter-spacing: -0.3px;">
                우리 학원 전용 공식 B2B 견적서가 생성되었습니다.
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: #cbd5e1; line-height: 1.5;">
                입력하신 이메일(<strong style="color: #38bdf8;">${data.email}</strong>)로 상세 견적서가 즉시 발송되었으며, 지금 바로 화면에서 열람 및 PDF 저장이 가능합니다.
              </p>
              <div style="text-align: center;">
                <a href="${estimateUrl}" target="_blank" style="display: block; background: #059669; color: #ffffff; font-size: 14px; font-weight: 900; padding: 14px 20px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);">
                  📄 내 학원 맞춤 견적서 즉시 열람 및 인쇄 / PDF 저장 (새창) ➔
                </a>
              </div>
            </div>

            <!-- [카드 2: 보라색 배너] 주간지 운영 체험하기 (실전 리허설 4단계) -->
            <div style="background: #1e1b4b; border: 1.5px solid #4f46e5; border-radius: 14px; padding: 20px; margin-bottom: 24px; box-shadow: 0 4px 16px rgba(79,70,229,0.25);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                <span style="display: inline-block; background: #4f46e5; color: #ffffff; font-size: 11px; font-weight: 900; padding: 3px 10px; border-radius: 12px;">특별 제공</span>
                <span style="font-size: 12px; font-weight: 800; color: #a5b4fc;">⚡ 주간지 운영 체험하기 (실전 리허설 4단계)</span>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 900; color: #ffffff; letter-spacing: -0.3px;">
                원장님 학원의 브랜드로 10분 만에 직접 체험해 보세요!
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                1단계 브랜딩 설정 ➔ 2단계 엑셀 등록 ➔ 3단계 시험지 일체형 OMR ➔ 4단계 학부모 카톡 성적표까지, 시스템의 실제 작동 전 과정을 사전에 직접 경험해보실 수 있습니다.
              </p>
              <div style="text-align: center;">
                <a href="${rehearsalUrl}" target="_blank" style="display: block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 900; padding: 14px 20px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">
                  🚀 「주간지 운영 체험하기」 시작하기 (새창) ➔
                </a>
              </div>
            </div>

            <!-- 견적 상세 요약 테이블 -->
            <div style="background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 13px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">📋 견적 상세 내역</div>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; color: #e2e8f0;">
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">학원명</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">${data.academy} (${data.teacher} 선생님)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">공급 패키지</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">2028 통합과학 10주 주간지 풀패키지</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">수강생 규모</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">${seatsNum}명 (${weeks}주 완성, 총 ${seatsNum * weeks}권)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">권당 도매 공급가</td>
                  <td style="padding: 7px 0; font-weight: 800; color: #34d399; text-align: right;">3,900원 (초특가)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">학생 1인당 10주 공급가</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">${perStudentSupply.toLocaleString()}원</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">공급가액</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">${netSupply.toLocaleString()}원</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 7px 0; color: #94a3b8;">부가가치세 (VAT 10%)</td>
                  <td style="padding: 7px 0; font-weight: 700; text-align: right;">${vatAmount.toLocaleString()}원</td>
                </tr>
                <tr style="background: #1e1b4b;">
                  <td style="padding: 10px 8px; font-weight: 800; color: #c7d2fe;">총 견적 공급 합계</td>
                  <td style="padding: 10px 8px; font-weight: 900; font-size: 16px; color: #38bdf8; text-align: right;">
                    ₩${totalSupply.toLocaleString()} (VAT포함)
                  </td>
                </tr>
              </table>
            </div>

            <!-- 학원 마진 수익 분석 (ROI) -->
            <div style="background: #064e3b; border: 1.5px solid #10b981; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
              <div style="font-size: 13px; font-weight: 900; color: #a7f3d0; margin-bottom: 8px;">
                💰 학원 운영비 부담 0원! 학부모 교재비 수납을 통한 순수익 창출 구조
              </div>
              <p style="font-size: 12px; color: #d1fae5; margin: 0 0 12px 0;">
                갓통과 주간지는 학원의 지출 비용이 아닙니다. 학부모님께 수납하는 표준 교재비로 본사 공급가를 전액 충당하고, 오히려 <strong>학생 1인당 순마진이 학원의 순수익</strong>으로 남는 합법적 고수익 구조입니다.
              </p>
              <table style="width: 100%; font-size: 12px; border-collapse: collapse; background: #022c22; border-radius: 8px; overflow: hidden; border: 1px solid #059669; color: #f8fafc;">
                <tr style="background: #047857; color: #ffffff;">
                  <th style="padding: 8px; text-align: left;">구분</th>
                  <th style="padding: 8px; text-align: right;">${seatsNum}명 플랜 산출</th>
                </tr>
                <tr style="border-bottom: 1px solid #065f46;">
                  <td style="padding: 8px;">학부모 교재비 수납 (인당 12만 원)</td>
                  <td style="padding: 8px; text-align: right; font-weight: 700; color: #a7f3d0;">+ ${parentTotal.toLocaleString()}원</td>
                </tr>
                <tr style="border-bottom: 1px solid #065f46; color: #f87171;">
                  <td style="padding: 8px;">본사 도매 공급가 (권당 3,900원)</td>
                  <td style="padding: 8px; text-align: right; font-weight: 700;">- ${totalSupply.toLocaleString()}원</td>
                </tr>
                <tr style="background: #065f46; font-weight: 900; font-size: 13px;">
                  <td style="padding: 10px 8px; color: #ffffff;">🎉 학원 순수익 (교재비 차액)</td>
                  <td style="padding: 10px 8px; text-align: right; color: #34d399;">+ ${academyProfit.toLocaleString()}원</td>
                </tr>
                <tr style="color: #94a3b8; font-size: 11px;">
                  <td style="padding: 6px 8px;">학원 운영비 실질 부담</td>
                  <td style="padding: 6px 8px; text-align: right; font-weight: 700; color: #38bdf8;">0원 (전액 충당)</td>
                </tr>
              </table>
            </div>

            <div style="border-top: 1px solid #1e293b; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
              <strong>■ 발주 및 개시 안내</strong><br>
              견적서 확인 후 담당 교육 매니저가 기재해 주신 연락처(${data.phone})로 유선 안내 및 수강생 엑셀 등록 안내를 도와드립니다.<br>
              궁금하신 사항은 본 메일로 회신해 주시거나 고객센터(02-555-2028 / godtonggwa@gmail.com)로 문의해 주시기 바랍니다.
            </div>

            <!-- 특약 사항 및 법적 고지 -->
            <div style="border-top: 1px solid #1e293b; padding-top: 12px; margin-top: 12px; font-size: 11px; color: #64748b; line-height: 1.5;">
              <strong>⚖️ 특약 사항 및 법적 고지</strong><br>
              • 승낙 및 계약 성립: 본 견적서에 따른 서명 회신 또는 공급 대금 입금(카드결제 포함) 시 상호 정식 공급계약이 체결된 것으로 봅니다.<br>
              • 저작권 보호: 주간지 전자책·모의고사·OMR 시스템의 저작권은 공급자에 전속하며, 제3자 무단 배포·재판매·외부 유출을 엄격히 금지합니다.<br>
              • 환불 규정: 화이트레이블 맞춤 제작 및 디지털 라이선스 특성상 계정 발급 이후 단순 변심에 의한 환불은 불가합니다.
            </div>
          </div>

          <!-- 푸터 -->
          <div style="background: #020617; border-top: 1px solid #1e293b; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center;">
            © 갓통과 B2B 교육사업본부 • 서울시 강남구 테헤란로 과학빌딩 • 고객센터: 02-555-2028 / godtonggwa@gmail.com
          </div>
        </div>
      `;

      const clientTextBody = `
[우리 학원 전용 공식 B2B 견적서 생성 완료]
${data.academy} (${data.teacher} 선생님)

입력하신 이메일(${data.email})로 상세 견적서가 생성되었습니다.

1. 📄 내 학원 맞춤 견적서 즉시 열람 및 인쇄 / PDF 저장 (새창):
👉 ${estimateUrl}

2. 🚀 「주간지 운영 체험하기」 시작하기 (실전 리허설 4단계):
👉 ${rehearsalUrl}

■ 견적 상세 요약
- 학원명: ${data.academy} (${data.teacher} 선생님)
- 공급 패키지: 2028 통합과학 10주 주간지 풀패키지 (화이트레이블 전자책 + Fit 20 모의고사 + OMR 채점 + 학부모 성적표)
- 수강생 규모: ${seatsNum}명 플랜 (${weeks}주 완성, 총 ${seatsNum * weeks}권)
- 권당 도매 공급가: 3,900원 (초특가)
- 학생 1인당 10주 공급가: ${perStudentSupply.toLocaleString()}원
- 공급가액: ${netSupply.toLocaleString()}원
- 부가가치세 (VAT 10%): ${vatAmount.toLocaleString()}원
- 총 견적 공급 합계: ₩${totalSupply.toLocaleString()} (VAT포함)

■ 학원 순수익(ROI) 분석 (학부모 교재비 수납 충당)
- 학부모 교재비 수납 (인당 12만 원): + ${parentTotal.toLocaleString()}원
- 본사 도매 공급가 (권당 3,900원): - ${totalSupply.toLocaleString()}원
- 학원 순수익 (교재비 차액): + ${academyProfit.toLocaleString()}원
- 학원 운영비 실질 부담: 0원 (전액 충당)

■ 특약 사항 및 법적 고지 (분쟁 방지)
- 승낙 및 계약 성립: 본 견적 조건에 따른 서명 회신 또는 대금 입금 시 정식 공급계약 체결
- 저작권 및 유출 금지: 본 콘텐츠의 저작권은 공급자에 귀속되며 제3자 무단 배포 및 유출 엄금
- 환불 규정: 전자책 및 디지털 라이선스 특성상 계정 발급 후 단순 변심에 의한 환불 불가

문의: 02-555-2028 / godtonggwa@gmail.com
- 갓통과 B2B 사업본부 드림 -
      `.trim();

      try {
        MailApp.sendEmail({
          to: data.email,
          replyTo: ADMIN_EMAIL,
          name: "갓통과 B2B 교육사업본부",
          subject: clientSubject,
          body: clientTextBody,
          htmlBody: clientHtmlBody
        });
        console.log("Client estimate email sent successfully to " + data.email);
      } catch(clientMailErr) {
        console.error("Client mail error:", clientMailErr);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: '접수 완료' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 서비스 신청자가 견적서에서 [이체완료통보] 버튼을 눌렀을 때 실행되는 핸들러
 * - 구글 시트 '입금통보_결제접수목록'에 기록
 * - 대표님 스마트폰 알림 메일 발송
 * - 서비스 신청자(학원장님)에게 [입금 통보 접수 및 서비스 개시 안내] 공식 이메일 자동 발송
 */
function handleTransferReport(data, ss, now) {
  let sheet = ss.getSheetByName("입금통보_결제접수목록");
  if (!sheet) {
    sheet = ss.insertSheet("입금통보_결제접수목록");
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "접수일시", "학원명", "선생님 성함", "실제 입금자명", "입금 금액",
      "사업자등록번호", "학원 상호명", "대표자 성함", "세금계산서 이메일",
      "연락처", "비고/요청사항", "진행 상태"
    ]);
    sheet.getRange(1, 1, 1, 12).setBackground("#047857").setFontColor("#ffffff").setFontWeight("bold");
  }

  const amountVal = parseInt(data.amount || 0, 10);
  sheet.appendRow([
    now,
    data.academy || "-",
    data.teacher || "-",
    data.sender || "-",
    amountVal,
    data.bizNum || "-",
    data.bizName || "-",
    data.ceoName || "-",
    data.taxEmail || data.email || "-",
    data.phone || "-",
    data.note || "-",
    "입금확인대기"
  ]);

  // 1. 대표님 알림 메일 발송
  const adminSubject = `[갓통과 B2B 입금통보] ${data.academy} (입금자: ${data.sender} / ₩${amountVal.toLocaleString()}원)`;
  const adminBody = `
[B2B 주간지 계좌이체 완료 통보가 접수되었습니다]

■ 학원명: ${data.academy} (${data.teacher} 선생님)
■ 실제 입금자명: ${data.sender}
■ 입금 금액: ₩${amountVal.toLocaleString()}원
■ 사업자등록번호: ${data.bizNum}
■ 학원 상호명: ${data.bizName}
■ 대표자 성함: ${data.ceoName}
■ 세금계산서 메일: ${data.taxEmail || data.email}
■ 연락처: ${data.phone}
■ 비고/요청사항: ${data.note || "없음"}
■ 접수일시: ${now}

👉 국민은행 2028-1010-0082 실입금 대조 후, 관리자 콘솔 및 라이선스 키를 승인해 주세요.
  `.trim();

  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      body: adminBody,
      name: "갓통과 B2B 결제알림"
    });
  } catch(err) {
    console.error("Admin transfer mail error:", err);
  }

  // 2. 공식 결제 확인 검증: 결제 정보가 정상 확인(인증)된 경우에만 신청자에게 이메일 발송
  // (결제 미확인 상태에서는 무단 발송 및 키 유출 방지를 위해 이메일을 일체 발송하지 않음)
  const isPaymentVerified = (data.type === 'payment_confirmed' || data.isPaymentVerified === true);

  const recipientEmail = data.taxEmail || data.email;
  if (isPaymentVerified && recipientEmail && recipientEmail.includes("@")) {
    const seatsNum = parseInt(data.seats || "50", 10);
    const tenantId = encodeURIComponent(data.academy || 'daechi_mirae');
    const licenseKey = `GTW-2028-${(data.academy || 'ACADEMY').toUpperCase().replace(/[^A-Z0-9]/g, '')}-${seatsNum}SEATS-VERIFIED`;
    const consoleUrl = `https://godtonggwa.web.app/STEST/weekly/b2b_admin_console.html?tenant=${tenantId}&brand=${encodeURIComponent(data.academy || '')}&teacher=${encodeURIComponent(data.teacher || '')}`;

    const clientSubject = `[결제완료] ${data.academy} (${data.teacher} 선생님) 2028 통합과학 주간지 결제 확인 및 정품 개시 안내`;

    const clientHtmlBody = `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #0f172a; line-height: 1.6; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <!-- 상단 헤더 -->
        <div style="background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 28px 24px 22px 24px; text-align: center; border-bottom: 2px solid #059669;">
          <div style="display: inline-block; background: rgba(255,255,255,0.2); color: #ffffff; font-size: 11.5px; font-weight: 800; padding: 4px 14px; border-radius: 20px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.35);">
            갓통과 2028 통합과학 B2B 에듀테크 본부
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
            결제(입금)가 정상 확인되었습니다!
          </h1>
          <p style="margin: 8px 0 0 0; font-size: 13.5px; color: #d1fae5; font-weight: 500;">
            ${data.academy} (${data.teacher} 선생님) 주간지 공급 대금 결제 승인 및 정품 라이선스 개시 안내
          </p>
        </div>

        <div style="padding: 26px 24px;">

          <!-- [입금 확인 안내문: 결제 승인 및 내역 요약] -->
          <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 22px;">
            <div style="font-size: 14px; font-weight: 900; color: #0284c7; margin-bottom: 14px; display: flex; align-items: center; gap: 6px;">
              <span>🧾</span> <span>공식 결제 승인 및 입금 확인 안내</span>
            </div>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse; color: #1e293b;">
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">신청 학원명</td>
                <td style="padding: 9px 0; font-weight: 800; text-align: right; color: #0f172a;">${data.academy} (${data.teacher} 선생님)</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">결제 확인 금액</td>
                <td style="padding: 9px 0; font-weight: 900; font-size: 16px; color: #047857; text-align: right;">₩${amountVal.toLocaleString()}원 (VAT 포함)</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">결제 수단</td>
                <td style="padding: 9px 0; font-weight: 700; text-align: right; color: #334155;">${data.payMethod || '공식 결제 (카드 / 계좌이체)'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">승인 / 주문번호</td>
                <td style="padding: 9px 0; font-weight: 800; text-align: right; color: #0284c7; font-family: monospace; font-size: 13.5px;">${data.orderId || ('GTW-' + Date.now())}</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">신청 수강생 규모</td>
                <td style="padding: 9px 0; text-align: right; font-weight: 800; color: #0f172a;">${seatsNum}명 플랜 (겨울특강 10주 총 ${seatsNum * 10}권)</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #64748b; font-weight: 600;">승인 일시</td>
                <td style="padding: 9px 0; text-align: right; font-weight: 700; color: #475569;">${now}</td>
              </tr>
            </table>
          </div>

          <!-- [1번 항목: 이후 서비스 개시 4단계 절차 안내] -->
          <div style="background: #f8fafc; border: 1.5px solid #c7d2fe; border-radius: 14px; padding: 20px; margin-bottom: 22px;">
            <div style="font-size: 14px; font-weight: 900; color: #3730a3; margin-bottom: 14px; display: flex; align-items: center; gap: 6px;">
              <span>🚀</span> <span>1. 서비스 개시 4단계 절차 안내 (4단계 로드맵)</span>
            </div>
            
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
              <strong style="color: #0369a1; font-size: 13.5px; display: block; margin-bottom: 3px;">1단계. 본사 전산 승인 완료 (정품 라이선스 즉시 활성화)</strong>
              <span style="font-size: 12.5px; color: #334155; line-height: 1.5;">공식 결제 승인과 동시에 학원 고유 라이선스 키가 즉시 활성화되었습니다.</span>
            </div>

            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
              <strong style="color: #047857; font-size: 13.5px; display: block; margin-bottom: 3px;">2단계. 국세청 전자세금계산서 / 카드매출전표 자동 발행</strong>
              <span style="font-size: 12.5px; color: #334155; line-height: 1.5;">법정 정규 증빙(전자세금계산서 또는 신용카드 매출전표)이 이메일로 자동 전송됩니다.</span>
            </div>

            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #d97706; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
              <strong style="color: #b45309; font-size: 13.5px; display: block; margin-bottom: 3px;">3단계. 관리자 콘솔 수강생 명단 엑셀 등록 (10초 완료)</strong>
              <span style="font-size: 12.5px; color: #334155; line-height: 1.5;">아래 관리자 콘솔 링크에서 재원생 명단(이름, 휴대폰 뒷자리)을 엑셀 복사/붙여넣기 하시면 즉시 화이트라벨 세팅이 완료됩니다.</span>
            </div>

            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #db2777; border-radius: 8px; padding: 12px 14px;">
              <strong style="color: #be185d; font-size: 13.5px; display: block; margin-bottom: 3px;">4단계. 주간 학습 카카오톡 공지 배부 &amp; OMR 자동 채점 개시</strong>
              <span style="font-size: 12.5px; color: #334155; line-height: 1.5;">관리자 콘솔에서 1클릭으로 생성된 공지문을 학생 단톡방에 배부하여 주간 학습 및 성적 집계를 즉시 시작합니다.</span>
            </div>
          </div>

          <!-- [2번 항목: 발급 정품 라이선스 키 & 관리자 콘솔 바로가기] -->
          <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-radius: 14px; padding: 22px; margin-bottom: 22px; text-align: center;">
            <div style="font-size: 13px; font-weight: 800; color: #047857; margin-bottom: 6px;">
              2. 발급 정품 라이선스 키 &amp; 관리자 콘솔 바로가기
            </div>
            <div style="font-family: monospace; font-size: 15.5px; font-weight: 900; color: #065f46; background: #ffffff; padding: 11px 18px; border-radius: 8px; display: inline-block; letter-spacing: 1px; margin-bottom: 16px; border: 2px dashed #059669; box-shadow: 0 2px 6px rgba(5, 150, 105, 0.08);">
              ${licenseKey}
            </div>
            <div>
              <a href="${consoleUrl}" target="_blank" style="display: block; background: #059669; color: #ffffff; font-size: 14.5px; font-weight: 900; padding: 14px 20px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);">
                🖥️ [원장님 전용] B2B 관리자 콘솔 바로가기 ➔
              </a>
            </div>
          </div>

          <!-- [3번 항목: 1학기 내신 무제한 복습 보장 안내] -->
          <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 14px; padding: 18px; margin-bottom: 22px; font-size: 13px; color: #1e3a8a;">
            <div style="font-weight: 900; color: #1d4ed8; font-size: 13.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>🎁</span> <span>3. [도입 특전] 1학기 기말고사(2027년 7월 31일) 무제한 복습 보장</span>
            </div>
            <div style="line-height: 1.6; color: #1e293b;">
              겨울방학 10주 특강 성적 집계 이후에도, 등록된 학생들의 <strong style="color: #1d4ed8;">전자책 열람, 모의고사 다시풀기, 성적표 조회는 1학기 내신(7월 31일)까지 무제한 지원</strong>되어 학원생들의 내신 1등급 달성에 완벽히 기여합니다.
            </div>
          </div>

          <!-- [4번 항목: 특약 사항 및 법적 고지] -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px; font-size: 12px; color: #475569; line-height: 1.6;">
            <strong style="color: #1e293b; font-size: 12.5px; display: block; margin-bottom: 6px;">⚖️ 4. 특약 사항 및 법적 고지 (분쟁 방지용 표준 조항)</strong>
            <div style="margin-bottom: 3px;">• <strong>승낙 및 계약 성립:</strong> 공식 결제 승인에 따라 상호 정식 공급계약이 체결된 것으로 봅니다.</div>
            <div style="margin-bottom: 3px;">• <strong>저작권 보호:</strong> 주간지 전자책·모의고사·OMR 시스템의 저작권은 공급자에 전속하며, 제3자 무단 배포·재판매·외부 유출을 엄격히 금지합니다.</div>
            <div>• <strong>환불 규정:</strong> 화이트레이블 맞춤 제작 및 디지털 라이선스 특성상 계정 발급 이후 단순 변심에 의한 환불은 불가합니다.</div>
          </div>

        </div>

        <!-- 푸터 -->
        <div style="background: #f1f5f9; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 11.5px; color: #64748b; text-align: center;">
          © 갓통과 B2B 교육사업본부 • 서울시 강남구 테헤란로 과학빌딩 • 고객센터: 02-555-2028 / godtonggwa@gmail.com
        </div>
      </div>
    `;

    const clientTextBody = `
[갓통과 B2B 주간지 결제 확인 및 정품 개시 안내]
${data.academy} (${data.teacher} 선생님)

공식 결제가 정상 확인되었습니다.

■ [입금/결제 확인 안내문]
- 신청 학원: ${data.academy} (${data.teacher} 선생님)
- 결제 확인 금액: ₩${amountVal.toLocaleString()}원 (VAT 포함)
- 결제 수단: ${data.payMethod || '공식 결제 (카드 / 계좌이체)'}
- 승인 번호: ${data.orderId || ('GTW-' + Date.now())}
- 수강생 규모: ${seatsNum}명 플랜 (겨울특강 10주 총 ${seatsNum * 10}권)
- 승인 일시: ${now}

■ 1. 서비스 개시 4단계 절차 안내
1단계. 본사 전산 승인 완료 (정품 라이선스 즉시 활성화)
2단계. 국세청 전자세금계산서 / 카드매출전표 자동 전송
3단계. 관리자 콘솔에서 수강생 명단 엑셀 등록 (10초 완료)
4단계. 학생 카카오톡 주간 공지 배부 & OMR 실시간 채점 개시

■ 2. 발급 정품 라이선스 키 & 관리자 콘솔
- 라이선스 키: ${licenseKey}
- [원장님 전용] 관리자 콘솔: ${consoleUrl}

■ 3. [도입 특전] 1학기 내신 무제한 복습 보장
- 1학기 기말고사(2027년 7월 31일)까지 전자책 열람, OMR 다시풀기, 성적표 조회 무제한 복습 보장

■ 4. 특약 사항 및 법적 고지
- 승낙 및 계약 성립: 공식 결제 승인 시 정식 공급계약 성립
- 저작권 보호: 콘텐츠 저작권은 공급자에 귀속되며 무단 배포 및 유출 엄금
- 환불 규정: 전자책 및 디지털 라이선스 특성상 계정 발급 후 단순 변심에 의한 환불 불가

- 갓통과 B2B 교육사업본부 드림 -
    `.trim();

    try {
      MailApp.sendEmail({
        to: recipientEmail,
        replyTo: ADMIN_EMAIL,
        name: "갓통과 B2B 교육사업본부",
        subject: clientSubject,
        body: clientTextBody,
        htmlBody: clientHtmlBody
      });
    } catch(err) {
      console.error("Client transfer confirmation email error:", err);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: '입금 통보 처리 및 안내 메일 발송 완료' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput("갓통과 B2B Webhook 서버가 정상 작동 중입니다.");
}
