<template>
    <div class="w">
        <div class="userinfo">
            <div class="toux" @click="triggerFileInput">
                <img :src="userFrom.avatarPath || '../assets/toux.jpeg'" alt="">
                <div class="edit-overlay">
                    <span>编辑头像</span>
                </div>
                <input type="file" ref="fileInput" style="display: none" @change="handleAvatarChange" accept="image/*">
            </div>
            <div class="user-edit">
                <span class="username">{{ userFrom.username }}</span>
            </div>
            <div class="userdetail">
                <div>
                    <span>角色：{{ userRole }}</span>
                    <button v-if="isSuperAdmin" style="font-size: 12px; margin:0 0 0 4px;padding: 0px; width: 60px; height: 20px;" @click="openRoleModal">修改角色</button>
                </div>
                <div v-if="isSuperAdmin">
                    <span>权限：</span>
                    <button style="font-size: 12px; margin:0 0 0 4px;padding: 0px; width: 60px; height: 20px;" @click="openRoleModal">修改权限</button>
                </div>
                <span>邮箱：{{ userFrom.email || '未绑定' }}</span>
                <span>手机：{{ userFrom.phoneNumber || '未绑定' }}</span>
                <span>注册时间：{{ userFrom.createTime }}</span>
                <div class="stats">
                    <span>提交 <strong>9</strong></span>
                    <span>解决 <strong>7</strong></span>
                </div>
                <button @click="openModal">修改基本信息</button>
            </div>
        </div>
        <div class="question-list">
            <div>
                <span>已解决问题</span>
            </div>
            <div>
                <span>已提交问题</span>
            </div>
        </div>

        <!-- 用户信息模态对话框 -->
        <div class="modal" v-if="showModal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-tabs">
                    <button :class="{ active: activeTab === 'email' }" @click="activeTab = 'email'">邮箱</button>
                    <button :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'">基本信息</button>
                </div>

                <div class="tab-content">
                    <!-- 邮箱表单 -->
                    <div v-if="activeTab === 'email'" class="form-group">
                        <div class="form-item">
                            <label>用户ID</label>
                            <input type="text" v-model="emailForm.userId" placeholder="请输入用户ID">
                        </div>
                        <div class="form-item">
                            <label>原邮箱</label>
                            <input type="email" v-model="emailForm.oldEmail" placeholder="请输入原邮箱地址">
                        </div>
                        <div class="form-item">
                            <label>新邮箱</label>
                            <input type="email" v-model="emailForm.newEmail" placeholder="请输入新邮箱地址">
                        </div>
                        <div class="form-item verification-code">
                            <div class="code-input">
                                <label>验证码</label>
                                <input type="text" v-model="emailForm.verificationCode" placeholder="请输入验证码">
                            </div>
                            <button class="get-code-btn" @click="getVerificationCode">获取验证码</button>
                        </div>
                        <span style="margin-top: 10px; color: red;">{{ prompt }}</span>
                        <button class="submit-btn" @click="submitEmailChange">提交修改</button>
                    </div>

                    <!-- 基本信息表单 -->
                    <div v-if="activeTab === 'basic'" class="form-group">
                        <div class="form-item">
                            <label>用户ID</label>
                            <input type="text" v-model="editForm.userId" placeholder="请输入用户ID">
                        </div>
                        <div class="form-item">
                            <label>头像路径</label>
                            <input type="text" v-model="editForm.avatarPath" placeholder="请输入头像路径">
                        </div>
                        <div class="form-item">
                            <label>昵称</label>
                            <input type="text" v-model="editForm.nickname" placeholder="请输入昵称">
                        </div>
                        <span style="margin-top: 10px; color: red;">{{ prompt }}</span>
                        <button class="submit-btn" @click="saveChanges">提交修改</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 角色管理模态对话框 -->
        <div class="modal" v-if="showRoleModal" @click="closeRoleModal">
            <div class="modal-content" @click.stop>
                <div class="modal-tabs">
                    <button :class="{ active: activeRoleTab === 'bind' }" @click="activeRoleTab = 'bind'">绑定角色</button>
                    <button :class="{ active: activeRoleTab === 'unbind' }" @click="activeRoleTab = 'unbind'">解绑角色</button>
                </div>

                <div class="tab-content">
                    <div class="form-group">
                        <div class="form-item">
                            <label>用户ID</label>
                            <input type="text" v-model="roleForm.userId" placeholder="请输入用户ID">
                        </div>
                        <div class="form-item">
                            <label>角色ID列表</label>
                            <input type="text" v-model="roleForm.roleIdList" placeholder="请输入角色ID，多个ID用逗号分隔">
                        </div>
                        <span style="margin-top: 10px; color: red;">{{ prompt }}</span>
                        <button class="submit-btn" @click="activeRoleTab === 'bind' ? handleRoleBind() : handleRoleUnbind()">
                            {{ activeRoleTab === 'bind' ? '绑定角色' : '解绑角色' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref ,computed } from 'vue';
import { useUserStore } from '../stores/user';
import { updateUserInfo, bindEmail, getUserRoleList, bindUserRole, unbindUserRole } from '../api/UserAPIs';
import { sendEmailVerificationCode } from '../api/CaptchaAPIs'
import { type EmailBindRequest, type UserUpdateRequest, type UserRoleBindRequest } from '../api/UserAPIs';


const userStore = useUserStore()
const isSuperAdmin = computed(() => userStore.userFrom.roleValueList.includes('super_admin'))
const userFrom = useUserStore().userFrom;
const store = useUserStore();
const isEditing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const prompt = ref('')
const showModal = ref(false);
const showRoleModal = ref(false);
const activeTab = ref('email');
const activeRoleTab = ref('bind');
const userRole = ref('');
const roleForm = ref<UserRoleBindRequest>({
    userId: 0,
    roleIdList: []
});
const emailForm = ref<EmailBindRequest>({
    userId: 0,
    oldEmail: '',
    newEmail: '',
    verificationCode: ''
});

const editForm = ref<UserUpdateRequest>({
    userId: 0,
    nickname: '',
    avatarPath: ''
});

const triggerFileInput = () => {
    fileInput.value?.click();
};

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    activeTab.value = 'email';
};

