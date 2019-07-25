<template>
  <div>
    <!-- <SlickList :lockToContainerEdges="true" axis="x" lockAxis="x" v-model="items" class="SortableList" @input="getChangeLists">
      <SlickItem v-for="(item, index) in items" class="SortableItem" :index="index" :key="index">
          {{ item.name }} -->
        <div class="root">
          <SlickList :lockToContainerEdges="true" class="list" lockAxis="y" v-model="itemArr">
            <SlickItem class="list-item" v-for="(item, index) in itemArr" :index="index" :key="index">
              {{ item }}
            </SlickItem>
          </SlickList>
        </div>
        <el-tooltip class="item" effect="light" content="按Ctrl+Enter发送" placement="top">
                  <el-button plain size="small" style="float: right;margin-right: 15px" @click="sendMsg()">发送
                  </el-button>
                </el-tooltip>
      <!-- </SlickItem>
    </SlickList>-->
  </div> 
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  name: 'Example',
  components: {
    SlickItem,
    SlickList
  },
  data () {
    return {
        itemArr: ['Item1', 'Item2', 'Item3'],
    }
  },
  methods: {
   
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

.list {
  max-height: 80vh;
  margin: 0 auto;
  padding: 0;

  background-color: #f3f3f3;
  border: 1px solid #efefef;
}
.list-item {

  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  user-select: none;
  color: #333;
  font-weight: 400;
}
</style>