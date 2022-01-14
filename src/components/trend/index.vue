<template>
  <div class="chart-trend">
    {{ term }}
    <span>{{ rate }}</span>
    <span :class="['trend-icon', trend]">
      <CaretUpOutlined v-if="type" />
      <CaretDownOutlined v-else />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  term: {
    type: String,
    default: ''
  },
  percentage: {
    type: [Number, String],
    default: null
  },
  type: {
    type: Boolean,
    default: true
  },
  target: {
    type: Number,
    default: 0
  },
  value: {
    type: Number,
    default: 0
  },
  fixed: {
    type: Number,
    default: 2
  }
})

const type = props.type === null ? props.value >= props.target : props.type
const trend = props.type ? 'up' : 'down'
const rate =
  props.percentage === null
    ? (Math.abs(props.value - props.target) * 100) / props.target
    : props.percentage
</script>

<style lang="scss" scoped>
.chart-trend {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;

  .trend-icon {
    font-size: 12px;

    &.up,
    &.down {
      margin-left: 4px;
      position: relative;
      top: 1px;

      i {
        font-size: 12px;
        transform: scale(0.83);
      }
    }

    &.up {
      color: #f5222d;
    }
    &.down {
      color: #52c41a;
      top: -1px;
    }
  }
}
</style>
