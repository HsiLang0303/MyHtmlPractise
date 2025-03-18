<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>

        
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const errorMessage = ref('');

const fomaDate = ref({
    name: '',
    username: '',
    password: ''
});

const handleLogin = () => {
    const userinfo = store.state.user.userinfo;
    if (fomaDate.value.username === userinfo.username && fomaDate.value.password === userinfo.password) {
        errorMessage.value = '';
        router.push('/');
    } else {
        errorMessage.value = '账号或密码错误';
    }
};

const handleRegister = () => {
    if (!fomaDate.value.username || !fomaDate.value.password || !fomaDate.value.name) {
        errorMessage.value = '请输入名称、账号和密码';
        return;
    }
    store.commit('user/updateUserInfo', {
        name: fomaDate.value.name,
        username: fomaDate.value.username,
        password: fomaDate.value.password
    });
    errorMessage.value = '注册成功';
};
    </script>
</body>
</html>