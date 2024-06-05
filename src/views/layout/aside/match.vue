<template>
  <div>
    <el-table :data="matchedOrderList">
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin-left: 50px;text-align: center">
            <h3 style="color: red">撮合详情</h3>
            <el-table :data="props.row.sub_match_info_list" :border="childBorder">
              <el-table-column label="takerID" prop="taker_user_id" />
              <el-table-column label="makerID" prop="maker_user_id" />
              <el-table-column label="撮合价格" prop="match_price" />
              <el-table-column label="撮合数量" prop="match_qty" />
              <el-table-column label="撮合金额" prop="match_amount" />
              <el-table-column label="撮合时间" prop="match_time" />
            </el-table>
          </div>

        </template>
      </el-table-column>
      <el-table-column property="match_id" label="撮合ID" width="300"/>
      <el-table-column property="symbol_id" label="交易对id" width="200" />
      <el-table-column property="symbol_name" label="交易对名称" width="200" />
      <el-table-column property="total_qty" label="撮合数量(基础币)" width="200" />
      <el-table-column property="total_amount" label="撮合金额(计价币)" width="200" />
      <el-table-column property="avg_price" label="撮合均价" width="200" />
      <el-table-column property="created_at" label="撮合时间" width="200" />
    </el-table>
  </div>

</template>

<script setup>
import { getMatchList} from '@/api/system/sys_user';
import {timestampToDateTime} from "@/utils/time.js";

let matchedOrderList = $ref([])

onMounted(async () => {
  let res = await getMatchList({'page_no':1,'page_size':200})
  res.data.list.forEach(el => {
    el.created_at = timestampToDateTime(el.created_at)
    el.sub_match_info_list.forEach(el=>{
      el.match_time=timestampToDateTime(el.match_time)
    })
  })

  matchedOrderList = res.data.list
})

</script>