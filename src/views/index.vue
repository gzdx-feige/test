<template>
  <div id="index" :style="{minHeight:height+'px'}">
      <div class="content">
          <h2 class="title">{{themeTitle}}</h2>
          <p class="scale">{{currentScaleShow}}</p>
          <p class="prize-save" v-if="currentScale">{{currentScale.name}}奖品剩余 {{currentScale.remain}} 份，共 {{currentScale.size}} 份</p>
          <div class="roll">
              <div class="img-content">
                <img class="number" src="../assets/images/num_sb.png" />
                <img class="number" src="../assets/images/num_sb.png" />
                <img class="number" src="../assets/images/num_sb.png" />
                <img class="number" src="../assets/images/num_sb.png" />
              </div>
          </div>
          <div class="button" @click="startRoll">{{rolling?'停止抽奖':'开始抽奖'}}</div>
      </div>
      <el-dropdown class="dropdown" v-if="currentScale" @command="selectScale">
        <span class="el-dropdown-link">{{currentScale.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            v-for="(item,index) in prizeList" 
            :key="index" 
            :command="index" 
            :disabled="item.remain?false:true">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "index",
  data: function() {
    return {
      height: this.$store.state.height,
      NodeList: [],
      rolling: false,
      peopleNumber: this.$store.state.peopleNumber, //抽奖人数
      themeTitle: this.$store.state.themeTitle, //抽奖主题
      banNumber: this.$store.state.banNumber, //禁止号码
      repeat: this.$store.state.repeat, //允许重复抽奖
      prizeList: this.$store.state.prizeList, //已选择的奖项分类
      currentScale: this.$store.state.prizeList[0] || "",
      timer: null
    };
  },
  computed: {
    currentScaleShow() {
      if (this.currentScale) {
        return this.currentScale.name + " " + this.currentScale.prize;
      } else {
        return "抽奖活动奖品";
      }
    }
  },
  mounted() {
    this.NodeList = document.getElementsByClassName("number");
  },
  methods: {
    selectScale(index) {
      // console.log(index);
      this.currentScale = this.prizeList[index];
    },
    //开始抽奖
    startRoll: function() {
      //抽奖活动配置信息不足
      if (!this.currentScale) {
        let _this = this;
        this.$confirm("抽奖活动配置信息不足，前往设置?", "提示", {
          confirmButtonText: "去设置",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.$parent.currentRoute = "setting";
            _this.$router.replace("/setting");
          })
          .catch(() => {});
        return;
      }
      // 此奖项奖品已抽取完毕
      if (this.currentScale.remain <= 0) {
        this.$alert("此奖项奖品已抽取完毕，请更换其他奖项继续抽奖", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      this.rolling = !this.rolling;
      let NodeList = this.NodeList;
      if (this.rolling) {
        this.RollLogic();
      } else {
        for (let i = 0; i < NodeList.length; i++) {
          NodeList[i].className = "number";
          NodeList[i].style.top = 0;
        }
        clearInterval(this.timer);
        this.getPrize();
      }
    },

    //号码滚动逻辑
    RollLogic() {
      let length = (this.peopleNumber + "").length;
      let NodeList = this.NodeList;
      let _this = this;
      this.timer = setInterval(function() {
        // console.log(length);
        if (length > 0) {
          NodeList[4 - length].className = "number running";
          length -= 1;
        } else {
          clearInterval(_this.timer);
        }
      }, 300);
    },

    //抽奖逻辑
    getPrize() {
      let maxNumber = this.peopleNumber;
      let luckyNumber = this.getLuckyNumber(); //中奖号码
      console.log(luckyNumber);

      let str_num = luckyNumber + "";
      let length = str_num.length;
      let NodeList = this.NodeList;

      for (let i = 1; length > 0; i++) {
        length -= 1;
        NodeList[4 - i].style.top =
          "-" + str_num.substr(length, 1) * 26.4 + "rem";
      }

      this.currentScale.remain -= 1; //奖品数量减一

      this.$store.commit("appendWinnerList", {
        name: this.currentScale.name,
        prize: this.currentScale.prize,
        luckyNumber: luckyNumber
      });
    },
    getLuckyNumber() {
      let maxNumber = this.peopleNumber;
      let luckyNumber = Math.floor(Math.random() * maxNumber + 1); //中奖号码

      //过滤禁止的号码
      let banNumber = this.$store.getters.getBanNumber;
      for (let i = 0; i < banNumber.length; i++) {
        // console.log(luckyNumber, banNumber[i]);
        if (luckyNumber == banNumber[i]) {
          return this.getLuckyNumber();
        }
      }

      //是否允许重复抽奖
      if (this.$store.state.repeat) {
        return luckyNumber;
      } else {
        let repeatList = this.$store.getters.getRepeatList;
        // console.log(repeatList);
        for (let i = 0; i < repeatList.length; i++) {
          //   console.log(luckyNumber, repeatList[i]);
          if (luckyNumber == repeatList[i]) {
            return this.getLuckyNumber();
          }
        }
        return luckyNumber;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#index {
  width: 100%;
  background: url("../assets/images/bg.jpg") top center repeat-x;
  position: relative;

  .content {
    color: #ffffff;
    text-align: center;
    position: absolute;
    width: 100%;

    .title {
      font-size: 3.7rem;
      margin-top: 6rem;
    }

    .scale {
      font-size: 2rem;
      margin-top: 1.3rem;
    }

    .prize-save {
      font-size: 1.6rem;
      margin-top: 1.3rem;
    }

    .roll {
      width: 75.2rem;
      height: 27.8rem;
      background: url("../assets/images/bg_sb.png") top left no-repeat;
      background-size: contain;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.8, 0.8);

      .img-content {
        width: 74rem;
        height: 26.4rem;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
      }

      img {
        float: left;
        width: 18.5rem;
        height: 264rem;
        position: relative;

        &.running {
          animation: mymove 1s infinite linear;
        }
      }
    }

    .button {
      margin: 0 auto;
      width: 17rem;
      height: 4rem;
      line-height: 4rem;
      border: 2px solid #ffffff;
      border-radius: 2.1rem;
      font-size: 2rem;
      cursor: pointer;
    }
  }
}
@keyframes mymove {
  from {
    top: 0px;
  }
  to {
    top: -222rem;
  }
}
.dropdown {
  position: fixed;
  right: 2rem;
  top: 2rem;
  cursor: pointer;

  .el-dropdown-link {
    color: #bbbbbb;
  }
}
</style>



