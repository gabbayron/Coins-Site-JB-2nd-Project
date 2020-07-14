

export function collapse() {
    var coll = document.querySelectorAll(".collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.visibility === "visible") {
                content.style.visibility = "hidden";
                content.style.opacity = "0";
                content.style.height = '0'
                
            } else {
                content.style.visibility = "visible";
                content.style.opacity = "1";
                content.style.height = '79px'
            }
        });
    }
}