const openRoleModal = () => {
    showRoleModal.value = true;
};

const closeRoleModal = () => {
    showRoleModal.value = false;
    activeRoleTab.value = 'bind';
};

const handleRoleBind = async () => {
    if (!roleForm.value.userId) {
        prompt.value = '请输入用户ID';
        return;
    }
    if (roleForm.value.roleIdList.length === 0) {
        prompt.value = '请选择角色';
        return;
    }
    try {
        const response = await bindUserRole(roleForm.value);
        if (response.data.code === 20000) {
            prompt.value = '角色绑定成功';
            // 刷新角色列表
            getUserRoleList().then(response => {
                if (response.data.code === 20000) {
                    userRole.value = response.data.data[0].roleName;
                }
            });
        } else {
            prompt.value = response.data.message || '角色绑定失败';
        }
    } catch (error) {
        prompt.value = '角色绑定失败，请稍后重试';
        console.error('角色绑定出错:', error);
    }
};

const handleRoleUnbind = async () => {
    if (!roleForm.value.userId) {
        prompt.value = '请输入用户ID';
        return;
    }
    if (roleForm.value.roleIdList.length === 0) {
        prompt.value = '请选择角色';
        return;
    }
    try {
        const response = await unbindUserRole(roleForm.value);
        if (response.data.code === 20000) {
            prompt.value = '角色解绑成功';
            // 刷新角色列表
            getUserRoleList().then(response => {
                if (response.data.code === 20000) {
                    userRole.value = response.data.data[0].roleName;
                }
            });
        } else {
            prompt.value = response.data.message || '角色解绑失败';
        }
    } catch (error) {
        prompt.value = '角色解绑失败，请稍后重试';
        console.error('角色解绑出错:', error);
    }
};

const getVerificationCode = async () => {
    prompt.value = ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.value.newEmail)) {
        prompt.value = '请输入有效的邮箱地址';
        return;
    }
    // 发送验证码
    sendEmailVerificationCode(emailForm.value.newEmail)
        .then(response => {
            if (response.code === 20000) {
                prompt.value = '验证码已发送到您的邮箱';
            } else {
                prompt.value = response.message || '验证码发送失败';
            }
        })
        .catch(error => {
            prompt.value = '验证码发送失败，请稍后重试';
            console.error('发送验证码出错:', error);
        });
};

