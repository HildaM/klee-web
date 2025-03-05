document.addEventListener('DOMContentLoaded', function() {
    // 优化操作系统检测逻辑
    const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.platform);
    const downloadButtonsContainer = document.querySelector('.download-buttons');
    
    if (downloadButtonsContainer) {
        const downloadButtons = Array.from(downloadButtonsContainer.querySelectorAll('.download-btn'));
        const macButtons = downloadButtons.filter(btn => btn.textContent.includes('Mac'));
        const windowsButtons = downloadButtons.filter(btn => btn.textContent.includes('Windows'));
        
        // 清空当前按钮
        downloadButtonsContainer.innerHTML = '';
        
        // 根据操作系统重新排序按钮
        const orderedButtons = isMac ? [...macButtons, ...windowsButtons] : [...windowsButtons, ...macButtons];
        
        // 按2x2网格布局重新添加按钮
        orderedButtons.forEach((btn, index) => {
            // 为当前系统的按钮添加高亮样式
            if ((isMac && btn.textContent.includes('Mac')) || (!isMac && btn.textContent.includes('Windows'))) {
                btn.classList.add('highlight-btn');
            }
            downloadButtonsContainer.appendChild(btn);
        });
    }
    
    // 使用Canvas实现波浪背景效果，替代CSS动画
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
        // 创建canvas元素
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        
        // 将canvas插入到hero-wrapper的最前面
        heroWrapper.insertBefore(canvas, heroWrapper.firstChild);
        
        // 设置canvas尺寸
        const resizeCanvas = () => {
            canvas.width = heroWrapper.offsetWidth;
            canvas.height = heroWrapper.offsetHeight;
        };
        
        // 初始化设置尺寸
        resizeCanvas();
        
        // 窗口大小变化时重新设置尺寸
        window.addEventListener('resize', resizeCanvas);
        
        // 获取绘图上下文
        const ctx = canvas.getContext('2d');
        
        // 波浪参数
        const waves = [
            { color: 'rgba(74, 122, 157, 0.2)', amplitude: 50, frequency: 0.016, speed: 0.02, phase: 0 },
            { color: 'rgba(100, 149, 190, 0.15)', amplitude: 30, frequency: 0.020, speed: 0.01, phase: 0 },
            { color: 'rgba(53, 95, 131, 0.1)', amplitude: 40, frequency: 0.012, speed: 0.016, phase: 0 }
        ];
        
        // 动画函数
        function animate() {
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制每个波浪
            waves.forEach(wave => {
                // 更新相位
                wave.phase += wave.speed;
                
                // 开始绘制路径
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                
                // 绘制波浪路径
                for (let x = 0; x < canvas.width; x++) {
                    const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + canvas.height / 2;
                    ctx.lineTo(x, y);
                }
                
                // 完成路径（填充到底部）
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                
                // 设置填充样式并填充
                ctx.fillStyle = wave.color;
                ctx.fill();
            });
            
            // 请求下一帧动画
            requestAnimationFrame(animate);
        }
        
        // 启动动画
        animate();
    }
    
    // FAQ交互功能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // 关闭其他打开的FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // 切换当前FAQ项的状态
            item.classList.toggle('active');
        });
    });
});