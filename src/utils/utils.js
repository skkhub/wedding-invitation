/**
 * 批量加载帧图片
 * @param {Function} context - require.context 创建的函数
 * @returns {Array<string>} 返回的所有图片
 */
export function loadFrames (context) {
    const frames = [];
    context.keys().forEach(k => {
        frames.push(context(k));
    })
    return frames;
};

export function loadScript(src, cb) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.getElementsByTagName("head")[0].appendChild(script);
    typeof cb === 'function' && (script.onload = cb);
}