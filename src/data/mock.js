// 前端 Demo 用的 Mock 数据（后端接口未接入前，页面渲染全部从这里取）

export const stages = [
  { id: 1, name: '诱敌深入', order: 1, summary: '华东野战军主力东移，示形于敌，诱使整编 74 师脱离重兵集团。' },
  { id: 2, name: '穿插分割', order: 2, summary: '抓住战机，以一部兵力楔入敌阵，割裂 74 师与两翼联系。' },
  { id: 3, name: '围歼 74 师', order: 3, summary: '集中优势兵力，将 74 师压缩包围于孟良崮一带并发起总攻。' },
  { id: 4, name: '战后意义', order: 4, summary: '全歼整编 74 师，扭转华东战局，彰显沂蒙精神。' }
]

export const units = [
  { id: 1, short: '华野', name: '华东野战军', faction: 'red', type: '主力', commander: '陈毅、粟裕', desc: '华东野战军，简称华野，是解放战争时期我军主力部队之一。' },
  { id: 2, short: '1纵', name: '华野第1纵队', faction: 'red', type: '主攻', commander: '叶飞', desc: '孟良崮战役主攻部队之一，担任楔入割裂任务。' },
  { id: 3, short: '4纵', name: '华野第4纵队', faction: 'red', type: '主攻', commander: '陶勇', desc: '孟良崮战役主攻部队之一。' },
  { id: 4, short: '6纵', name: '华野第6纵队', faction: 'red', type: '主攻', commander: '王必成', desc: '孟良崮战役主攻部队之一，切断 74 师退路。' },
  { id: 5, short: '8纵', name: '华野第8纵队', faction: 'red', type: '主攻', commander: '王建安', desc: '孟良崮战役主攻部队之一，担任楔入割裂任务。' },
  { id: 6, short: '9纵', name: '华野第9纵队', faction: 'red', type: '主攻', commander: '许世友', desc: '孟良崮战役主攻部队之一，从北面发起攻击。' },
  { id: 7, short: '阻援', name: '华野阻援部队', faction: 'red', type: '阻援', commander: '——', desc: '担任阻击援军任务，保障主攻集团围歼 74 师。' },
  { id: 8, short: '74师', name: '整编第七十四师', faction: 'blue', type: '美械师', commander: '张灵甫', desc: '国民党军五大主力之一，全美械装备，号称"王牌中的王牌"。' }
]

// 战役事件：既是沙盘上的事件点，也是底部时间轴的节点（x/y 为地图百分比坐标）
export const events = [
  { id: 1, stageId: 1, name: '敌军重点进攻山东', time: '1947-03 下旬', x: 72, y: 80, desc: '国民党军调集重兵，对山东解放区发动重点进攻，企图与华东野战军决战。' },
  { id: 2, stageId: 1, name: '74 师沿公路北上', time: '1947-05-11', x: 56, y: 56, desc: '整编 74 师沿沂蒙公路向坦埠方向进攻，逐步脱离两翼重兵集团，态势孤立突出。' },
  { id: 3, stageId: 1, name: '华野主力东移待机', time: '1947-05-11', x: 74, y: 60, desc: '华野主力东移，示形于敌，诱使 74 师继续冒进。' },
  { id: 4, stageId: 2, name: '定下围歼决心', time: '1947-05-13', x: 50, y: 20, desc: '陈毅、粟裕当机立断，抓住 74 师突出的有利战机，决心集中优势兵力予以围歼。' },
  { id: 5, stageId: 2, name: '楔入割裂', time: '1947-05-13 夜', x: 40, y: 52, desc: '华野第 1、8 纵队楔入敌阵，割裂 74 师与两翼之敌的联系。' },
  { id: 6, stageId: 3, name: '合围孟良崮', time: '1947-05-14', x: 50, y: 44, desc: '74 师被压缩包围于孟良崮及周边山地，进退无路。' },
  { id: 7, stageId: 3, name: '发起全线总攻', time: '1947-05-15', x: 44, y: 37, desc: '华野对孟良崮发起全线总攻，战斗进入白热化。' },
  { id: 8, stageId: 4, name: '全歼 74 师', time: '1947-05-16', x: 50, y: 44, desc: '全歼整编 74 师 3.2 万余人，击毙师长张灵甫，战役胜利结束，扭转华东战局。' }
]

export const persons = [
  { id: 1, name: '陈毅', role: '华东野战军司令员兼政委', faction: 'red', bio: '华东野战军司令员兼政治委员，孟良崮战役主要指挥者之一。' },
  { id: 2, name: '粟裕', role: '华东野战军副司令员', faction: 'red', bio: '华东野战军副司令员，孟良崮战役的主要军事指挥者。' },
  { id: 3, name: '张灵甫', role: '整编第七十四师师长', faction: 'blue', bio: '国民党整编第七十四师师长，孟良崮战役中被我军击毙。' },
  { id: 4, name: '沂蒙六姐妹', role: '支前群众', faction: 'red', bio: '孟良崮战役期间，沂蒙妇女踊跃支前，"沂蒙六姐妹"是其中的杰出代表。' }
]

export const relations = [
  { source: 1, target: 2, type: '指挥配合' },
  { source: 1, target: 3, type: '敌对' },
  { source: 2, target: 3, type: '敌对' },
  { source: 4, target: 2, type: '支援' }
]

export const courses = [
  { id: 1, title: '孟良崮战役始末', type: '微课', duration: '12 分钟', desc: '从战役背景到胜利意义，全面了解这场扭转华东战局的关键一战。' },
  { id: 2, title: '沂蒙精神的内涵', type: '图文', duration: '8 分钟', desc: '水乳交融、生死与共——沂蒙精神的时代价值解读。' },
  { id: 3, title: '决战孟良崮：关键决策', type: '微课', duration: '10 分钟', desc: '剖析陈毅、粟裕定下围歼决心的过程与军事智慧。' },
  { id: 4, title: '支前群众与沂蒙六姐妹', type: '图文', duration: '6 分钟', desc: '人民战争的伟力，从支前故事读懂党群血肉联系。' }
]

export const panoramaSpots = [
  { id: 1, name: '孟良崮战役纪念馆展厅', type: '室内' },
  { id: 2, name: '大崮顶战场遗址', type: '室外' },
  { id: 3, name: '沂蒙支前纪念馆', type: '室内' },
  { id: 4, name: '孟良崮主峰', type: '室外' }
]
