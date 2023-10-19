export const escapeHtml = (text:string):string => {
    // HTMLエスケープを行うユーティリティ関数
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
