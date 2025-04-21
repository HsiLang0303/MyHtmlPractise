<template>
  <div class="w">
    <h2>常见问题</h2>
    <div class="question-section">
      <h3>问：各个评测状态的含义是什么？</h3>
      <el-table :data="judgeStatusData" border style="width: 100%">
        <el-table-column prop="status" label="状态" width="180">
          <template #default="scope">
            <span :style="getStatusStyle(scope.row.status)">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="meaning" label="含义" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const judgeStatusData = ref([
  {
    status: 'Pending',
    meaning: '评测队列中，暂时无法评测的提交实例，通常只需等待一分钟左右，你的提交实例就会被评测。'
  },
  {
    status: 'Running & Judge',
    meaning: '你的代码正在运行，并且正在被评测。'
  },
  {
    status: 'Compile Error',
    meaning: '你的代码无法通过编译，请检查为什么代码有语法错误。'
  },
  {
    status: 'Accepted',
    meaning: '你的程序是正确的！'
  },
  {
    status: 'Presentation Error',
    meaning: '你的输出格式与评测标准不完全一致，尽管你的答案可能是正确的。请检查你的输出格式，空格，空行等符合题目要求。'
  },
  {
    status: 'Wrong Answer',
    meaning: '你的程序未给出正确的结果的输出。'
  },
  {
    status: 'Runtime Error',
    meaning: '你的程序在运行过程中发生了错误，通常是由于数组越界，除零等原因。'
  },
  {
    status: 'Time Limit Exceeded',
    meaning: '你的程序运行时间超过了评测允许的时间。'
  },
  {
    status: 'Memory Limit Exceeded',
    meaning: '你的程序使用的内存超过了评测允许的内存。'
  },
  {
    status: 'Output Limit Exceeded',
    meaning: '你的程序输出了太多的信息，这通常是由于你的程序进入了一个无限循环。'
  },
  {
    status: 'System Error',
    meaning: '评测时发生了错误，这可能不是你的问题，请联系我们。'
  }
])

const getStatusStyle = (status: string) => {
  const styleMap: { [key: string]: any } = {
    'Pending': { color: '#909399' },
    'Running & Judge': { color: '#409EFF' },
    'Compile Error': { color: '#9933FF' },
    'Accepted': { color: '#67C23A' },
    'Presentation Error': { color: '#E6A23C' },
    'Wrong Answer': { color: '#F56C6C' },
    'Runtime Error': { color: '#FF6666' },
    'Time Limit Exceeded': { color: '#FF9900' },
    'Memory Limit Exceeded': { color: '#FF9900' },
    'Output Limit Exceeded': { color: '#FF9900' },
    'System Error': { color: '#FF0033' }
  }
  return styleMap[status] || {}
}
</script>

<style scoped>
.w {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.question-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>
