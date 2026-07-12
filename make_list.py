import os
import json
import glob

# 설정: 경로를 본인의 환경에 맞게 수정해야 할 수도 있습니다.
# 현재 스크립트가 프로젝트 최상위에 있고, public 폴더가 같은 위치에 있다고 가정합니다.
QUIZ_DIR_PATH = 'public/data/quizzes'
OUTPUT_FILE_PATH = 'public/data/quiz_list.json'

def generate_quiz_list():
    print(f"🔍 '{QUIZ_DIR_PATH}' 폴더에서 퀴즈 파일 검색 중...")

    # 1. 대상 폴더가 있는지 확인
    if not os.path.exists(QUIZ_DIR_PATH):
        print(f"❌ 오류: '{QUIZ_DIR_PATH}' 폴더를 찾을 수 없습니다.")
        return

    # 2. 모든 .json 파일 찾기 (glob 사용)
    # 윈도우 환경에서도 경로 처리를 위해 os.path.join 사용
    search_pattern = os.path.join(QUIZ_DIR_PATH, '*.json')
    files = glob.glob(search_pattern)
    
    if not files:
        print("⚠️ 경고: .json 파일을 하나도 찾지 못했습니다.")
        return

    # 3. 웹에서 사용할 경로로 변환
    # 예: 'public\data\quizzes\unit1.json' -> 'data/quizzes/unit1.json'
    web_paths = []
    for f in files:
        # 역슬래시(\)를 슬래시(/)로 변경
        normalized_path = f.replace('\\', '/')
        
        # 'public/' 부분 제거 (웹 루트 기준 경로로 만들기 위해)
        if normalized_path.startswith('public/'):
            web_path = normalized_path[7:] # 'public/' 7글자 제거
        else:
            web_path = normalized_path

        # 앞에 ./ 붙여주기 (안전한 상대 경로를 위해)
        if not web_path.startswith('./'):
             web_path = './' + web_path
             
        web_paths.append(web_path)
        print(f"  - 발견: {web_path}")

    # 4. quiz_list.json 파일로 저장
    try:
        with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as f:
            json.dump(web_paths, f, indent=2, ensure_ascii=False)
        
        print("-" * 30)
        print(f"✅ 총 {len(web_paths)}개의 파일이 '{OUTPUT_FILE_PATH}'에 등록되었습니다.")
        print("이제 'firebase deploy'를 실행하여 변경 사항을 적용하세요!")
        
    except Exception as e:
        print(f"❌ 파일 저장 중 오류 발생: {e}")

if __name__ == "__main__":
    generate_quiz_list()