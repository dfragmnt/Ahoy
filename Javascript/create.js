if (document.getElementById("app")) {
    const { createApp } = Vue
 
    createApp({
        data() {
            return {
                systems: [],
                categories: [],
                errored: false,
                sysurl: "http://localhost:5000/getos",
                caturl: "http://localhost:5000/getcat"
                }
        },
        methods: {
            fetchSystem(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.systems = data;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            fetchCategory(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.categories = data;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            }
        },
        created() {
            this.fetchSystem(this.sysurl)
            this.fetchCategory(this.caturl)
        }
    }).mount('#app')
}

function upload() {
    let n = document.getElementById("name").value
    let os = document.getElementById("os").value
    let c = document.getElementById("category").value
    let i = document.getElementById("picture").value
    let u = "Admin"
    let d = new Date().toJSON().slice(0,10)
    let e = "-"
    let v = Math.floor(Math.random()*(300 - 0))
    let dls = Math.floor(Math.random()*(300 - 0))
    let s = Math.floor(Math.random()*(300 - 0))
    let l = Math.floor(Math.random()*(300 - 0))

    let program = {
        name : n,
        system : os,
        category : c,
        img : i,
        uploader : u,
        date : d,
        edit : e,
        views : v,
        downloads : dls,
        seeders : s,
        leechers : l
    }

    let create_url = "http://localhost:5000/upload"
    var options = {
        body: JSON.stringify(program),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    }
    fetch(create_url, options)
    .then(function () {
        window.location.href = "catalog.html";
    })
}