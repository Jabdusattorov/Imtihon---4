if(!localStorage.getItem("token")){
    window.location.replace("../login.html")
}

const section = document.querySelector("section")
const articleDiv = document.querySelector(".article")

const navExitDiv = document.querySelector(".nav-exit-div")
const navExitIcon = document.querySelector("#exit")
const navBar = document.querySelector(".navigation-bars")
const navTitle = document.querySelector("#nav-title")
const navImg = document.querySelector("#nav-img")
const navBody = document.querySelector("#nav-body")
const navAuthor1 = document.querySelector("#nav-author-1")
const navAuthor2 = document.querySelector("#nav-author-2")
const navYear = document.querySelector("#nav-year")
const navPublished = document.querySelector("#nav-published")
const navCategories = document.querySelector("#nav-categories")
const navPages = document.querySelector("#nav-pages")
const navReadBtn = document.querySelector("#nav-read")

const inpSearch = document.querySelector("#search")

const show = document.querySelector("#show")
show.textContent = `Showing ${0} Max result(s)`

function sect(){
    section.innerHTML = 
    `<div class="col-8 bg-dark text-light rounded">
    <p class="display-6 p-3 px-5 fw-normal border-bottom">No books available</p>
    <p class="h4 fw-normal pb-3 px-3">Type any word in the search box before the books arrive. Then choose one of the books </br>For example: Learn HTML & CSS & JS</p>
    <label for="search" class="text-secondary text-decoration-underline d-block text-end border-top p-2 pe-4">Search input</label>
</div>`
}sect()

function card(image, title, author, year, id, link, more){
    const cards = document.createElement("div");
    cards.className = "cards";

    // -----cards-img-----
    const cardsImg = document.createElement("div")
    cardsImg.className = "cards-img";    
    const img  = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("alt", "qwertyu");
    cardsImg.appendChild(img);
    // -----cards-img-----

    // -----cards-info-----
    const cardsInfo = document.createElement("div")
    cardsInfo.className = "cards-info"
    const h5 = document.createElement("h5")
    h5.textContent = title
    const p1 = document.createElement("p")
    p1.textContent = author
    const p2 = document.createElement("p")
    p2.textContent = year

    cardsInfo.append(h5)
    cardsInfo.append(p1)
    cardsInfo.append(p2)

      //-----Buttons----- 
    const cardsInfoBtn = document.createElement("div")
    cardsInfoBtn.className = "cards-info-btn"
    
    const btn1 = document.createElement("button")
    btn1.classList.add("btn", "btn-warning", "fw-bold", "w-50", "btnBookmark")
    btn1.textContent = "Bookmark"
    btn1.setAttribute("data-id", id)
    const btn2 = document.createElement("button")
    btn2.classList.add("btn", "btn-light","text-primary", "fw-bold","w-50",)
    btn2.textContent = "More info"
    btn2.setAttribute("data-title", more)
    cardsInfoBtn.appendChild(btn1)
    cardsInfoBtn.appendChild(btn2)
    const btn3 = document.createElement("a")
    btn3.setAttribute("href", link)
    btn3.setAttribute("target", "_blank")
    btn3.classList.add("btn", "btn-secondary", "fw-bold", "w-100", "mt-1")
    btn3.textContent = "Read"
      //-----Buttons-----
      cardsInfo.appendChild(cardsInfoBtn)
      cardsInfo.appendChild(btn3)
    // -----cards-info-----

    cards.appendChild(cardsImg);
    cards.appendChild(cardsInfo);
    
    section.append(cards);
}

function qwerty(display){
    const qwerty = document.createElement("div")
    qwerty.classList.add("qwerty", "col-8", "text-white", "bg-dark", "p-3", "rounded")
    qwerty.classList.add(display)

    const p1 = document.createElement("p")
    p1.textContent = "Books"
    p1.classList.add("display-5")

    const p2 = document.createElement("p")
    p2.textContent = "To display books here, first enter a word in the search box"
    p2.classList.add("h4", "fw-light", "mt-3")

    qwerty.append(p1)
    qwerty.append(p2)
    section.append(qwerty)
}

