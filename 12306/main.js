function showContent(tabNumber) {
    // 处理内容显示
    document.querySelectorAll('.contant').forEach((content, index) => {
        content.style.display = index + 1 === tabNumber ? 'block' : 'none';
    });

    // 处理按钮样式
    document.querySelectorAll('.picture button').forEach((button) => {
        // 先重置所有按钮样式
        button.style.backgroundColor = '#3b99fc';
        button.style.color = '#fff';  // 假设默认字体颜色是白色
    });

    // 设置当前点击按钮的样式
    const currentButton = document.querySelector(`button[onclick="showContent(${tabNumber})"]`);
    currentButton.style.backgroundColor = '#fff';
    currentButton.style.color = '#000';
}

function showContent_nav8(number) {
    document.querySelectorAll('.nav8_caontant').forEach((content,index) =>{
        content.style.display = index + 1 ===number ? 'block' : 'none' ;
    })

    document.querySelectorAll('.nav8_top button').forEach((button) => {
        button.style.backgroundColor = '#b5b1b1';
        button.style.color = '#000';
    })

    const currentButton = document.querySelector(`button[onclick="showContent_nav8(${number})"]`);
    currentButton.style.backgroundColor = '#e1dfdf';
    
}