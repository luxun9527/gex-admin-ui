<template>
  <div>
    <el-button @click="handleAddCoin">
      新增错误码
    </el-button>
    <el-button @click="handleSyncErrorCode">
      同步
    </el-button>
    <el-dialog v-model="dialogFormVisible" :title="dialogFlag" width="500" @close="closeDialog">
      <el-form :model="form">
        <el-form-item label="错误码id">
          <el-input v-model="form.error_code_id"/>
        </el-form-item>
        <el-form-item label="错误码名称">
          <el-input v-model="form.error_code_name"/>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="form.language"/>
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
    <el-table :data="errCodeList">
      <el-table-column property="id" label="ID" width="150"/>
      <el-table-column property="error_code_id" label="错误码ID" width="200"/>
      <el-table-column property="error_code_name" label="错误码名称"/>
      <el-table-column property="language" label="语言"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script setup>
import {
  getErrorCodeList,
  addErrorCode,
  updateErrorCode,
  syncSymbolConfig,
  syncCoinConfig,
  syncErrorCode
} from '@/api/system/sys_user';
import {ElMessage} from "element-plus";

let dialogFormVisible = $ref(false)
let errCodeList = $ref([])
let dialogFlag = $ref('新增')
let form = $ref({})

const cancel = () => {
  dialogFormVisible = false
  closeDialog()
}
const closeDialog = () => {
  form = {
    error_code_id: '',
    error_code_name: '',
    language: ''
  }
}
const handleAddCoin = async () => {
  dialogFlag = '新增'
  dialogFormVisible = true
}

const handleSyncErrorCode = async () => {
  let res = await syncErrorCode()
  if (res.code===0){
    ElMessage({
      message: '同步成功',
      type: 'success',
      duration: 5 * 1000,
    });
  }
}
const handleEdit = async (row) => {
  dialogFormVisible = true
  dialogFlag = '编辑'
  form = {
    error_code_id: row.error_code_id,
    error_code_name: row.error_code_name,
    language: row.language,
    id: row.id
  }

}
const submitForm = async () => {
  dialogFormVisible = false
  form.error_code_id = Number(form.error_code_id)

  if (dialogFlag === '新增') {
    let res = await addErrorCode(form)
    if (res.code === 0) {
      await getTableData()
      ElMessage({
        message: '新增成功',
        type: 'success',
        duration: 5 * 1000,
      });
    }
  } else {
    let res = await updateErrorCode(form)
    if (res.code === 0) {
      await getTableData()
      ElMessage({
        message: '修改成功',
        type: 'success',
        duration: 5 * 1000,
      });
    }
  }


}
const getTableData = async () => {
  let res = await getErrorCodeList({'language': 'zh-CN'})
  errCodeList = res.data.list
}
onMounted(async () => {
  await getTableData()
})


</script>