function getBookMark(bookName, author){
    const bookMark = document.createElement("div")
    bookMark.classList.add("book-mark", "border-0", "m-auto", "my-2",)

    const bookMarkInfo = document.createElement("div")
    bookMarkInfo.classList.add("book-mark-info", "w-100")
    const h4 = document.createElement("h4")
    h4.textContent = bookName
    h4.classList.add("pt-3")
    const p = document.createElement("p")
    p.textContent = author
    p.classList.add("text-secondary")
    bookMarkInfo.append(h4, p)

    const bookMarkIcon = document.createElement("div")
    bookMarkIcon.classList.add("book-mark-icon", "w-50")
    const i1 = document.createElement("i")
    i1.classList.add("fa-solid", "fa-book-open", "text-secondary", "px-2", "fs-5")
    const i2 = document.createElement("i")
    i2.classList.add("fa-solid", "fa-x", "text-danger", "fs-5")
    bookMarkIcon.append(i1, i2)

    bookMark.append(bookMarkInfo, bookMarkIcon)
    articleDiv.append(bookMark)
}

const nav = document.querySelector("nav")
nav.addEventListener("click", (e)=>{
    let res = e.target
    if(res.id == "logout"){
        console.log(res);
        localStorage.clear()
        window.location.replace("../login.html")
    }
})

async function newests(){
    let res = await fetch("https://www.googleapis.com/books/v1/volumes?q=html&startIndex=40&maxResults=40&orderBy=newest")
    let datas = await res.json()
    let data = datas.items
    show.textContent = `Showing ${data.length} Result(s)`
    section.innerHTML = ""
    for(let i = 0; i < data.length; i++){
        card(
            data[i].volumeInfo.imageLinks.smallThumbnail,
            data[i].volumeInfo.title,
            data[i].volumeInfo.authors[0], 
            data[i].volumeInfo.publishedDate,
            data[i].id,
            data[i].volumeInfo.previewLink,
            data[i].id,
          )        
    }
}
const newest = document.querySelector("#newest")
newest.addEventListener("click", ()=>{
    newests()
    console.log("qwerty");
})

const pagination = document.querySelector("#pagination")
pagination.style.display = "none"

// async function search(){
//     let res = await fetch("https://www.googleapis.com/books/v1/volumes?q=html&startIndex=6&maxResults=6&orderBy=newest")
//     let datas = await res.json()
//     let data = datas.items

//         let array = []

//         section.addEventListener("click", (e)=>{
//             let res = e.target
//             if(res.dataset.id){
//                 for(let i = 0; i < data.length; i++){
//                     if(data[i].id == res.dataset.id){
//                         array.push(data[i])
//                         console.log(array);
//                         localStorage.setItem("array", JSON.stringify(array))
//             }
//         }
//     }
// })
//     let a = JSON.parse(localStorage.getItem("array"))
//     array.shift(a)
//     for(let i = 0; i < array.length; i++){
//         getBookMark(
//             array[i].volumeInfo.title,
//             array[i].volumeInfo.authors[0],    
//         )
//     }

// section.addEventListener("click", (e)=>{
//     let res = e.target
//     if(res.dataset.title){
//         for(let i = 0; i < data.length; i++){
//             if(data[i].id == res.dataset.title){
//                 console.log(data[i]);
//                 navTitle.innerHTML = data[i].volumeInfo.title
//                 navImg.setAttribute("src", data[i].volumeInfo.imageLinks.smallThumbnail)
//                 navBody.innerHTML = data[i].volumeInfo.description
//                 navAuthor1.innerHTML = data[i].volumeInfo.authors[0]
//                 if(!data[i].volumeInfo.authors[1]){
//                     navAuthor2.classList.add("d-none")
//                 }
//                 navAuthor2.innerHTML = data[i].volumeInfo.authors[1]
//                 navYear.innerHTML = data[i].volumeInfo.publishedDate;
//                 navCategories.innerHTML = data[i].volumeInfo.printType
//                 navPages.innerHTML = data[i].volumeInfo.pageCount
//                 navReadBtn.setAttribute("href", data[i].volumeInfo.previewLink)
//                 navReadBtn.setAttribute("target", "_blank")
//             }
//         }
//         navBar.style.transform = "scale(1)"
//     }
//     navExitDiv.addEventListener("click", ()=>{
//         navBar.style.transform = "scale(0)"
//     })
//     navExitIcon.addEventListener("click", ()=>{
//         navBar.style.transform = "scale(0)"
//     })
//     if(res.dataset.id){
//         for(let i = 0; i < array.length; i++){
//             if(data[i].id == res.dataset.id){
//                 res.setAttribute("disabled", '')
//                 console.log(data[i]);
//                 console.log(res.dataset.id);
//             }
//         }
//     }
// })

