type QsnDiffVariants = 'Легкий' | 'Средний' | 'Сложный'

type QsnCategoriesVariants = 'Знать' | 'Уметь' | 'Владеть'

type QsnTypeVariants =
  | 'Множественный выбор'
  | 'Одиночный выбор'
  | 'Да / нет'
  | 'Точный ответ'
  | 'SQL-Запрос (чтение)'
  | 'SQL-Запрос (определение данных)'
  | 'SQL-Запрос (модификация данных)'
  | 'MongoDB (чтение)'
  | 'Neo4j (чтение)'

export const QuestionDifficulties: {[key: number]: QsnDiffVariants} = {
  0: 'Легкий',
  1: 'Средний',
  2: 'Сложный',
}

export const QuestionCategories: {[key: number]: QsnCategoriesVariants} = {
  0: 'Знать',
  1: 'Уметь',
  2: 'Владеть',
}

export const QuestionTypes: {[key: number]: QsnTypeVariants} = {
  0: 'Множественный выбор',
  1: 'Одиночный выбор',
  2: 'Да / нет',
  3: 'Точный ответ',
  4: 'SQL-Запрос (чтение)',
  5: 'SQL-Запрос (определение данных)',
  6: 'SQL-Запрос (модификация данных)',
  7: 'MongoDB (чтение)',
  8: 'Neo4j (чтение)',
}
