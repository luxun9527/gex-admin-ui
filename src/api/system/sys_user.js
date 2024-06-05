import request from '@/utils/request';

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}


export const getCoinList = (params) => {
  return request({
    url: '/get_coin_list',
    method: 'get',
    params,
  })
}

export const addSymbol = (data) => {
  return request({
    url: '/add_symbol',
    method: 'post',
    data,
  })
}
export const syncSymbolConfig = () => {
  return request({
    url: '/sync_symbol_config',
    method: 'post',
  })
}

export const syncCoinConfig = () => {
  return request({
    url: '/sync_coin_config',
    method: 'post',
  })
}

export const syncErrorCode = () => {
  return request({
    url: '/sync_error_code',
    method: 'post',
  })
}

export const getSymbolList = (params) => {
  return request({
    url: '/get_symbol_list',
    method: 'get',
    params,
  })
}
export const getMatchList = (data) => {
  return request({
    url: '/get_match_list',
    method: 'post',
    data,
  })
}
export const addCoin = (data) => {
  return request({
    url: '/add_coin',
    method: 'post',
    data,
  })
}

export const updateCoin = (data) => {
  return request({
    url: '/update_coin',
    method: 'post',
    data,
  })
}

export const getErrorCodeList = (params) => {
  return request({
    url: '/get_error_code_list',
    method: 'get',
    params,
  });
}

export const addErrorCode = (data) => {
  return request({
    url: '/add_error_code',
    method: 'post',
    data,
  });
}
export const updateErrorCode = (data) => {
  return request({
    url: '/update_error_code',
    method: 'post',
    data,
  })
}
