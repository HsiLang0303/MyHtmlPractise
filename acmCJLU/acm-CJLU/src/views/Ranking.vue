<template>
  <div class="w">
    <el-table :data="RnakList" style="width: 100%">
        <el-table-column prop="nickname" label="名称" align="left"/>
        <el-table-column prop="solvedCount" label="解决数量"  width=auto align="left" />
        <el-table-column prop="totalSubmitProblemCount" label="总提交数" width=auto align="center" />

      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="current" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
          :total="total"  layout="total, sizes, prev, pager, next, jumper,value" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRankList } from '../api/RankingApis'
import { ElMessage } from 'element-plus'
// import { type RankRequestv0 } from '../api/RankingApis'

const RnakList = ref([])

const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
onMounted(() => {
  fetchRankList()
})
// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchRankList()
}

// 处理页码变化
const handleCurrentChange = (val: number) => {
  current.value = val
  fetchRankList()
}
// 获取题目列表
const fetchRankList = async () => {
  try {
    const res = await getRankList({
      current: current.value,
      pageSize: pageSize.value
    })
    if(res.code === 20000) {
      RnakList.value = res.data.records
      total.value = parseInt(res.data.total)
    }
  } catch (error) {
    ElMessage.error('获取排名列表失败：' + error)
    console.error('获取排名列表失败：', error)
  }
}
</script>
<style lang="less" scoped>
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
