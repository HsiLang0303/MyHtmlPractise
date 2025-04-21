<template>
  <div class="w">
    <span>通知</span>
    <div class="notice-list" style="height: 440px;">
      <div class="notice" v-for="notice in currentPageNotices">
        <div class="inco">
          <img src="../assets/notice.png" alt="">
        </div>
        <div class="notice-info">
          <a href="#" class="title">{{ notice.title }}</a>
          <span class="time">{{ notice.time }}</span>
        </div>
      </div>
    </div>
    <!-- 分页控制 -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const noticeList = ref([
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },
  {
    title: '对于两名在 “2024 中国计量大学 ACM 实验室新生赛” 中作弊的同学的处罚公告',
    time: '2025.03.28'
  },]);
const pageSize = 5; // 每页显示5条
const currentPage = ref(1);

// 计算总页数
const totalPages = computed(() => Math.ceil(noticeList.value.length / pageSize));

// 计算当前页显示的通知
const currentPageNotices = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return noticeList.value.slice(start, end);
});

// 切换页面
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};


</script>

<style lang="less" scoped>
.w {
  text-align: left;
  
  > span {  // 直接子元素 span
    font-size: 28px;
    display: block;
    text-align: center;
  }

  .notice-list {
    .notice {
      margin-top: 20px;
      height: 70px;
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      .inco {
        margin-left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;

        img {
          width: 100%;
        }
      }

      .notice-info {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;

        .title {
          font-size: 16px;
          color: #333;
          text-decoration: none;
          margin-bottom: 5px;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }

        .time {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  span {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;

    &.active {
      background: #1890ff;
      color: white;
    }

    &:hover:not(.active) {
      background: #f0f0f0;
    }
  }
}
</style>
