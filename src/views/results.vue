<template>
  <div class="results" :style="{minHeight:$store.state.height+'px'}">
		<div class="title">本次活动抽奖结果</div>
		<el-table
			:data="winnerList"
			border
			size="small"
			style="width: 100%">
			<el-table-column
				prop="name"
				label="奖项名称">
			</el-table-column>
			<el-table-column 
				prop="prize"
				label="奖品名称">
			</el-table-column>
			<el-table-column 
				prop="luckyNumber"
				label="中奖号码">
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
  name: "results",
  data: function() {
    return {};
  },
  computed: {
    winnerList() {
      return this.$store.state.winnerList;
    }
  }
};
</script>
<style lang="less" scoped>
.results {
  padding: 2rem 13rem;
  background-color: #ffffff;
  box-sizing: border-box;

  .title {
    text-align: center;
    color: #606266;
    font-size: 3rem;
    font-weight: bold;
    padding: 2rem;
  }
}
</style>


