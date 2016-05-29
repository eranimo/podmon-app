export function post(dispatch, url, body) {
  console.log(`POST request to ${url}`)
  console.log(body)
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
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
