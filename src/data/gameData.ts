import { LevelData } from '../types';

// 자음 (14개)
export const consonants = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 
  'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 모음 (10개)
export const vowels = [
  'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 
  'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'
];

// 낱말 (50개 이상) - 카테고리별 분류
export const words = {
  animals: [
    '강아지', '고양이', '토끼', '사자', '호랑이', 
    '코끼리', '기린', '원숭이', '돼지', '소'
  ],
  fruits: [
    '사과', '바나나', '포도', '딸기', '수박', 
    '참외', '배', '감', '귤', '복숭아'
  ],
  colors: [
    '빨강', '파랑', '노랑', '초록', '하양', 
    '검정', '주황', '분홍', '보라', '회색'
  ],
  family: [
    '엄마', '아빠', '형', '누나', '오빠', 
    '언니', '동생', '할머니', '할아버지', '가족'
  ],
  school: [
    '학교', '선생님', '친구', '교실', '책상', 
    '의자', '칠판', '연필', '공책', '가방'
  ],
  nature: [
    '하늘', '구름', '별', '달', '해', 
    '바다', '산', '강', '나무', '꽃'
  ],
  food: [
    '밥', '빵', '우유', '김치', '국', 
    '떡', '과자', '사탕', '라면', '햄버거'
  ]
};

// 모든 낱말을 하나의 배열로
export const allWords = Object.values(words).flat();

// 문장 (20개 이상)
export const sentences = [
  '나는 학생이에요',
  '사과가 맛있어요',
  '하늘이 파래요',
  '엄마를 사랑해요',
  '친구와 놀아요',
  '책을 읽어요',
  '학교에 가요',
  '밥을 먹어요',
  '물을 마셔요',
  '노래를 불러요',
  '그림을 그려요',
  '공부를 해요',
  '운동을 해요',
  '텔레비전을 봐요',
  '음악을 들어요',
  '강아지가 귀여워요',
  '꽃이 예뻐요',
  '날씨가 좋아요',
  '기분이 좋아요',
  '오늘은 즐거워요',
  '내일 또 만나요',
  '안녕하세요',
  '감사합니다',
  '미안해요',
  '사랑해요'
];

// 레벨별 데이터
export const levelData: Record<number, LevelData> = {
  1: {
    level: 1,
    name: '자음·모음',
    description: '한글의 기본! 자음과 모음을 익혀요',
    contents: [...consonants, ...vowels],
    spawnInterval: 2000, // 2초
    displayTime: 3000 // 3초
  },
  2: {
    level: 2,
    name: '낱말',
    description: '재미있는 낱말을 배워요',
    contents: allWords,
    spawnInterval: 1700, // 1.7초
    displayTime: 2500 // 2.5초
  },
  3: {
    level: 3,
    name: '문장',
    description: '문장을 읽고 이해해요',
    contents: sentences,
    spawnInterval: 1200, // 1.2초
    displayTime: 2000 // 2초
  }
};

// 점수 계산 상수
export const SCORE_CONFIG = {
  CORRECT_ANSWER: 10,
  WRONG_ANSWER: -5,
  COMBO_MULTIPLIER: 1.5, // 콤보 3회 이상부터 적용
  COMBO_THRESHOLD: 3,
  TIME_BONUS_PER_SECOND: 1 // 남은 시간 1초당 보너스
};

// 별점 기준
export const STAR_THRESHOLDS = {
  THREE_STARS: 100,
  TWO_STARS: 70,
  ONE_STAR: 40
};


