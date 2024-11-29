<template>
  <div class="recharge">
    <van-nav-bar title="会员充值" left-text="返回" left-arrow @click-left="goback">
      <template #right>
        <van-icon name="search" size="18" @click="handleSearch"/>
      </template>
    </van-nav-bar>

    <!-- 充值选项 -->
    <div class="recharge-options">
      <div
        class="recharge-option"
        v-for="(plan, index) in plans"
        :key="index"
        :class="{'selected': selectedPlan === index}"
        @click="selectPlan(index)"
      >
        <div class="plan-details">
          <h3>{{ plan.name }}</h3>
          <p>{{ plan.description }}</p>
          <span class="price">${{ plan.price }}</span>
        </div>
        <van-button round block type="primary" class="recharge-btn" @click.stop="recharge(plan)">
          立即充值
        </van-button>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

// 引用 Vue Router
const router = useRouter();

// 充值选项数据（模拟数据）
const plans = ref([
  { name: '月会员', description: '每月自动续费，随时可取消', price: '9.9', duration: '1个月' },
  { name: '季度会员', description: '每季度自动续费，享受更多优惠', price: '19.9', duration: '3个月' },
  { name: '年会员', description: '一年一次性支付，最高优惠', price: '139', duration: '12个月' }
]);

// 当前选择的会员套餐
const selectedPlan = ref<number | null>(null);

// 选择套餐
function selectPlan(index: number) {
  selectedPlan.value = index;
  // console.log(`选择了套餐：${plans.value[index].name}`);
}

// 处理充值
function recharge(plan: any) {
  console.log(`正在充值：${plan.name}，价格：${plan.price}`);
  // 这里可以添加跳转到支付页面的逻辑
}

const handleSearch = () => {
  router.push('/search')
};

// 返回上一页
function goback() {
  router.back();
}
</script>



<style scoped>
.recharge {
  padding: 16px;
}

.recharge-options {
  margin-top: 20px;
}

.recharge-option {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 选中时的样式 */
.recharge-option.selected {
  border: 2px solid #f56c6c;
  /* background-color: #fef0f0; */
  /* 添加动画效果 */
  transition: all 0.3s ease; /* 所有属性过渡 0.3秒 */
  transform: scale(1.05); /* 选中时略微放大 */
}
/* 如果需要渐变动画，进一步调整过渡 */
.recharge-option.selected {
  /* background-color: #fef0f0; */
  border: 2px solid #f56c6c;
  transform: scale(1.05);
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

/* 当没有选中时，恢复默认样式 */
.recharge-option {
  transition: all 0.3s ease; /* 让未选中的状态也有平滑过渡 */
  transform: scale(1); /* 默认大小 */
}

/* 其他样式 */
.plan-details h3 {
  font-size: 18px;
  font-weight: bold;
}

.plan-details p {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #f56c6c;
  margin-top: 8px;
}

.recharge-btn {
  margin-top: 16px;
}
</style>


