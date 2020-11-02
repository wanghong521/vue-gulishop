import Mock from 'mockjs'
import banner from '@/mock/banner'
import floor from '@/mock/floor'

// 通过Mock.mock去模拟接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})