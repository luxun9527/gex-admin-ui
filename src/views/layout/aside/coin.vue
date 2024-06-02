<template>
  <div>
    <el-button  @click="handleAddCoin">
      新增币种
    </el-button>
    <el-button @click="handleSyncCoin">
      同步
    </el-button>
    <el-dialog  v-model="dialogFormVisible" :title="dialogFlag" @close="closeDialog" width="500">
      <el-form :model="form">
        <el-form-item label="币种Id">
          <el-input v-model="form.coin_id" />
        </el-form-item>
        <el-form-item label="币种名称">
          <el-input v-model="form.coin_name" />
        </el-form-item>
        <el-form-item label="价格精度">
          <el-input v-model="form.prec" />
        </el-form-item>
      </el-form>


      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-table :data="coinList">
      <el-table-column property="id" label="ID" />
      <el-table-column property="coin_name" label="币种名称"  />
      <el-table-column property="prec" label="精度" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import {  ref } from 'vue'
import {addCoin, updateCoin, getCoinList, syncErrorCode, syncCoinConfig} from '@/api/system/sys_user';
import {ElMessage} from "element-plus";

let dialogFormVisible = $ref(false)

let coinList = $ref([])
let dialogFlag = $ref('新增')
let form = $ref({})
const closeDialog = ()=>{
  dialogFlag = false
  form={
    coin_id: '',
    coin_name: '',
    prec: '',
  }
}
const handleSyncCoin = async()=>{
  let res = await syncCoinConfig()
  if (res.code===0){
    ElMessage({
      message: '同步成功',
      type: 'success',
      duration: 5 * 1000,
    });
  }
}
const cancel = () =>{
  dialogFormVisible = false
  closeDialog()
}
const handleAddCoin = async()=>{
  dialogFormVisible = true
  dialogFlag = '新增'
}
const handleEdit = async(row)=>{
  dialogFormVisible = true
  dialogFlag = '编辑'
  form = {
    coin_name: row.coin_name,
    prec: row.prec,
    id: row.id,
    coin_id: row.coin_id
  }


}
const submitForm = async()=>{
  dialogFormVisible = false
  form.prec = Number(form.prec)
  form.coin_id = Number(form.coin_id)

  if (dialogFlag === '新增') {
    let res = await addCoin(form)
    if (res.code===0){
      await getTableData()
      ElMessage({
        message: '新增成功',
        type: 'success',
        duration: 5 * 1000,
      });
    }
  }else{
    let res = await updateCoin(form)
    if (res.code===0){
      await getTableData()
      ElMessage({
        message: '更新成功',
        type: 'success',
        duration: 5 * 1000,
      });
    }
  }


}
const getTableData = async()=>{
  let res = await getCoinList({'page_no':1,'page_size':1000})
  coinList = res.data.list
}
onMounted(async () => {
  await getTableData()
})


</script>