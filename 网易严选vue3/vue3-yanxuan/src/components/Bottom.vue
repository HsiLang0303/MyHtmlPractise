<template>
    <div class="bottom">
        <div class="bottom-shang">
            <div class="serve">
                <span class="title">客户服务</span>
                <div class="choice">
                    <a href="#">
                        <i class="iconfont icon-kefu"></i>
                        在线客服
                    </a>
                    <a href="#">
                        <i class="iconfont icon-xiaoxi"></i>
                        用户反馈
                    </a>
                </div>
            </div>
            <div class="what">
                <span class="title">何为网易严选</span>
                <i>网易严选是深受新中产喜爱的生活方式品牌, 为消费者提供一站式、全品类、全方位的美好生活解决方案。我们通过简约、实用、舒适的美学设计, 不断带来高品质灵感好物,
                    陪伴3000万新中产用户「活出自己喜欢的样子」, 共同倡导多元化的生活价值主张——每个人都可以把生活的选择权交还给自己。</i>
                <span>
                    <span class="title">关注我们</span>
                    <i class="iconfont icon-xinlang"></i>
                    <i class="iconfont icon-weixin"></i>
                </span>
            </div>
            <div class="app">
                <span class="title">扫码下载APP</span>
                <div class="erma">
                    <img src="../assets/images/saoma.png" alt="">
                    <i>下载领大额新人红包</i>
                </div>
            </div>
        </div>

        <div class="bottom-xia">
            <div class="w">
                <div class="infomation-top">
                    <h2>网易自营电商</h2>
                    <h2>30天无忧退换货</h2>
                    <h2>满99元免邮费</h2>
                    <h2>品质保证</h2>
                </div>
                <div class="infomation-bottom">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
 
</script>

<style lang="less" scoped>
.bottom {
    height: 620px;

    .bottom-shang {
        height: 300px;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        padding-top: 60px;

        .serve {
            width: 370px;
            text-align: center;

            .choice {
                a {
                    border: 1px solid #000000;
                    display: inline-block;
                    margin: 50px 20px;
                    width: 90px;
                    height: 100px;

                    i {
                        display: block;
                        font-size: 50px;
                        margin: 10px auto;
                    }
                }
            }
        }

        .what {
            width: 370px;
            text-align: center;

            >i {
                display: block;
                font-size: 14px;
                line-height: 22px;
                margin: 20px 0;
                text-align: left; // 文本左对齐
                font-style: normal;
            }

            span:last-child {
                display: flex;           // 改为flex布局
                align-items: center;     // 垂直居中
                margin-top: 20px;
                text-align: left;
                
                .title {
                    font-size: 18px;
                    margin-right: 10px;
                }
                
                i {
                    font-size: 30px;
                    margin-right: 10px; 
                    cursor: pointer;
                    &:hover {
                        color: #0f0d02;
                    }
                }
            }
        }

        .app {
            width: 370px;
            text-align: center;
            .erma {
                display: flex;
                flex-direction: column;  // 改为纵向排列
                align-items: center;
                margin-top: 20px;
                
                img {
                    width: 100px;
                    height: 100px;
                    margin-top: 20px;
                    margin-bottom: 10px;  // 改为下边距
                }
                
                i {
                    margin-top:20px;
                    font-size: 12px;
                    color: #666;
                }
            }
        }
    }

    .bottom-xia {
        height: 300px;
        background-color: #414141;
        .w{
            width: 1100px;
            height: 300px;
            .infomation-top{
                width: 1100px;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid #666;
                h2{
                    width: 250px;
                    text-align: center;
                }
            }
            .infomation-bottom{
                width: 1100px;
                height: 200px;
            }
        }
    }
}

.title {
    font-size: 18px;
    display: block;

}
</style>