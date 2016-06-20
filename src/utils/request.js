import cookie from 'react-cookie';
import toQueryString from 'query-string'

export function request(url, options) {
  console.log(`Request to ${url}`)
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((json) => {
              resolve(json)
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          reject(res.status)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// export function post(url, body) {
//   return request('POST', {
//     body: JSON.stringify(body),
//   })(url)
// }
//
// export function get(url, queryObj) {
//   let queryString = ''
//   if (queryObj) {
//     queryString = toQueryString(queryObj)
//   }
//   return request('GET', {})(url + queryString)
// }
