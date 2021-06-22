const url = "https://vue3-course-api.hexschool.io"
const path = "uy_neish"

const app = Vue.createApp({
  data() {
    return {
        userprofile: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      axios.post(`${url}/admin/signin`, this.userprofile)
        .then(res => {
            if(res.data.success === true) {
            const { token, expired } = res.data
            document.cookie = `myToken = ${token}; expires = ${new Date(expired)}`
            this.init()
            console.log('hi')
            axios.post(`${url}/api/user/check`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            window.location = `product.html`
            }else{
            alert('帳號或密碼輸入有誤喲！')
            }
        })
        .catch(err => console.log(err))
  },
  init () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      console.log(token)
      axios.defaults.headers.common['Authorization'] = token
    }
  }
})

app.mount('#app')