<template>
  <div class="w">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="sid" label="SID" width="100" />
      <el-table-column prop="pid" label="PID" width="100">
        <template #default="scope">
          <span style="color: #ff00ff">{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="Username" width="150">
        <template #default="scope">
          <span style="color: #ff00ff">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="judge" label="Judge" width="200">
        <template #default="scope">
          <span :style="getJudgeStyle(scope.row.judge)">
            {{ scope.row.judge }}
            <span v-if="scope.row.score" class="score-tag">{{ scope.row.score }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Time(ms)" width="100" />
      <el-table-column prop="memory" label="Memory(KB)" width="120" />
      <el-table-column prop="language" label="Language" width="120" />
      <el-table-column prop="submitTime" label="Submit Time" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    sid: '619138',
    pid: '4308',
    username: '2300303215',
    judge: 'Wrong Answer',
    time: 17,
    memory: 2960,
    language: 'Python 3',
    submitTime: '2025-04-18 17:47:06'
  },
  {
    sid: '619137',
    pid: '2936',
    username: '24H034160201',
    judge: 'Accepted',
    score: '78%',
    time: 573,
    memory: 46244,
    language: 'Java',
    submitTime: '2025-04-18 17:44:22'
  },
  {
    sid: '619136',
    pid: '3348',
    username: '2300303204',
    judge: 'Accepted',
    score: '98%',
    time: 1,
    memory: 256,
    language: 'C++ 11',
    submitTime: '2025-04-18 16:56:42'
  },
  {
    sid: '619135',
    pid: '3348',
    username: '2300303204',
    judge: 'Wrong Answer',
    time: 1,
    memory: 256,
    language: 'C++ 11',
    submitTime: '2025-04-18 16:51:04'
  },
  {
    sid: '619134',
    pid: '3348',
    username: '2300303204',
    judge: 'Compile Error',
    time: 0,
    memory: 0,
    language: 'C',
    submitTime: '2025-04-18 16:47:25'
  },
  {
    sid: '619133',
    pid: '3348',
    username: '2300303204',
    judge: 'Wrong Answer',
    time: 12,
    memory: 2972,
    language: 'Python 3',
    submitTime: '2025-04-18 16:38:17'
  },
  {
    sid: '619132',
    pid: '3348',
    username: '2300303204',
    judge: 'Wrong Answer',
    time: 15,
    memory: 2916,
    language: 'Python 3',
    submitTime: '2025-04-18 16:29:06'
  },
  {
    sid: '619131',
    pid: '2936',
    username: '24H034160139',
    judge: 'Accepted',
    score: '94%',
    time: 562,
    memory: 40124,
    language: 'Java',
    submitTime: '2025-04-18 16:26:10'
  },
  {
    sid: '619130',
    pid: '3348',
    username: '2300303204',
    judge: 'Wrong Answer',
    time: 12,
    memory: 2912,
    language: 'Python 3',
    submitTime: '2025-04-18 16:25:55'
  },
  {
    sid: '619129',
    pid: '2936',
    username: '24H034160139',
    judge: 'Compile Error',
    time: 0,
    memory: 0,
    language: 'Java',
    submitTime: '2025-04-18 16:21:13'
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const getJudgeStyle = (judge: string) => {
  switch (judge) {
    case 'Accepted':
      return { color: '#ff0000' }
    case 'Wrong Answer':
      return { color: '#00ff00' }
    case 'Compile Error':
      return { color: '#9933ff' }
    default:
      return {}
  }
}
</script>

<style lang="less" scoped>
.w {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.score-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 6px;
  background-color: #fff3e0;
  border-radius: 4px;
  font-size: 12px;
  color: #ff9800;
}
</style>
