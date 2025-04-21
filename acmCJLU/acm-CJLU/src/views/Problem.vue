<template>
  <div class="w">
    <div class="problem-container">
      <el-table :data="problemList" style="width: 100%">
        <!-- <el-table-column prop="problemId" label="ID" align="left">
          <template #default="{ row }">
            <router-link :to="`/problemdetail/${row.problemId}`" class="problem-link">
              {{ row.problemId }}
            </router-link>
          </template>
        </el-table-column> -->

        <el-table-column prop="title" label="标题" width=auto align="left">
          <template #default="{ row }">
            <router-link :to="`/problemdetail/${row.problemId}`" class="problem-link">
              {{ row.title }}
            </router-link>
          </template>
        </el-table-column>

        <el-table-column prop="content" label="内容" width=auto align="center" />

        <el-table-column prop="difficulty.code" label="难度" width=auto align="center" />



        <!-- 管理员可见信息 -->
        <el-table-column v-if="isSuperAdmin" prop="submitCount" label="提交次数" width=auto align="center" />

        <el-table-column v-if="isSuperAdmin" prop="acceptCount" label="通过次数" width=auto align="center" />

        <el-table-column v-if="isSuperAdmin" prop="createTime" label="创建时间" width=auto align="center" />
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
          :total="total" layout="total, sizes, prev, pager, next, jumper,value" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { listProblemByPage } from '../api/ProblemController'

const userStore = useUserStore()
const isSuperAdmin = computed(() => userStore.userFrom.roleValueList.includes('super_admin'))

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const value = ref(1)
// 题目列表数据
const problemList = ref([])

// 获取题目列表
const fetchProblemList = async () => {
  try {
    const response = await listProblemByPage({
      current: currentPage.value,
      size: pageSize.value
    })
    if (response.code === 20000) {
      problemList.value = response.data.records
      total.value = parseInt(response.data.total)
    }
  } catch (error) {
    console.error('获取题目列表失败：', error)
  }
}

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchProblemList()
}

// 处理页码变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchProblemList()
}

// 获取难度标签类型
const getDifficultyType = (code: number) => {
  switch (code) {
    case 0:
      return 'info'
    case 1:
      return 'success'
    case 2:
      return 'warning'
    case 3:
      return 'danger'
    default:
      return 'info'
  }
}

onMounted(() => {
  fetchProblemList()
})
</script>

<style scoped lang="less">
.problem-container {
  padding: 20px;

  .problem-link {
    color: #409EFF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
