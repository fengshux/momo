document.addEventListener('DOMContentLoaded', initOptions);

function initOptions() {
  // 加载已保存的设置
  chrome.storage.local.get(['apiToken', 'tagName'], (data) => {
    document.getElementById('apiToken').value = data.apiToken || '';
    document.getElementById('tagName').value = data.tagName || '';
  });

  // 绑定保存按钮
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
}

function saveSettings() {
  const apiToken = document.getElementById('apiToken').value.trim();
  const tagName = document.getElementById('tagName').value.trim();
  
  // 清除旧提示
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  document.getElementById('message').textContent = '';

  // 验证输入
  let isValid = true;

  if (!/^[a-zA-Z0-9]{64}$/.test(apiToken)) {
    document.getElementById('tokenError').textContent = 
      'Token必须是64位字母数字组合';
    isValid = false;
  }

  if (tagName.length > 16 || !/^[\w\u4e00-\u9fa5]+$/.test(tagName)) {
    document.getElementById('tagError').textContent = 
      '标签名称最多16位（支持中英文、数字、下划线）';
    isValid = false;
  }

  if (!isValid) return;

  // 保存到存储
  chrome.storage.local.set({
    apiToken,
    tagName
  }, () => {
    document.getElementById('message').textContent = '设置保存成功！';
    setTimeout(() => {
      document.getElementById('message').textContent = '';
    }, 2000);
  });
}