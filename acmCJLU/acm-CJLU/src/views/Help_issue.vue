<template>
  <div class="w">
    <h2>创建新帖</h2>
    <div class="issue-form">
      <el-form :model="issueForm" label-position="top">
        <el-form-item label="标题">
          <el-input v-model="issueForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="issueForm.content"
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitIssue">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const issueForm = ref({
  title: '',
  content: ''
})

const submitIssue = () => {
  if (!issueForm.value.title.trim()) {
    ElMessage.warning('请输入标题')
    return
  }
  if (!issueForm.value.content.trim()) {
    ElMessage.warning('请输入内容')
    return
  }
  // TODO: 实现提交逻辑
  ElMessage.success('提交成功')
  issueForm.value.title = ''
  issueForm.value.content = ''
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

.issue-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}
</style>
