import os
import json
import glob

# 설정: 경로를 본인의 환경에 맞게 수정해야 할 수도 있습니다.
# 현재 스크립트가 프로젝트 최상위에 있다고 가정합니다.
QUIZ_LIST_PATH = 'public/data/quiz_list.json'
QUIZZES_DIR = 'public/data/quizzes'

def normalize_path(path):
    """경로 구분자(\ 또는 /)를 통일하고 불필요한 앞부분을 제거합니다."""
    # 윈도우의 역슬래시를 슬래시로 변경
    path = path.replace('\\', '/')
    # 'public/'이 있다면 제거 (quiz_list.json에는 보통 data/... 로 저장되므로)
    if path.startswith('public/'):
        path = path[7:]
    return path

def check_files():
    print(f"🔍 파일 검사 시작...\n")

    # 1. quiz_list.json 읽기
    if not os.path.exists(QUIZ_LIST_PATH):
        print(f"❌ 오류: '{QUIZ_LIST_PATH}' 파일을 찾을 수 없습니다.")
        return

    try:
        with open(QUIZ_LIST_PATH, 'r', encoding='utf-8') as f:
            json_list = json.load(f)
            # 리스트의 모든 경로를 표준화
            json_files = set(normalize_path(p) for p in json_list)
            print(f"✅ quiz_list.json에서 {len(json_files)}개의 항목을 읽었습니다.")
    except json.JSONDecodeError:
        print(f"❌ 오류: '{QUIZ_LIST_PATH}' 파일이 올바른 JSON 형식이 아닙니다.")
        return

    # 2. 실제 폴더 스캔하기
    if not os.path.exists(QUIZZES_DIR):
        print(f"❌ 오류: '{QUIZZES_DIR}' 폴더를 찾을 수 없습니다.")
        return

    # glob으로 .json 파일만 찾음
    real_files_paths = glob.glob(os.path.join(QUIZZES_DIR, '*.json'))
    # 경로 표준화 (public/ 제거 등)
    real_files = set(normalize_path(p) for p in real_files_paths)
    print(f"✅ '{QUIZZES_DIR}' 폴더에서 {len(real_files)}개의 파일을 발견했습니다.\n")

    print("-" * 40)
    
    # 3. 비교 분석
    
    # A. 리스트에는 있는데 실제로는 없는 파일 (404 에러의 주범!)
    missing_files = json_files - real_files
    if missing_files:
        print("🚨 [경고] 리스트에는 있지만 폴더에 없는 파일 (삭제 필요):")
        for f in missing_files:
            print(f"  - {f}")
    else:
        print("👍 리스트에 있는 모든 파일이 폴더에 존재합니다.")

    print("-" * 40)

    # B. 폴더에는 있는데 리스트에 없는 파일 (누락된 문제)
    unlisted_files = real_files - json_files
    if unlisted_files:
        print("❓ [알림] 폴더에는 있지만 리스트에 없는 파일 (추가 필요):")
        for f in unlisted_files:
            print(f"  + {f}")
    else:
        print("👍 폴더의 모든 파일이 리스트에 등록되어 있습니다.")
        
    print("-" * 40)

    if not missing_files and not unlisted_files:
        print("\n🎉 완벽합니다! 파일 목록이 정확히 일치합니다.")
    else:
        print("\n🔧 위의 내용을 참고하여 'quiz_list.json'을 수정해주세요.")

if __name__ == "__main__":
    check_files()