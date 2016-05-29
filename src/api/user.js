import { get } from '../utils/request'

export function getAccounts(userId) {
  return get(`/api/users/${userId}/accounts/`)
}

export function getAccount(accountId) {
  return get(`/api/account/${accountId}/`)
}
