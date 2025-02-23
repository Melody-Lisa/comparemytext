function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

function togglePlaceholder(preElement) {
    if (preElement.innerText.trim() === "") {
        preElement.setAttribute("data-placeholder", preElement.getAttribute("data-placeholder-original"));
    } else {
        preElement.setAttribute("data-placeholder", "");
    }
}

document.querySelectorAll(".text-box").forEach(pre => {
    pre.setAttribute("data-placeholder-original", pre.getAttribute("data-placeholder")); // Store original placeholder

    pre.addEventListener("input", () => togglePlaceholder(pre));
    pre.addEventListener("focus", () => togglePlaceholder(pre));
    pre.addEventListener("blur", () => togglePlaceholder(pre));
});

function diffWords(oldText, newText) {
    const oldWords = oldText.split(/\b/); // Split by word boundaries
    const newWords = newText.split(/\b/);
    let result1 = "", result2 = "";
    let i = 0, j = 0;

    while (i < oldWords.length || j < newWords.length) {
        if (oldWords[i] === newWords[j]) {
            result1 += escapeHtml(oldWords[i]);
            result2 += escapeHtml(newWords[j]);
            i++; j++;
        } else {
            if (i < oldWords.length) result1 += `<span class="removed">${escapeHtml(oldWords[i])}</span>`;
            if (j < newWords.length) result2 += `<span class="added">${escapeHtml(newWords[j])}</span>`;
            i++; j++;
        }
    }

    return [result1, result2];
}

function compareText() {
    const text1 = document.getElementById("text1").innerText;
    const text2 = document.getElementById("text2").innerText;

    const [highlighted1, highlighted2] = diffWords(text1, text2);

    document.getElementById("text1").innerHTML = highlighted1;
    document.getElementById("text2").innerHTML = highlighted2;
}
