import vc from 'vue-cookie'
const userInfo = {
    state: {
        userInfo: vc.get('userInfo') ? JSON.parse(vc.get('userInfo')) : {}
    },
    mutations: {
        login(state, params) {
            state.userInfo = params
            // let expirationTime = new Date()
            // expirationTime.setTime(expirationTime.getTime() + (1000 * 60 * 90))
            // vc.set('userInfo', JSON.stringify(params),{expires: expirationTime})
            vc.set('userInfo', JSON.stringify(params))
        }
    },
    actions: {
        login({commit}, params) {
            commit('login', params)
        },
        close(){
            vc.set('userInfo','')
        }
    }
}
export default userInfo