// 监听右键菜单的创建
browser.contextMenus.create({
    id: "lookup-word",
    title: "Lookup '%s'",
    contexts: ["selection"]
  });
  
  // 监听右键菜单的点击事件
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "lookup-word") {
      const selectedText = info.selectionText;
      // 将选中的文本发送到内容脚本
      browser.tabs.sendMessage(tab.id, { action: "showPopup", word: selectedText });
    }
  });