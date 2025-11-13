// 在庫データ
export const inventoryData = {
  'トマト': { stock: 5.2, threshold: 10.0, unit: 'kg', category: '野菜' },
  '玉ねぎ': { stock: 25.0, threshold: 15.0, unit: 'kg', category: '野菜' },
  'にんじん': { stock: 18.0, threshold: 10.0, unit: 'kg', category: '野菜' },
  'きゅうり': { stock: 8.5, threshold: 12.0, unit: 'kg', category: '野菜' },
  '醤油': { stock: 8.0, threshold: 5.0, unit: 'L', category: '調味料' },
  'サラダ油': { stock: 10.0, threshold: 6.0, unit: 'L', category: '調味料' },
  'みりん': { stock: 3.2, threshold: 4.0, unit: 'L', category: '調味料' },
  '鶏もも肉': { stock: 20.0, threshold: 8.0, unit: 'kg', category: '肉類' },
  '豚ひき肉': { stock: 12.0, threshold: 5.0, unit: 'kg', category: '肉類' },
  '牛肉': { stock: 6.8, threshold: 10.0, unit: 'kg', category: '肉類' }
}

// 今日の仕込みデータ
export const recipesData = [
  {
    id: 1,
    name: 'トマトソースパスタ',
    servings: 30,
    prepTime: 45,
    completed: false,
    ingredients: [
      { name: 'トマト', required: 6.0 },
      { name: '玉ねぎ', required: 2.5 },
      { name: 'サラダ油', required: 0.5 }
    ]
  },
  {
    id: 2,
    name: 'チキンカレー',
    servings: 25,
    prepTime: 60,
    completed: false,
    ingredients: [
      { name: '鶏もも肉', required: 5.0 },
      { name: '玉ねぎ', required: 3.0 },
      { name: 'にんじん', required: 2.0 }
    ]
  },
  {
    id: 3,
    name: '生姜焼き',
    servings: 20,
    prepTime: 30,
    completed: false,
    ingredients: [
      { name: '豚ひき肉', required: 4.0 },
      { name: '玉ねぎ', required: 1.5 },
      { name: '醤油', required: 0.4 }
    ]
  }
]

// マスター仕込みレシピ
export const masterRecipesData = [
  { id: 'pasta', name: 'トマトソースパスタ', prepTime: 45 },
  { id: 'curry', name: 'チキンカレー', prepTime: 60 },
  { id: 'ginger', name: '生姜焼き', prepTime: 30 },
  { id: 'hamburg', name: 'ハンバーグ', prepTime: 50 },
  { id: 'fish', name: '魚の煮付け', prepTime: 40 },
  { id: 'stir-fry', name: '野菜炒め', prepTime: 25 },
  { id: 'tempura', name: '天ぷら', prepTime: 45 },
  { id: 'soup', name: '豚汁', prepTime: 35 },
  { id: 'salad', name: 'サラダ', prepTime: 20 },
  { id: 'rice', name: '炊き込みご飯', prepTime: 30 },
  { id: 'grilled', name: '焼き魚', prepTime: 25 },
  { id: 'stew', name: 'シチュー', prepTime: 60 },
  { id: 'noodles', name: 'うどん', prepTime: 30 },
  { id: 'fried', name: '唐揚げ', prepTime: 40 },
  { id: 'omelet', name: 'オムレツ', prepTime: 20 }
]

// ディナーレシピマスター（1人前あたりの材料使用量）
export const dinnerRecipesData = [
  {
    id: 'pasta',
    name: 'トマトソースパスタ',
    ingredients: [
      { name: 'トマト', perServing: 0.2 },
      { name: '玉ねぎ', perServing: 0.08 },
      { name: 'サラダ油', perServing: 0.015 }
    ]
  },
  {
    id: 'curry',
    name: 'チキンカレー',
    ingredients: [
      { name: '鶏もも肉', perServing: 0.2 },
      { name: '玉ねぎ', perServing: 0.12 },
      { name: 'にんじん', perServing: 0.08 }
    ]
  },
  {
    id: 'ginger',
    name: '生姜焼き',
    ingredients: [
      { name: '豚ひき肉', perServing: 0.2 },
      { name: '玉ねぎ', perServing: 0.075 },
      { name: '醤油', perServing: 0.02 }
    ]
  },
  {
    id: 'hamburg',
    name: 'ハンバーグ',
    ingredients: [
      { name: '豚ひき肉', perServing: 0.15 },
      { name: '牛肉', perServing: 0.1 },
      { name: '玉ねぎ', perServing: 0.08 }
    ]
  },
  {
    id: 'fish',
    name: '魚の煮付け',
    ingredients: [
      { name: '醤油', perServing: 0.03 },
      { name: 'みりん', perServing: 0.025 }
    ]
  },
  {
    id: 'stir-fry',
    name: '野菜炒め',
    ingredients: [
      { name: 'にんじん', perServing: 0.05 },
      { name: 'きゅうり', perServing: 0.04 },
      { name: 'サラダ油', perServing: 0.01 },
      { name: '醤油', perServing: 0.015 }
    ]
  },
  {
    id: 'tempura',
    name: '天ぷら',
    ingredients: [
      { name: 'サラダ油', perServing: 0.15 },
      { name: 'にんじん', perServing: 0.03 }
    ]
  },
  {
    id: 'soup',
    name: '豚汁',
    ingredients: [
      { name: '豚ひき肉', perServing: 0.08 },
      { name: 'にんじん', perServing: 0.05 },
      { name: '玉ねぎ', perServing: 0.05 },
      { name: 'みりん', perServing: 0.02 }
    ]
  },
  {
    id: 'salad',
    name: 'サラダ',
    ingredients: [
      { name: 'トマト', perServing: 0.08 },
      { name: 'きゅうり', perServing: 0.06 },
      { name: 'サラダ油', perServing: 0.01 }
    ]
  }
]