const submitEmailChange = async () => {
    prompt.value = '';
    if (!emailForm.value.userId) {
        prompt.value = '请输入用户ID'
        return
    }
    if (!emailForm.value.oldEmail) {
        prompt.value = '请输入原邮箱'
        return
    }
    if (!emailForm.value.newEmail) {
        prompt.value = '请输入新邮箱'
        return
    }
    if (!emailForm.value.verificationCode) {
        prompt.value = '请输入验证码'
        return
    }
    bindEmail(emailForm.value)
        .then(response => {
            if (response.data.code === 20000) {
                prompt.value = '邮箱修改成功';
            } else {
                prompt.value = response.data.message || '邮箱修改失败';
            }
        })
        .catch(error => {
            prompt.value = '邮箱修改失败，请稍后重试';
            console.error('修改邮箱出错:', error);
        });
}

const saveChanges = async () => {
    prompt.value = ''
    if (!editForm.value.userId) {
        prompt.value = '请输入用户ID'
        return
    }
    if (!editForm.value.avatarPath) {
        prompt.value = '请输入头像'
        return
    }
    if (!editForm.value.nickname) {
        prompt.value = '请输入nickname'
        return
    }
    updateUserInfo(editForm.value)
        .then(response => {
            if (response.data.code === 20000) {
                prompt.value = '基本信息修改成功';
            } else {
                prompt.value = response.data.message || '基本信息修改失败';
            }
        })
        .catch(error => {
            prompt.value = '基本信息修改失败，请稍后重试';
            console.error('修改基本信息出错:', error);
        });
}

onMounted(() => {
    getUserRoleList().then(response => {
        if (response.data.code === 20000) {
            userRole.value = response.data.data[0].roleName;
        } else {
            userRole.value = '获取角色失败';
        }
    })
})
</script>

<style lang="less" scoped>
.w {
    height: 500px;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    gap: 20px;

    .userinfo {
        width: 300px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;

        .toux {
            width: 120px;
            height: 120px;
            margin: 0 auto 15px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #1890ff;
            position: relative;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .edit-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s;

                span {
                    color: white;
                    font-size: 14px;
                }
            }

            &:hover .edit-overlay {
                opacity: 1;
            }
        }

        .user-edit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;

            .edit-form {
                width: 200px;
            }
        }

        .username {
            display: block;
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
        }

        .userdetail {
            display: flex;
            flex-direction: column;
            gap: 8px;

            span {
                color: #666;
                font-size: 14px;
            }

            .stats {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 5px;

                span {
                    font-size: 16px;
                    color: #333;

                    strong {
                        color: #1890ff;
                        font-size: 18px;
                        margin-left: 5px;
                    }
                }
            }

            button {
                margin-top: 15px;
                padding: 10px 24px;
                background-color: #1890ff;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background-color: #40a9ff;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.35);
                }

                &:active {
                    background-color: #096dd9;
                    transform: translateY(0);
                    box-shadow: none;
                }
            }
        }
    }

    .question-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        >div {
            flex: 1;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;

            span {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
        }
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 12px;
        width: 450px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

        .modal-tabs {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;

            button {
                padding: 10px 20px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 16px;
                color: #666;
                position: relative;
                transition: all 0.3s ease;

                &.active {
                    color: #1890ff;
                    font-weight: 500;

                    &:after {
                        content: '';
                        position: absolute;
                        bottom: -11px;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: #1890ff;
                    }
                }

                &:hover {
                    color: #40a9ff;
                }
            }
        }

        .tab-content {
            .form-group {
                margin-bottom: 24px;

                .form-item {
                    margin-bottom: 16px;

                    label {
                        display: block;
                        margin-bottom: 8px;
                        color: #333;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    input {
                        width: 100%;
                        padding: 10px 12px;
                        border: 1px solid #d9d9d9;
                        border-radius: 6px;
                        font-size: 14px;
                        transition: all 0.3s ease;

                        &:hover {
                            border-color: #40a9ff;
                        }

                        &:focus {
                            outline: none;
                            border-color: #1890ff;
                            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                        }
                    }
                }
            }

            .verification-code {
                display: flex;
                gap: 16px;
                align-items: flex-start;

                .code-input {
                    flex: 1;
                }

                .get-code-btn {
                    display: block;
                    padding: 10px 24px;
                    background-color: #1890ff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 26px;

                    &:hover {
                        background-color: #40a9ff;
                        transform: translateY(-1px);
                        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.35);
                    }

                    &:active {
                        background-color: #096dd9;
                        transform: translateY(0);
                        box-shadow: none;
                    }
                }
            }

            .submit-btn {
                width: 100%;
                padding: 12px;
                background-color: #1890ff;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                margin-top: 32px;
                transition: all 0.3s ease;

                &:hover {
                    background-color: #40a9ff;
                }

                &:active {
                    background-color: #096dd9;
                }
            }
        }
    }
}
</style>