// setTimeout(() => {
//     section.addEventListener("click", ()=>{
//         articleDiv.innerHTML = ""
//         for(let i = 0; i < array.length; i++){
//             getBookMark(
//                 array[i].volumeInfo.title,
//                 array[i].volumeInfo.authors[0],    
//             )
//         } 
//     })
// }, 1000 * 2);
// }




inpSearch.addEventListener("input", (e)=>{
    let find = e.target
    if(find.value){
        pagination.style.display = "block"
        async function searchData(num){
            let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${find.value}&startIndex=40&maxResults=40&orderBy=newest`)
            let datas = await res.json()
            let data = datas.items
            show.textContent = `Showing ${data.length} Max result(s)`
            data.splice(6 * num);
            data.splice(6);

            section.innerHTML = ""
            for(let i = 0; i < data.length; i++){
            card(
                data[i].volumeInfo.imageLinks.smallThumbnail,
                data[i].volumeInfo.title,
                data[i].volumeInfo.authors, 
                data[i].volumeInfo.publishedDate,
                data[i].id,
                data[i].volumeInfo.previewLink,
                data[i].id,
            )        
            }

            section.addEventListener("click", (e)=>{
                let res = e.target
                if(res.dataset.title){
                    for(let i = 0; i < data.length; i++){
                        if(data[i].id == res.dataset.title){
                            console.log(data[i]);
                            navTitle.innerHTML = data[i].volumeInfo.title
                            navImg.setAttribute("src", data[i].volumeInfo.imageLinks.smallThumbnail)
                            navBody.innerHTML = data[i].volumeInfo.description
                            navAuthor1.innerHTML = data[i].volumeInfo.authors[0]
                            if(!data[i].volumeInfo.authors[1]){
                                navAuthor2.classList.add("d-none")
                            }
                            navAuthor2.innerHTML = data[i].volumeInfo.authors[1]
                            navYear.innerHTML = data[i].volumeInfo.publishedDate;
                            navCategories.innerHTML = data[i].volumeInfo.printType
                            navPages.innerHTML = data[i].volumeInfo.pageCount
                            navReadBtn.setAttribute("href", data[i].volumeInfo.previewLink)
                            navReadBtn.setAttribute("target", "_blank")
                        }
                    }
                    navBar.style.transform = "scale(1)"
                }
                navExitDiv.addEventListener("click", ()=>{
                    navBar.style.transform = "scale(0)"
                })
                navExitIcon.addEventListener("click", ()=>{
                    navBar.style.transform = "scale(0)"
                })
                if(res.dataset.id){
                    for(let i = 0; i < array.length; i++){
                        if(data[i].id == res.dataset.id){
                            res.setAttribute("disabled", '')
                            console.log(data[i]);
                            console.log(res.dataset.id);
                        }
                    }
                }
            })



            let array = []
            section.addEventListener("click", (e)=>{
            let res = e.target
                if(res.dataset.id){
                    for(let i = 0; i < data.length; i++){
                        if(data[i].id == res.dataset.id){
                            array.push(data[i])
                            console.log(array);
                            localStorage.setItem("array", JSON.stringify(array))
                        }
                    }
                }
            })
    let a = JSON.parse(localStorage.getItem("array"))
    array.shift(a)
    for(let i = 0; i < array.length; i++){
        getBookMark(
            array[i].volumeInfo.title,
            array[i].volumeInfo.authors[0],    
            )
        }

    setTimeout(() => {
        section.addEventListener("click", ()=>{
            articleDiv.innerHTML = ""
            for(let i = 0; i < array.length; i++){
                getBookMark(
                    array[i].volumeInfo.title,
                    array[i].volumeInfo.authors[0],    
                )
            } 
        })
    }, 1000 * 2);

}



        pagination.addEventListener("click", (e)=>{
            pagination.style.display = "block"
            let find = e.target
            let eValue = find.textContent
            if(find.classList == "page-link"){
                searchData(eValue)
            }
        })
        searchData(1)
    }

    if(find.value === ""){
        section.innerHTML = [];
        sect();
    }
    console.log(find.value);
})