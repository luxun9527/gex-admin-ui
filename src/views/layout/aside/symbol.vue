<template>
  <div>
    <el-button  @click="handleAddSymbol">
      新增交易对
    </el-button>
    <el-button @click="handleSyncSymbol">
      同步
    </el-button>
    <el-dialog  v-model="dialogFormVisible" title="新增交易对" width="500" @close="closeDialog">
      <el-form :model="form" :rules="addSymbolRules">
        <el-form-item label="基础币" :label-width="formLabelWidth">
          <el-select v-model="form.base_coin_id" placeholder="选择基础币">
            <el-option
                v-for="item in baseCoinOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计价币" :label-width="formLabelWidth">
          <el-select v-model="form.quote_coin_id" placeholder="选择计价币">
            <el-option
                v-for="item in quoteCoinOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易对Id">
          <el-input v-model="form.symbol_id"/>
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
    <el-table :data="symbolList">
      <el-table-column property="id" label="ID" width="150" />
      <el-table-column property="symbol_name" label="交易对名称" width="200" />
      <el-table-column property="base_coin_name" label="基础币" />
      <el-table-column property="quote_coin_name" label="计价币" />
    </el-table>
  </div>

</template>

<script setup>
import { reactive, ref } from 'vue'
import {addSymbol, getSymbolList, getCoinList, syncSymbolConfig} from '@/api/system/sys_user';
import {ElMessage} from "element-plus";

let dialogFormVisible = $ref(false)
let baseCoinOpts=$ref([])
let quoteCoinOpts=$ref([])
let symbolList = $ref([])
const formLabelWidth = '140px'
const form = ref({
  base_coin_id: '',
  quote_coin_id: '',
  symbol_id: '',
})
const addSymbolRules = reactive({
  symbol_id: [{ required: true, trigger: "blur",validator: validateNumber  }],
})
function validateNumber(rule, value, callback) {

  // 使用正则表达式验证字符串是否仅包含数字
  const regex = /^\d+$/;
  if (!value ||  !regex.test(value)) {
    callback(new Error("只能输入整数"));
  } else {
    callback();
  }
}
const cancel = () =>{
  dialogFormVisible = false
  closeDialog()
}
const closeDialog = ()=>{
  form.value.base_coin_id = ''
  form.value.quote_coin_id = ''
  baseCoinOpts=[]
  quoteCoinOpts=[]
}
const handleAddSymbol = async()=>{
  dialogFormVisible = true
  let res = await getCoinList({'page_no':1,'page_size':1000})
  res.data.list.forEach(d =>{
    baseCoinOpts.push({ label: d.coin_name, value: d.id })
    quoteCoinOpts.push({ label: d.coin_name, value: d.id })
  })
}

const submitForm = async()=>{
  dialogFormVisible = false
  form.value.symbol_id = Number(form.value.symbol_id)
  let res = await addSymbol(form.value)
  if (res.code===0){
    ElMessage({
      message: '新增成功',
      type: 'success',
      duration: 5 * 1000,
    });
  }
}

const handleSyncSymbol = async () => {
  let res = await syncSymbolConfig()
  if (res.code===0){
    ElMessage({
      message: '同步成功',
      type: 'success',
      duration: 5 * 1000,
    });
  }
}

onMounted(async () => {
  let res = await getSymbolList({'page_no':1,'page_size':1000})
  symbolList = res.data.list
})
watch(form.value,(newForm)=>{
  if (newForm.base_coin_id !== ''  ) {
    quoteCoinOpts = quoteCoinOpts.filter(v=> v.value !== newForm.base_coin_id)
  }
  if (newForm.quote_coin_id !== '') {
    baseCoinOpts= baseCoinOpts.filter(v=> v.value !== newForm.quote_coin_id)
  }
},{ deep: true })

</script>