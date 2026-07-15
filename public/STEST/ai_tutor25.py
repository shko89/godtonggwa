import json
import os
import google.generativeai as genai  # OpenAI 대신 Google 라이브러리 사용
import pytesseract
from pdf2image import convert_from_path
from PIL import Image

# ==========================================
# [설정] API 키 및 Tesseract 경로 설정
# ==========================================

# 1. Gemini API 키 입력 (여기에 AIza로 시작하는 키를 넣으세요)
GOOGLE_API_KEY = "AIzaSyCo5JomXHpiW-zW1EEBbPsI_iBWU67SXXo"
genai.configure(api_key=GOOGLE_API_KEY)

# 2. Tesseract 경로 (윈도우의 경우 경로 확인 필수)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# (Poppler 경로는 pdf2image 함수 내부에서 처리하거나 시스템 PATH에 있어야 함)

# ==========================================
# [Part 1] 무료 OCR: PDF에서 텍스트 추출 (기존과 동일)
# ==========================================
def extract_text_free(pdf_path):
    print(f"📖 [OCR] '{pdf_path}' 파일을 읽는 중...")
    try:
        # 윈도우에서 Poppler 경로가 필요한 경우, 아래 poppler_path에 bin 폴더 경로를 넣으세요.
        # 예: poppler_path = r'C:\poppler\Release-...\bin'
        poppler_path = r'C:\poppler-25.12.0\Library\bin' 
        
        pages = convert_from_path(pdf_path, poppler_path=poppler_path)
    except Exception as e:
        print(f"⚠️ PDF 변환 오류: {e}")
        return ""

    full_text = ""
    print(f"📄 총 {len(pages)}페이지 변환 완료. 텍스트 추출 시작...")
    
    for i, page in enumerate(pages):
        width, height = page.size
        # 페이지 반으로 가르기 (2단 구성 대응)
        left_img = page.crop((0, 0, width // 2, height))
        right_img = page.crop((width // 2, 0, width, height))
        
        # 한국어+영어 OCR
        text_left = pytesseract.image_to_string(left_img, lang='kor+eng')
        text_right = pytesseract.image_to_string(right_img, lang='kor+eng')
        
        full_text += f"\n--- Page {i+1} Left ---\n{text_left}\n--- Page {i+1} Right ---\n{text_right}"
        
    print("✅ 텍스트 추출 완료!")
    return full_text

# ==========================================
# [Part 2] AI 선생님: Gemini로 해설 생성
# ==========================================
def generate_handwriting_explanation(exam_text, exam_title="2026학년도 예시문항"):
    print("🤖 [Gemini] 해설을 작성하고 있습니다... (무료 모드)")

    # [시스템 프롬프트]
    system_instruction = """
    너는 고등학생들에게 통합과학을 가르치는 '친절하고 명쾌한 1타 강사'야. 
    학생이 푼 시험지 텍스트를 줄 테니, **모든 문항(1번~25번)**을 풀고 해설을 작성해줘.

    [말투 가이드]
    1. **친근한 반말(구어체)**: 과외 선생님처럼. (예: "이건 A가 정답이야!", "그래프 기울기를 잘 봐!", "헷갈렸지?")
    2. **격려와 공감**: 학생을 응원해줘.

    [🚨 이미지/자료 누락 시 대응]
    너는 지금 텍스트만 볼 수 있어.
    1. 그림/그래프가 필수라면 억지로 지어내지 말고 솔직하게 말해.
    2. 해설 앞에 **(👀 그림 확인 필요!)** 라고 적고, 텍스트로 알 수 있는 힌트만 제공해.

    [HTML 스타일링 (필수)]
    1. **강조**: 핵심은 `<span class="text-red-500">...</span>` 또는 `<b>...</b>` 사용.
    2. **줄바꿈**: 문단 나눌 땐 `<br>`.

    [출력 데이터 형식 (JSON)]
    반드시 아래 JSON 포맷을 지켜줘.
    {
      "examInfo": { "title": "시험 제목", "totalQuestions": 25 },
      "explanations": [
        { "no": 1, "topic": "단원명", "content": "해설 내용" }
      ]
    }
    """

    # Gemini 모델 설정
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",        # 👈 "gemini-pro"로 변경!
        system_instruction=system_instruction,
        generation_config={"response_mime_type": "application/json"}
    )
    user_prompt = f"시험 제목: {exam_title}\n\n[시험지 텍스트 데이터]\n{exam_text}"

    try:
        response = model.generate_content(user_prompt)
        print(response.text)
        return json.loads(response.text)

    except Exception as e:
        print(f"❌ Gemini 호출 중 오류 발생: {e}")
        return {"examInfo": {"title": exam_title, "totalQuestions": 25}, "explanations": []}

# ==========================================
# [Main] 실행 흐름
# ==========================================
if __name__ == "__main__":
    pdf_filename = "exam02.pdf" # PDF 파일명 확인
    
    # 1. OCR 수행
    if os.path.exists(pdf_filename):
        ocr_text = extract_text_free(pdf_filename)
    else:
        print(f"⚠️ '{pdf_filename}' 파일이 없어 테스트 텍스트를 사용합니다.")
        ocr_text = "1. 다음은 신소재 개발에 대한 학생들의 대화이다..."

    # 2. AI 해설 생성
    if ocr_text.strip():
        final_json_data = generate_handwriting_explanation(ocr_text)
        
        # 3. JS 파일로 저장
        js_content = f"window.globalExamData = {json.dumps(final_json_data, ensure_ascii=False, indent=2)};"
        
        # 1. 이번에 작업할 시험 ID를 정합니다 (예: exam_01, exam_02...)
        exam_id = "exam_01" 

        # 2. 파일 이름에 ID를 포함시킵니다.
        output_filename = f"exam_data_{exam_id}.js"
        
        with open(output_filename, "w", encoding="utf-8") as f:
            f.write(js_content)
            
        print(f"🎉 성공! '{output_filename}' 파일이 생성되었습니다.")
        print("👉 이제 'explanation.html' 파일을 열어서 해설을 확인해보세요!")
    else:
        print("❌ 텍스트 추출 실패.")