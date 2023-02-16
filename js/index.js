document.addEventListener('DOMContentLoaded', () => {
    

    
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        let input = e.target.search.value
        let userList = document.getElementById("user-list")
        let reposList = document.getElementById("repos-list")
        //console.log(userList)
        //console.log(reposList)
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(res => res.json())
        .then(data => {
            for(element in data.items){
                let userName = document.createElement("li")
                userName.innerText = `${data.items[element].login}`
                console.log(userName.innerHTML)
                userName.addEventListener("click", (e) => {
                    username = e.target.innerText
                    userList.innerHTML = " "
                    fetch(`https://api.github.com/users/${username}/repos`)
                    .then(res => res.json())
                    .then(reposData => {
                        let blankLine = document.createElement("p")
                        blankLine.innertext =" "
                        
                        reposList.appendChild(userName)
                        reposList.appendChild(blankLine)
                        
                        for (element in reposData){
                            let repo = document.createElement("li")
                            repo.innerText =`Name: ${reposData[element].name} Description: ${reposData[element].description}`
                            reposList.appendChild(repo)
                        }
                        console.log(reposData)
                    })

                })
                userList.appendChild(userName)
            }
        })
    })
})