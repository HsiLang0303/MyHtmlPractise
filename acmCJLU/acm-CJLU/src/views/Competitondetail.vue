<template>
    <div class="w">
        <el-card class="contest-info">
            <template #header>
                <div class="card-header">
                    <h2>{{ contestInfo.title }}</h2>
                </div>
            </template>
            <div class="info-content">
                <el-descriptions :column="2" border>
                    <el-descriptions-item label="比赛描述">{{ contestInfo.contestDescription }}</el-descriptions-item>
                    <el-descriptions-item label="加密状态">{{ contestInfo.encrypted === '1' ? '加密' : '公开' }}</el-descriptions-item>
                    <el-descriptions-item label="可见状态">{{ contestInfo.visibleState }}</el-descriptions-item>
                    <el-descriptions-item label="开始时间">{{ contestInfo.startTime }}</el-descriptions-item>
                    <el-descriptions-item label="结束时间">{{ contestInfo.endTime }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </el-card>

        <el-card class="problem-list" style="margin-top: 20px;">
            <template #header>
                <div class="card-header">
                    <h3>题目列表</h3>
                </div>
            </template>
            <el-table :data="contestInfo.problemContestVOList" style="width: 100%">
                <el-table-column prop="displayOrder" label="序号" width="80" align="center" />
                <el-table-column prop="title" label="题目" align="center" />
                <el-table-column prop="difficulty" label="难度" width="100" align="center" />
                <el-table-column label="通过率" width="150" align="center">
                    <template #default="scope">
                        {{ scope.row.acceptCount }}/{{ scope.row.submitCount }}
                        ({{ scope.row.submitCount === 0 ? '0' : ((scope.row.acceptCount / scope.row.submitCount) * 100).toFixed(1) }}%)
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getContestVOById, ContestVO } from '../api/ContestController';
import { ElMessage } from 'element-plus';

const route = useRoute();
const competitionId = route.params.id as string;
const contestInfo = ref<ContestVO>({
    contestId: 0,
    title: '',
    contestDescription: '',
    encrypted: '',
    visibleState: '',
    startTime: '',
    endTime: '',
    problemContestVOList: []
});

onMounted(async () => {
    try {
        const res = await getContestVOById(competitionId);
        if (res.data.code === 20000) {
            contestInfo.value = res.data.data;
        } else {
            ElMessage.error(res.data.message || '获取比赛详情失败');
        }
    } catch (error) {
        ElMessage.error('获取比赛详情失败：' + error);
    }
});

</script>

<style lang="less" scoped>
.w {
    padding: 20px;

    .contest-info, .problem-list {
        .card-header {
            h2, h3 {
                margin: 0;
            }
        }
    }

    .info-content {
        margin-top: 20px;
    }
}
</style>