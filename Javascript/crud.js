
if (document.getElementById("app")) {
    const { createApp } = Vue
 
    createApp({
        data() {
            return {
                programs: [],
                errored: false,
                loading: true,
                toEdit: [],
                systems: [],
                categories: [],
                sysurl: "http://dfragmnt.pythonanywhere.com/getos",
                caturl: "http://dfragmnt.pythonanywhere.com/getcat",
                url: "http://dfragmnt.pythonanywhere.com/showtable"
                }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.programs = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            update(id) {
                let n = document.getElementById("name").value
                let os = document.getElementById("os").value
                let c = document.getElementById("category").value
                let i = document.getElementById("picture").value.slice(12)
                let u = "Admin"
                // let d = new Date().toJSON().slice(0,10)
                let e = new Date().toJSON().slice(0,10)
                // let v = Math.floor(Math.random()*(300 - 0))
                // let dls = Math.floor(Math.random()*(300 - 0))
                // let s = Math.floor(Math.random()*(300 - 0))
                // let l = Math.floor(Math.random()*(300 - 0))
            
                let program = {
                    name : n,
                    system : os,
                    category : c,
                    img : i,
                    uploader : u,
                    // date : d,
                    edit : e
                    // views : v,
                    // downloads : dls,
                    // seeders : s,
                    // leechers : l
                }
                let url = "http://dfragmnt.pythonanywhere.com/editprogram/" + id
                var options = {
                    body: JSON.stringify(program),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                }
                fetch(url, options)
                    .then(function() {
                        location.reload();
                    })
            },
            newname(programid) {
                console.log("test flag - row id: "+ programid)
                const url = 'http://dfragmnt.pythonanywhere.com/delete/' + programid;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            },
            getProgram(id) {
                const url = 'http://dfragmnt.pythonanywhere.com/program/' + id;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.toEdit = data;
                        document.querySelector(".formEdit").classList.remove("hide");
                        window.location.hash = "#formedit"
                    })
            },
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
            },
            testfunction(id) {
                console.log("test function - id: " + id)
            }
        },
        created() {
            this.fetchData(this.url)
            this.fetchSystem(this.sysurl)
            this.fetchCategory(this.caturl)
        }
    }).mount('#app')
}

function upload() {
    let n = document.getElementById("name").value
    let os = document.getElementById("os").value
    let c = document.getElementById("category").value
    let i = document.getElementById("picture").value.slice(12)
    let u = "Admin"
    let d = new Date().toJSON().slice(0,10)
    let e = "-"
    let dls = Math.floor(Math.random()*(300 - 0))
    let v = Math.floor(Math.random()*(300 - 0)) + dls
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

    let create_url = "http://dfragmnt.pythonanywhere.com/upload"
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

function cancel(){
    document.querySelector(".formEdit").classList.add("hide");
}