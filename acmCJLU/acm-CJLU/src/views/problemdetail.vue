<template>
  <div class="w">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <span>题目介绍</span>
          </span>
        </template>
        <div class="header-section">
          <router-link to="/problem">
            <el-button type="primary">返回</el-button>
          </router-link>
        </div>
        <div class="problem-detail">
          <el-card class="problem-card">
            <template #header>
              <div class="card-header">
                <h2>{{ problem.title }}</h2>
                <el-tag :type="getDifficultyType(problem.difficulty?.code)">{{ problem.difficulty?.description
                }}</el-tag>
              </div>
            </template>
            <div class="problem-info">
              <div class="info-row">
                <span>提交次数：{{ problem.submitCount }}</span>
                <span>通过次数：{{ problem.acceptCount }}</span>
                <span>创建时间：{{ problem.createTime }}</span>
              </div>
              <div class="tags-container">
                <el-tag v-for="tag in problem.tagList" :key="tag.id" class="tag-item" size="small">{{ tag.name
                }}</el-tag>
              </div>
              <div class="content-section">
                <div v-html="problem.content"></div>
              </div>
            </div>
          </el-card>

          <!-- 判题配置 -->
          <el-card class="config-card">
            <template #header>
              <div class="card-header">
                <h3>判题配置</h3>
              </div>
            </template>
            <el-table :data="problem.judgeConfigList" stripe>
              <el-table-column prop="language.description" label="语言" />
              <el-table-column prop="memoryLimit" label="内存限制" />
              <el-table-column prop="timeLimit" label="时间限制" />
            </el-table>
          </el-card>

          <!-- 测试用例 -->
          <el-card class="testcase-card">
            <template #header>
              <div class="card-header">
                <h3>测试用例</h3>
              </div>
            </template>
            <el-table :data="problem.publicTestCaseList" stripe>
              <el-table-column prop="input" label="输入">
                <template #default="{ row }">
                  <el-button type="primary" @click="exampleOperation(row.caseId, 0)">获取输入测试样例</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="output" label="输出">
                <template #default="{ row }">
                  <el-button type="primary" @click="exampleOperation(row.caseId, 1)">获取输出测试样例</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

      </el-tab-pane>
      <el-tab-pane label="答题">
        <div class="submit-section">
          <el-form :model="submitForm" class="submit-form">
            <el-form-item label-position="top" label="语言">
              <el-select v-model="submitForm.language" placeholder="请选择编程语言" class="language-select">
                <el-option v-for="config in problem.judgeConfigList" :key="config.language.code"
                  :label="config.language.description" :value="config.language.code" />
              </el-select>
            </el-form-item>
            <el-form-item label-position="top" label="代码">
              <el-input v-model="submitForm.code" type="textarea" :rows="15" placeholder="请输入代码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的">
        <div class="submission-section">
          <el-table :data="submissionList" stripe>
            <el-table-column prop="submissionId" label="提交ID" width="100" />
            <el-table-column prop="language.description" label="语言" width="100" />
            <el-table-column prop="status.description" label="状态" width="100" />
            <el-table-column prop="executionStatus.description" label="执行状态" width="120" />
            <el-table-column prop="timeUsed" label="耗时(ms)" width="100" />
            <el-table-column prop="memoryUsed" label="内存(KB)" width="100" />
            <el-table-column prop="createTime" label="提交时间" width="180" />
          </el-table>
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 30, 50]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="统计">这里是该问题的答题情况汇总</el-tab-pane>
    </el-tabs>

    <!-- 测试用例内容弹窗 -->
    <div v-if="showTestCase" class="test-case-modal" @click="closeTestCase">
      <div class="test-case-content" @click.stop>
        <pre style="white-space: pre">{{ testCaseContent }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';  // 添加这行导入
import { useRoute } from 'vue-router';
import { viewProblemVOById } from '../api/ProblemController';
import { getTestCaseContent } from '../api/TestCaseAPIs';
import { getSubmissionVOPage } from '../api/SubmissionController';
import { submit } from '../api/SubmissionController';
import { type SubmitRequest } from '../api/SubmissionController';
import { useUserStore } from '../stores/user';
const route = useRoute();
const problemId = route.params.id as string;
const problem = ref<any>({});
const showTestCase = ref(false);
const testCaseContent = ref<string>('');

// 提交记录相关数据
const submissionList = ref<any[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 获取提交记录
const fetchSubmissions = () => {
  getSubmissionVOPage({
    userId: useUserStore().userFrom.userId,
    problemId: Number(problemId),
    current: currentPage.value,
    pageSize: pageSize.value
  })
    .then((response) => {
      submissionList.value = response.data.records;
      total.value = response.data.total;
      console.log("获取提交记录成功");
    })
    .catch((error) => {
      console.error('获取提交记录失败：', error);
    });
};

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchSubmissions();
};

// 处理页码变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchSubmissions();
};

// 提交表单数据
const submitForm = ref({
  userid: useUserStore().userFrom.userId,
  problemid: problemId,
  contestld: '',
  language: '',
  code: '',
  submitIP: '',
});


// 重置表单
const resetForm = () => {
  submitForm.value.userid = '';
  submitForm.value.problemid = '';
  submitForm.value.contestld = '';
  submitForm.value.language = '';
  submitForm.value.code = '';
  submitForm.value.submitIP = '';
};

// 提交表单
const handleSubmit = () => {
  console.log(submitForm.value);
  if (submitForm.value.language === '') {
    ElMessage.warning('请选择语言');
    return
  }
  if (submitForm.value.code === '') {
    ElMessage.warning('请输入代码');
    return
  }
  submit(submitForm.value)
    .then((response) => {
      ElMessage.success('提交成功');
      resetForm();
    })
    .catch((error) => {
      ElMessage.error('提交失败：' + error.message);
    });
}

// 获取测试用例内容
const exampleOperation = (caseId: number, type: number) => {
  getTestCaseContent(caseId, type)
    .then((response) => {
      testCaseContent.value = JSON.stringify(response.data.data);
      showTestCase.value = true;
    })
    .catch((error) => {
      console.error('获取测试用例内容失败：', error);
    });
}

const closeTestCase = () => {
  showTestCase.value = false;
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
// 获取题目详情
onMounted(() => {
  viewProblemVOById(problemId)
    .then((response) => {
      problem.value = response.data;
    })
    .catch((error) => {
      console.error('获取题目详情失败：', error);
    });
  
  // 初始化加载提交记录
  fetchSubmissions();
});
</script>

<style lang="less" scoped>
.w {
  border: 0;
  box-shadow: none;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.problem-detail {
  margin-top: 20px;

  .problem-card,
  .config-card,
  .testcase-card {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2,
    h3 {
      margin: 0;
    }
  }

  .problem-info {
    .info-row {
      margin-bottom: 15px;
      display: flex;
      gap: 20px;
    }

    .tags-container {
      margin-bottom: 15px;

      .tag-item {
        margin-right: 8px;
      }
    }

    .content-section {
      margin-top: 20px;
    }
  }
}

.test-case-modal {
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .test-case-content {
    width: 40%;
    min-height: 20%;
    background-color: #000;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    overflow-y: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

.submit-section {
  padding: 20px;

  .submit-form {
    max-width: 800px;
    margin: 0 auto;

    .language-select {
      width: 100%;
    }

    :deep(.el-form-item__label) {
      padding-bottom: 8px;
      font-weight: 500;
    }
  }
}

.submission-section {
  padding: 20px;

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>