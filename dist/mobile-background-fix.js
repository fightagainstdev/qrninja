// 移动端背景显示修复脚本
// 用于解决手机端canvas背景不能正确显示的问题

(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 检测移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            console.log('移动设备检测到，应用背景修复...');
            initializeMobileBackgroundFix();
        }
    });
    
    function initializeMobileBackgroundFix() {
        // 1. 确保主容器有正确的背景色
        const mainContainer = document.getElementById('main');
        if (mainContainer) {
            mainContainer.style.backgroundColor = '#030f26';
            mainContainer.style.background = '#030f26';
        }
        
        // 2. 设置body背景（备用）
        document.body.style.backgroundColor = '#030f26';
        document.body.style.background = '#030f26';
        
        // 3. 监听窗口大小变化，确保背景正确显示
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                fixCanvasBackgrounds();
            }, 100);
        });
        
        // 4. 监听屏幕方向变化
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                fixCanvasBackgrounds();
                forceRedraw();
            }, 200);
        });
        
        // 5. 定期检查并修复背景
        setInterval(() => {
            fixCanvasBackgrounds();
        }, 1000);
        
        // 立即执行一次修复
        setTimeout(() => {
            fixCanvasBackgrounds();
            forceRedraw();
        }, 500);
    }
    
    function fixCanvasBackgrounds() {
        const canvases = document.querySelectorAll('canvas');
        const mainContainer = document.getElementById('main');
        
        // 确保主容器背景
        if (mainContainer) {
            mainContainer.style.backgroundColor = '#030f26';
            mainContainer.style.background = '#030f26';
        }
        
        // 修复每个canvas的背景和样式
        canvases.forEach(canvas => {
            // 设置canvas样式
            canvas.style.backgroundColor = 'transparent';
            canvas.style.background = 'transparent';
            
            // 确保canvas正确缩放
            if (canvas.width && canvas.height) {
                // 获取canvas的父容器
                const parent = canvas.parentElement;
                if (parent && parent.id === 'main') {
                    // 确保canvas在主容器中正确显示
                    parent.style.backgroundColor = '#030f26';
                    parent.style.background = '#030f26';
                }
            }
        });
        
        // 特别处理游戏背景
        fixGameBackground();
    }
    
    function fixGameBackground() {
        // 查找并修复游戏背景canvas
        const canvases = document.querySelectorAll('canvas');
        
        canvases.forEach((canvas, index) => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // 检查是否是背景canvas（通过检查是否有绘制内容）
                const imageData = ctx.getImageData(0, 0, 1, 1);
                const isEmpty = imageData.data[3] === 0; // 检查alpha通道
                
                if (isEmpty || index === 0) {
                    // 如果是空canvas或第一个canvas，强制设置为深蓝色背景
                    ctx.fillStyle = '#030f26';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }
        });
    }
    
    function forceRedraw() {
        // 强制重绘所有canvas
        const canvases = document.querySelectorAll('canvas');
        
        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // 触发重绘事件
                const event = new Event('redraw');
                canvas.dispatchEvent(event);
            }
        });
        
        // 如果游戏对象存在，尝试触发其重绘
        if (window.GameVars && window.GameVars.game) {
            try {
                window.GameVars.game.draw();
            } catch (e) {
                console.log('游戏重绘失败，但不影响背景修复:', e);
            }
        }
    }
    
    // 添加CSS样式来确保背景正确显示
    function addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 移动端背景修复样式 */
            @media screen and (max-width: 768px) {
                body, html {
                    background-color: #030f26 !important;
                    background: #030f26 !important;
                }
                
                #main {
                    background-color: #030f26 !important;
                    background: #030f26 !important;
                }
                
                canvas {
                    image-rendering: -moz-crisp-edges;
                    image-rendering: -webkit-crisp-edges;
                    image-rendering: pixelated;
                    image-rendering: crisp-edges;
                }
            }
            
            /* 横屏优化 */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                body, html, #main {
                    background-color: #030f26 !important;
                    background: #030f26 !important;
                }
            }
            
            /* 确保在所有移动浏览器中背景正确 */
            * {
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
                -webkit-text-size-adjust: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 初始化样式
    addMobileStyles();
    
    console.log('移动端背景修复脚本已加载');
})();