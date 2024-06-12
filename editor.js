document.querySelectorAll('.editor .visualisation, .editor .code').forEach(function (item){
    item.addEventListener("keyup",update);
});

document.querySelectorAll('.editor .toolbar button').forEach(function (item){
    item.addEventListener("click", controler);
});

function controler(e) {

    switch(this.innerHTML) {
        case "code":
        this.closest(".editor").classList.add("code");
        break;
        case "visu":
        this.closest(".editor").classList.remove("code");
        break;
        case "bold":
        case "italic":
        case "underline":
        tag(this.innerHTML);
        break;
        default:
    }
}



function update() {
    if (this.classList.contains('visualisation')) {
        this.closest('.editor').querySelector('.code').innerHTML = this.innerHTML;
    } else {
        this.closest('.editor').querySelector('.visualisation').innerHTML = this.innerHTML;
    }
}


function tag(tagName) {
    if (window.getSelection) {
        sel = window.getSelection();
        range = sel.getRangeAt(0);

        node = document.createElement('span');
        node.className = tagName;

        nodeText = document.createTextNode(range);
        range.deleteContents();
        node.appendChild(nodeText);
        range.insertNode(node);

        var event = new Event('keyup');
        event.keyCode= 13;
        sel.focusNode.parentNode.dispatchEvent(event);
    }
}

function se(e, t, o) {
    if (t.keyCode == Dc.arrowright) {
        const e = t.domTarget.ownerDocument.defaultView.getSelection(),
        n = 1 == e.rangeCount && e.getRangeAt(0).collapsed;
        if (n || t.shiftKey) {
            const t = e.focusNode,
            i = e.focusOffset,
            r = o.domPositionToView(t, i);
            if (null === r) return;
            let a = !1;
            const s = r.getLastMatchingPosition((e) => (e.item.is('uiElement') && (a = !0), !!(e.item.is('uiElement') || e.item.is('attributeElement'))));
            if (a) {
                const t = o.viewPositionToDom(s);
                n ? e.collapse(t.parent, t.offset) : e.extend(t.parent, t.offset)
            }
        }
    }
}