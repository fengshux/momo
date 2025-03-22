// 监听来自后台脚本的消息
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showPopup") {
        const word = message.word;
        // 在这里可以调用API获取单词的相关信息
        const wordInfo = `Information about: ${word}`; // 这里可以替换为实际的API调用
    

        // 移除已有的弹窗（避免重复）
        const existingPopup = document.getElementById("word-info-popup");
        if (existingPopup) existingPopup.remove();
        
        // 创建弹窗元素
        const popup = document.createElement("div");
        popup.id = "word-info-popup";
        popup.innerHTML = `
        <div class="popup-content">
            <h3>${word}</h3>
            <p>Loading information...</p>
        </div>
        `;

        // 添加样式
        const style = document.createElement("style");
        style.textContent = `
        #word-info-popup {
            position: absolute;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 12px;
            z-index: 999999;
            max-width: 300px;
            font-family: Arial, sans-serif;
        }
        .popup-content h3 {
            margin: 0 0 8px 0;
            color: #333;
        }
        .popup-content p {
            margin: 0;
            color: #666;
        }
        `;
        document.head.appendChild(style);
        
        // 获取选中文本的位置
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // 计算弹窗位置（在选中文本下方显示）
            popup.style.left = `${rect.left + window.pageXOffset}px`;
            popup.style.top = `${rect.bottom + window.pageYOffset + 5}px`;
        }

        // 添加到页面
        document.body.appendChild(popup);

        // 点击页面其他区域关闭弹窗
        document.addEventListener("click", function closePopup(e) {
        if (!popup.contains(e.target)) {
            popup.remove();
            document.removeEventListener("click", closePopup);
        }
        });

        // 调用API获取单词信息（示例）
        // 这里可以替换为实际的API请求
        setTimeout(() => {
        popup.querySelector(".popup-content p").textContent = 
            `Example definition for "${word}": A sample description.`;
        }, 500);

    }
});