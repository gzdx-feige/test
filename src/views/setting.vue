<template>
  <div class="settings-wrapper" :style="{minHeight:$store.state.height+'px'}">
    <div class="title">默认设置</div>
    <el-form label-position="left" label-width="80px" class="base-setting">
      <el-form-item label="抽奖人数">
        <el-input-number v-model="peopleNumber" :min="1" :max="9999"></el-input-number>
      </el-form-item>
      <el-form-item label="抽奖主题">
        <el-input v-model="themeTitle"></el-input>
      </el-form-item>
      <el-form-item label="禁用号码">
        <el-input v-model="banNumber" placeholder="数字以英文逗号分割，如禁用1号和4号，则填写1,4"></el-input>
      </el-form-item>
      <el-form-item label="允许重复抽奖">
        <el-switch
          v-model="repeat">
      </el-switch>
      </el-form-item>
      <el-form-item label="奖项分类">
        <el-select
          v-model="prizeListTemp"
          @change="prizeListChange"
          multiple
          filterable
          allow-create
          placeholder="请选择奖项名称或者自行编写奖项名称"
          style="width:30rem">
          <el-option
            v-for="(item,index) in scaleType"
            :label="item"
            :value="item"
            :key="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖项设置">
        <el-table
          :data="prizeList"
          border
          size="small"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="奖项名称"
            width="150">
          </el-table-column>
          <el-table-column label="中奖人数">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.size" :min="1" @change="scaleSizeChange($event,scope.row)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="奖品名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.prize" placeholder="请输入奖品名称"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveSetting('保存成功')" type="primary" icon="el-icon-download">保存</el-button>
        <el-button @click="clearBoth" icon="el-icon-delete">全部清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "../store/config";
export default {
  data() {
    return {
      peopleNumber: this.$store.state.peopleNumber, //抽奖人数
      themeTitle: this.$store.state.themeTitle, //抽奖主题
      banNumber: this.$store.state.banNumber, //禁止号码
      repeat: this.$store.state.repeat, //允许重复抽奖
      scaleType: this.$store.state.scaleType, //奖项分类
      prizeList: this.$store.state.prizeList, //已选择的奖项分类
      prizeListTemp: this.$store.getters.prizeListTemp
    };
  },
  methods: {
    prizeListChange(value) {
      let arr = [];
      for (let i = 0; i < value.length; i++) {
        arr.push({
          name: value[i],
          size: 1,
          remain: 1,
          prize: ""
        });
      }
      this.prizeList = arr;
    },
    scaleSizeChange(value, row) {
      if (value > this.peopleNumber) {
        this.$alert("中奖人数不能大于抽奖人数", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            row.size = 1;
          }
        });
      }
    },
    //保存设置
    saveSetting(message) {
      //不允许重复抽奖
      if (!this.repeat) {
        let prizeList = this.prizeList;
        var sum = 0;
        for (let i = 0; i < prizeList.length; i++) {
          sum += prizeList[i].size;
        }
        if (sum > this.peopleNumber) {
          this.$alert("中奖人数不能大于抽奖人数", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          return;
        }
      }
      this.$store.commit("peopleNumberChange", this.peopleNumber);
      this.$store.commit("themeTitleChange", this.themeTitle);
      this.$store.commit("banNumberChange", this.banNumber);
      this.$store.commit("repeatChange", this.repeat);
      this.$store.commit("prizeListChange", this.prizeList);
      
      this.$message.success(message);
    },
    //清空设置
    clearBoth() {
      this.peopleNumber = config.peopleNumber;
      this.themeTitle = config.themeTitle;
      this.banNumber = config.banNumber;
      this.repeat = config.repeat;
      this.prizeList = [];
      this.prizeListTemp = [];

      this.$store.commit("clearWinnerList");

      this.saveSetting("清除数据成功");
    }
  }
};
</script>
<style lang="less" scoped>
.settings-wrapper {
  padding: 7rem 13rem;
  background-color: #ffffff;
  box-sizing: border-box;

  .title {
    border: 1px solid #dcdfe6;
    border-bottom: none;
    padding: 1rem;
    background-color: #ebeef5;
    font-size: 1.5rem;
    color: #303133;
  }

  .base-setting {
    border: 1px solid #dcdfe6;
    padding: 1rem;
    background-color: #f2f6fc;
  }
}
</style>
