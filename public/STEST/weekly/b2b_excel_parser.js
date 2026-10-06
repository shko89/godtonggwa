/**
 * 갓통과 B2B 강사용 수강생 엑셀/CSV 일괄 파서 (Student Batch Registration Parser)
 * 
 * 지원 형식:
 * 1. CSV / 텍스트 붙여넣기: "이수진, 010-1234-5678, 010-9876-5432"
 * 2. 탭 구분(Excel 복사/붙여넣기): "이수진\t010-1234-5678\t010-9876-5432"
 */

(function(exports) {
    'use strict';

    function cleanPhone(raw) {
        if (!raw) return '';
        const digits = String(raw).replace(/[^0-9]/g, '');
        if (digits.length === 11) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
        } else if (digits.length === 10) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return digits;
    }

    function extractLast4(phone) {
        const digits = String(phone).replace(/[^0-9]/g, '');
        return digits.length >= 4 ? digits.slice(-4) : digits;
    }

    function parseStudentRows(rawText, academyId) {
        if (!rawText || typeof rawText !== 'string') {
            return { success: false, students: [], errors: ['입력된 데이터가 비어 있습니다.'] };
        }

        const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const students = [];
        const errors = [];

        lines.forEach((line, idx) => {
            // 헤더 행 건너뛰기
            if (idx === 0 && (line.includes('이름') || line.includes('학생') || line.includes('연락처'))) {
                return;
            }

            // 쉼표 또는 탭 또는 세미콜론 분리
            const parts = line.split(/[,\t;]+/).map(p => p.trim());
            if (parts.length < 2) {
                errors.push(`[${idx + 1}행 오류] 이름과 학생 전화번호가 필요합니다: "${line}"`);
                return;
            }

            const name = parts[0];
            const rawStudentPhone = parts[1];
            const rawParentPhone = parts[2] || '';

            const studentPhone = cleanPhone(rawStudentPhone);
            const parentPhone = cleanPhone(rawParentPhone);
            const last4 = extractLast4(studentPhone);

            if (!name) {
                errors.push(`[${idx + 1}행 오류] 학생 이름이 누락되었습니다.`);
                return;
            }

            if (last4.length < 4) {
                errors.push(`[${idx + 1}행 오류] 전화번호가 유효하지 않습니다: "${rawStudentPhone}"`);
                return;
            }

            const studentDocId = `${academyId}_${last4}_${name}`;

            students.push({
                studentId: studentDocId,
                academyId: academyId,
                studentName: name,
                studentPhone: studentPhone,
                studentPhoneLast4: last4,
                parentPhone: parentPhone,
                registeredAt: new Date().toISOString()
            });
        });

        return {
            success: students.length > 0,
            totalRows: lines.length,
            parsedCount: students.length,
            students: students,
            errors: errors
        };
    }

    exports.parseStudentRows = parseStudentRows;
    exports.cleanPhone = cleanPhone;
    exports.extractLast4 = extractLast4;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.B2BExcelParser = {}));
