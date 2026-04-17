//database
const databaseAddress = "./portfolio_raw.json"
// html読み込み
function main() {
    let loadingContent = document.getElementById("contentfield");
    // データベース読み込み
    fetch(databaseAddress, {
        method: "GET",
    }).then(response => response.json())
        .then(jsonData => {
            // データベースのコンテンツ数分繰り返す
            for (let i = 0; i < jsonData.length; i++) {
                const element = jsonData[i];
                // コンテンツを作成
                let mainContent = `<p class="name">${element.name}</p><u class="date">${element.date}</u>`
                if (element.category == "MOVIE") {
                    if (element.url.match(/youtu.be/)) {
                        mainContent = mainContent + `<iframe width="560" height="315" src="https://www.youtube.com/embed/${element.url.split("youtu.be/")[1]}"title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                    }
                }
                let credits = ""
                for (const key in element.credit) {
                    // if (!Object.hasOwn(element[key], key)) continue;
                    credits = credits + `${key} ${element[key]}<br>`
                }
                console.log(`<div class="content"><br>${mainContent}<p class="description">${credits}</p><div class="commentfield"><p class="comment">Comment</p>${element.comment}</div><br>`)
                loadingContent.innerHTML = loadingContent.innerHTML + `<div class="content"><br>${mainContent}<p class="description">${credits}</p><div class="commentfield"><p class="comment">Comment</p>${element.comment}</div><br>`
            }
        })
}

function loaded() {
    setTimeout(() => {
        main()
    }, 2000)
}
window.addEventListener('load', function(){
    loaded();
})