export default{
    namespaced:true,
    state:() =>{
        return{
            userinfo:{
                token:'123',
                name:'黄四郎',
                username:'123456',
                password:'456789',
            }
        }
    },
    mutations:{
        updateName(state,newName){
            state.userinfo.name = newName
        },
        updateUserInfo(state, userInfo) {
            state.userinfo.username = userInfo.username;
            state.userinfo.password = userInfo.password;
            state.userinfo.name = userInfo.name;
        }
    },
    actions:{
        updateNameAsync({commit},newName){
            setTimeout(()=>{
                commit('updateName',newName)
            },2000)
        }
    }
}