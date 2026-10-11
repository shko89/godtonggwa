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
    const ss = SpreadsheetApp.getActiveSpreadsheet();
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
    
    const now = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
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
      const totalSupply = seatsNum * perStudentSupply; // 총 공급가
      const parentPerStudent = 120000; // 학부모 권장 수납 12만 원
      const parentTotal = seatsNum * parentPerStudent;
      const academyProfit = parentTotal - totalSupply; // 학원 순마진

      const estimateUrl = `https://godtonggwa.web.app/STEST/weekly/b2b_estimate_sheet.html?academy=${encodeURIComponent(data.academy || '')}&teacher=${encodeURIComponent(data.teacher || '')}&seats=${seatsNum}&delivery=${encodeURIComponent(data.delivery || 'physical')}&phone=${encodeURIComponent(data.phone || '')}&email=${encodeURIComponent(data.email || '')}`;
      const rehearsalUrl = `https://godtonggwa.web.app/STEST/weekly/b2b_manual_guide.html?brand=${encodeURIComponent(data.academy || '')}&teacher=${encodeURIComponent(data.teacher || '')}`;

      const clientSubject = `[공식 견적서] ${data.academy} (${data.teacher} 선생님) 2028 통합과학 주간지 B2B 공급 견적서`;
      
      const clientHtmlBody = `
        <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b; line-height: 1.6;">
          <!-- 상단 배너 -->
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px 24px; color: #ffffff; text-align: center;">
            <div style="display: inline-block; background: #4f46e5; color: #ffffff; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; margin-bottom: 10px;">
              B2B OFFICIAL ESTIMATE
            </div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
              2028 통합과학 주간지 공급 견적서
            </h1>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #cbd5e1;">
              ${data.academy} (${data.teacher} 선생님) 맞춤 도매 공급 견적서가 발행되었습니다.
            </p>
          </div>

          <!-- 본문 안내 -->
          <div style="padding: 24px;">
            <p style="font-size: 14px; margin: 0 0 16px 0;">
              안녕하세요, <strong>${data.teacher} 선생님</strong>.<br>
              2028 개정 수능 통합과학 주간지 에듀테크 본부입니다.<br>
              신청해 주신 조건에 따른 <strong>권당 3,900원 최저 도매가 기준 맞춤 견적</strong>을 즉시 전달해 드립니다.
            </p>

            <!-- 견적 요약 카드 -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; font-weight: 800; color: #4f46e5; margin-bottom: 10px;">📋 견적 상세 내역</div>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 0; color: #64748b;">공급 패키지</td>
                  <td style="padding: 6px 0; font-weight: 700; text-align: right;">2028 통합과학 10주 주간지 풀패키지</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 0; color: #64748b;">신청 수강생 규모</td>
                  <td style="padding: 6px 0; font-weight: 700; text-align: right;">${seatsNum}명 (${weeks}주 완성, 총 ${seatsNum * weeks}권)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 0; color: #64748b;">권당 도매 공급가</td>
                  <td style="padding: 6px 0; font-weight: 800; color: #4f46e5; text-align: right;">3,900원 (초특가)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 0; color: #64748b;">학생 1인당 10주 공급가</td>
                  <td style="padding: 6px 0; font-weight: 700; text-align: right;">${perStudentSupply.toLocaleString()}원</td>
                </tr>
                <tr style="background: #eef2ff;">
                  <td style="padding: 10px 8px; font-weight: 800; color: #1e1b4b;">총 견적 공급 합계</td>
                  <td style="padding: 10px 8px; font-weight: 900; font-size: 16px; color: #312e81; text-align: right;">
                    ₩${totalSupply.toLocaleString()} (VAT포함)
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #64748b; margin-top: 8px;">
                * 화이트레이블(원작자 노출 0%) 브랜딩 커스텀 및 학원 관리자 관제 콘솔 무상 제공 포함
              </div>
            </div>

            <!-- 학원 마진 수익 분석 (첨부 이미지 규격 반영) -->
            <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
              <div style="font-size: 13px; font-weight: 900; color: #065f46; margin-bottom: 8px;">
                💰 학원 운영비 부담 0원! 학부모 교재비 수납을 통한 순수익 창출 구조
              </div>
              <p style="font-size: 12px; color: #047857; margin: 0 0 12px 0;">
                갓통과 주간지는 학원의 지출 비용이 아닙니다. 학부모님께 수납하는 표준 교재비로 본사 공급가를 전액 충당하고, 오히려 <strong>학생 1인당 순마진이 학원의 순수익</strong>으로 남는 합법적 고수익 구조입니다.
              </p>
              
              <table style="width: 100%; font-size: 12px; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #d1fae5;">
                <tr style="background: #065f46; color: #ffffff;">
                  <th style="padding: 8px; text-align: left;">구분</th>
                  <th style="padding: 8px; text-align: right;">${seatsNum}명 플랜 산출</th>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px; color: #334155;">학부모 교재비 수납 (인당 12만 원)</td>
                  <td style="padding: 8px; text-align: right; font-weight: 700;">+ ${parentTotal.toLocaleString()}원</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9; color: #dc2626;">
                  <td style="padding: 8px;">본사 도매 공급가 (권당 3,900원)</td>
                  <td style="padding: 8px; text-align: right; font-weight: 700;">- ${totalSupply.toLocaleString()}원</td>
                </tr>
                <tr style="background: #d1fae5; color: #064e3b; font-weight: 900; font-size: 13px;">
                  <td style="padding: 10px 8px;">🎉 학원 순수익 (교재비 차액)</td>
                  <td style="padding: 10px 8px; text-align: right; color: #047857;">+ ${academyProfit.toLocaleString()}원</td>
                </tr>
                <tr style="color: #64748b; font-size: 11px;">
                  <td style="padding: 6px 8px;">학원 운영비 부담</td>
                  <td style="padding: 6px 8px; text-align: right; font-weight: 700; color: #4f46e5;">0원 (학부모 수납 충당)</td>
                </tr>
              </table>

              <div style="font-size: 11px; color: #065f46; margin-top: 10px; line-height: 1.5;">
                📌 <strong>산정 근거</strong>: 학원법 제15조에 의거해 수강료 외에 '교재비 및 모의고사비(기타경비)'로 분리 수납하는 표준 범위(10주 10~12만 원)이며, 실물 주간지 10권 + 모의고사 10회 + 카카오 알림톡 성적표가 포함되어 학부모 저항 없이 합리적으로 수용됩니다.
              </div>
            </div>

            <!-- 견적서 열람 버튼 링크 -->
            <div style="text-align: center; margin: 24px 0 16px 0;">
              <a href="${estimateUrl}" target="_blank" style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 900; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
                📄 내 학원 공식 견적서 즉시 열람 및 인쇄 / PDF 저장하기 ➔
              </a>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="${rehearsalUrl}" target="_blank" style="font-size: 12px; color: #4f46e5; text-decoration: underline; font-weight: 700;">
                ⚡ 주간지 운영 4단계 실전 리허설 체험하기 (새창)
              </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; line-height: 1.5;">
              <strong>■ 발주 및 개시 안내</strong><br>
              견적서 확인 후 담당 교육 매니저가 기재해 주신 연락처(${data.phone})로 유선 안내 및 수강생 엑셀 등록 안내를 도와드립니다.<br>
              궁금하신 사항은 본 메일로 회신해 주시거나 고객센터(02-555-2028)로 문의해 주시기 바랍니다.
            </div>
          </div>

          <!-- 푸터 -->
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 11px; color: #94a3b8; text-align: center;">
            © 갓통과 B2B 교육사업본부 • 서울시 강남구 테헤란로 과학빌딩 • 문의: 02-555-2028 / godtonggwa@gmail.com
          </div>
        </div>
      `;

      const clientTextBody = `
[공식 견적서] ${data.academy} (${data.teacher} 선생님) 2028 통합과학 주간지 공급 견적서

신청해 주신 조건에 따른 맞춤 도매 견적 내역입니다.

■ 견적 요약
- 학원명: ${data.academy} (${data.teacher} 쌤)
- 공급 패키지: 2028 통합과학 10주 주간지 풀패키지 (화이트레이블 전자책 + Fit 20 모의고사 + OMR 채점 + 학부모 성적표)
- 수강생 규모: ${seatsNum}명 플랜 (${weeks}주 완성, 총 ${seatsNum * weeks}권)
- 권당 도매 공급가: 3,900원 (초특가)
- 학생 1인당 10주 공급가: ${perStudentSupply.toLocaleString()}원
- 총 견적 공급 합계: ₩${totalSupply.toLocaleString()} (VAT포함)

■ 학원 순수익(ROI) 분석 (학부모 교재비 수납 충당)
- 학부모 교재비 수납 (인당 12만 원): + ${parentTotal.toLocaleString()}원
- 본사 도매 공급가 (권당 3,900원): - ${totalSupply.toLocaleString()}원
- 학원 순수익 (교재비 차액): + ${academyProfit.toLocaleString()}원
- 학원 운영비 부담: 0원 (학부모 수납 충당)

■ 공식 견적서 열람 및 PDF 저장 링크:
${estimateUrl}

■ 주간지 운영 실전 리허설 체험하기:
${rehearsalUrl}

문의: 02-555-2028 / godtonggwa@gmail.com
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

function doGet(e) {
  return ContentService.createTextOutput("갓통과 B2B Webhook 서버가 정상 작동 중입니다.");
}
