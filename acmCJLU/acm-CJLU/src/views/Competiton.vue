<template>
  <div class="contest-container">
    <!-- 上部分：搜索区域 -->
    <div class="search-section">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="比赛标题">
          <el-input v-model="searchForm.title" placeholder="请输入比赛标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间"
            format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 下部分：比赛列表展示区域 -->
    <div class="contest-list-section">
      <el-table :data="contestList" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="比赛标题" align="center" />
        <el-table-column prop="contestDescription" label="描述" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="encrypted" label="加密状态" align="center" width="100">
          <template #default="scope">
            {{ scope.row.encrypted === '1' ? '加密' : '公开' }}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" width="180" />
        <el-table-column prop="endTime" label="结束时间" align="center" width="180" />
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewContest(scope.row.contestId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="current" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
          :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>

    <!-- 密码验证弹窗 -->
    <div class="password-dialog" v-if="showPasswordDialog" @click.self="closeDialog">
      <div class="dialog-content">
        <h3>请输入准入密码</h3>
        <el-input v-model="verifyForm.password" type="password" placeholder="请输入密码" show-password />
        <el-button type="primary" @click="handleVerifyPassword" style="margin-top: 20px;">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getContestVOPage, verifyContestPassword } from '../api/ContestController'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const contestList = ref([])
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 添加新的响应式变量
const showPasswordDialog = ref(false)
const verifyForm = ref({
  contestId: 0,
  password: ''
})

// 搜索表单
const searchForm = reactive({
  title: '',
  startTime: '',
  endTime: ''
})

// 初始加载
onMounted(() => {
  fetchContestList()
})

// 获取比赛列表
const fetchContestList = async () => {
  loading.value = true
  try {
    const res = await getContestVOPage({
      title: searchForm.title || undefined,
      startTime: searchForm.startTime || undefined,
      endTime: searchForm.endTime || undefined,
      current: current.value,
      pageSize: pageSize.value
    })

    if (res.data.code === 20000) {
      contestList.value = res.data.data.records

      total.value = parseInt(res.data.data.total)
    } else {
      ElMessage.error(res.data.message || '获取比赛列表失败')
    }
  } catch (error) {
    ElMessage.error('获取比赛列表失败：' + error)
    console.error('获取比赛列表失败：', error)
  } finally {
    loading.value = false
  }
}

// 处理搜索
const handleSearch = () => {
  current.value = 1 // 搜索时重置为第一页
  fetchContestList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.title = ''
  searchForm.startTime = ''
  searchForm.endTime = ''
  current.value = 1
  fetchContestList()
}

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchContestList()
}

// 处理页码变化
const handleCurrentChange = (val: number) => {
  current.value = val
  fetchContestList()
}

const viewContest = (contestId: number) => {
  verifyForm.value.contestId = contestId
  verifyForm.value.password = ''
  showPasswordDialog.value = true
}

// 添加新函数
const closeDialog = () => {
  showPasswordDialog.value = false
}

const handleVerifyPassword = async () => {
  try {
    const res = await verifyContestPassword(verifyForm.value)
    if (res.data.code === 20000) {
      showPasswordDialog.value = false
      router.push(`/competitiondetail/${verifyForm.value.contestId}`)
    } else {
      ElMessage.error('密码错误')
    }
  } catch (error) {
    ElMessage.error('验证失败：' + error)
  }
}


</script>

<style lang="less" scoped>
.password-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .dialog-content {
    background-color: white;
    padding:30px;
    border-radius: 8px;
    width: 40%;
    text-align: center;

    h3 {
      margin-bottom: 20px;
    }
  }
}
.contest-container {
  padding: 20px;
  margin: 0px 100px 0 100px;

  .search-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .search-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .el-form-item {
        margin-right: 20px;
        margin-bottom: 10px;
      }
    }
  }

  .contest-list-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .el-table {
      margin: 0 auto;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>