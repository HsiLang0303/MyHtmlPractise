<template>
    <div class="herder w">
        <div class="herder-top">
            <h1 class="logo">
                <router-link to="/"></router-link>
            </h1>
            <div class="center">
                <div class="center-search">
                    <input type="text" name="" id="618.." placeholder="快来搜索好物吧！！">
                    <button class="search-button">搜索</button>
                </div>
                <div class="history">
                    <ul>
                        <a href="#" v-for="history in historyList" :key="history.id">{{ history.name }}</a>
                    </ul>
                </div>
            </div>
            <div class="cart">
                <button>
                    购物车
                </button>
            </div>
        </div>
        <div class="herder-bottom">
            <ul>
                <li v-for="category in categoryList" :key="category.id">
                    <router-link :to="category.path">{{ category.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const historyList = ref([
    { name: '四件套', id: '1' },
    { name: '洗衣液', id: '2' },
    { name: '床垫', id: '3' },
    { name: '床边桌', id: '4' },
    { name: '女鞋', id: '5' },
    { name: '国补', id: '6' },
    { name: '耳机', id: '7' },
    { name: '鞋子', id: '8' },
    { name: '洗衣液', id: '9' }
])

const categoryList = ref([
    { name: '首页', id: '1', path: '/' },
    { name: '居家生活', id: '2', path: '/homeLife' },
    { name: '宠物生活', id: '3', path: '/petLife' },
    { name: '服饰鞋包', id: '4', path: '/clothingBags' },
    { name: '酒水美食', id: '5', path: '/wineFood' },
    { name: '个护清洁', id: '6', path: '/personalCare' },
    { name: '母婴亲子', id: '7', path: '/babyParent' },
    { name: '运动旅行', id: '8', path: '/sportsTravel' },
    { name: '数码家电', id: '9', path: '/digitalAppliance' },
    { name: '全球严选', id: '10', path: '/globalSelect' },
    { name: '为你严选', id: '11', path: '/forYouSelect' },
    { name: '众筹', id: '12', path: '/crowdfunding' }
])
</script>

<style lang="less" scoped>
.herder {
    height: 160px;
    background-color: #fff;
    

    .herder-top {
        display: flex;

        .logo {
            width: 230px;
            height: 60px;
            margin: 30px 0 0 0;

            a {
                display: inline-block;
                height: 60px;
                width: 100%;
                background: url(../assets/images/logo.webp) no-repeat 0 -298px;
            }
        }

        .center {
            width: 560px;
            margin-left: 100px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .center-search {
                width: 560px;

                input {
                    width: 400px;
                    height: 38px;
                    border: 1px solid #e0e0e0;
                    border-radius: 20px 0 0 20px;
                    padding: 0 36px;
                    outline: none;
                    background: url(../assets/images/logo.webp) no-repeat 10px -622px;
                    font-size: 16px;

                    &:focus {
                        border: 1px solid #1b1a18;
                    }
                }

                button {
                    width: 80px;
                    height: 40px;
                    border: 1px solid #e0e0e0;
                    border-radius: 0 20px 20px 0;
                    background-color: #debd70;
                    color: #fff;
                    font-size: 14px;

                    &:hover {
                        background-color: #ecdfc0; // 悬停效果
                    }

                    &:active {
                        background-color: #ecdfc0; // 点击效果
                    }
                }
            }

            .history {
                ul {
                    display: flex;
                    justify-content: center;
                    margin-top: 5px;

                    a {
                        display: inline-block;
                        margin-right: 10px;
                        border-left: 1px solid #000000;
                        padding-left: 10px;

                        &:hover {
                            color: #b6ab96;
                        }

                        &:first-child {
                            border-left: none;
                        }
                    }
                }
            }
        }

        .cart {
            width: 200px;

            button {
                width: 160px;
                height: 40px;
                margin-left: 40px;
                margin-top: 26px;
                padding-left: 40px;
                font-size: 16px;
                background: url(../assets/images/logo.webp) no-repeat 20px -230px;
                border: 1px solid #e6d18c;
                border-radius: 50px;
                color : #e6d18c;
                &:hover {
                    background-color: #f4f1dd; // 添加悬停效果
                }
            }
        }
    }
    .herder-bottom{
        height: 40px;
        ul{
            display: flex;
            justify-content: center;
            li{
                margin-right: 20px;
                font-size: 16px;
                line-height: 40px;
                cursor: pointer;
                font-weight: 600;
                &:nth-child(10)::after {
                content: '|';
                margin-left: 20px;
                color: #666;
                font-weight: 100;
            }
            }
        }
    }
}
</style>