
import * as Mock from 'mockjs'

type ListsType = {
  [s: string]: any[]
}

// 表格数据源类型
export type dataType = {
  key: string;
  ID: string;
  name: string;
  phone: string;
  createNum: string;
  time: string;
  increase: boolean;
}
function administrator():dataType[] {
  return Mock.mock({
    'list|25': [{
      id: '@increment(1)',
      ID: '@natural(300,1000)',
      name: '@ctitle()',
      createNum: '@integer(10,500)',
      phone: '@natural(30,100)',
      time: '@date()',
      increase: '@boolean'
    }]
  }).list
}

/** 总数据源 */
export const lists: ListsType = {
  administratorList: administrator()
}

/**
 * 添加数据源
 * @param {string} key 修改的属性
 * @param {object} val 属性值
 * @param {boolean} replace 是否替换属性值 不传则拼接
 */
export const addLists = (key: string, val: any, replace: boolean = false) => {
  // 生成id
  val.id = lists[key].length + 1
  val.key = lists[key].length + 1
  const date = new Date()
  val.createTime = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  lists[key] = replace ? [val] : lists[key].concat([val])
}

/**
 * 删除数据源
 * @param {string} key 修改的属性
 * @param {any[]} ids 属性值
 */
export const deleteLists = (key: string, ids: any[]) => {
  const copy = JSON.parse(JSON.stringify(lists[key]))

  copy.forEach((item: any, index: number) => ids.indexOf(item.id) !== -1 ? lists[key].splice(index, 1) : '')
}

/**
 * 修改数据源
 * @param {string} key 修改的属性
 * @param {object} val 属性值
 * @param {boolean} replace 是否替换属性值 不传则拼接
 */
export const updateLists = (key: string, val: any) => {
  //  获取下标
  const index = lists[key].map(item => item.id).indexOf(val.id)

  lists[key][index] = { ...lists[key][index], ...val }
}