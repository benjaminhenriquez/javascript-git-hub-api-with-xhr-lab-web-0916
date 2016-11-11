$(function(){
  $('form').on('submit',function(event){
    event.preventDefault();
    getRepositories();
  })
})

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  // const repoList = `<ul>${}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  repos.forEach((r) => {
  $('.repositories').append(`<p>${r.name}<br/><a href="#" data-repo=${r.name} data-repo_id=${r.id} onclick="getCommits(this)">Get Commits</a><br/><a href="#" data-repo=${r.name} data-repo_id=${r.id} onclick="getBranches(this)">Get Branches</a><br/></p>`)
})
}

function getRepositories() {
  let name = $('#username').val();
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  // const repoList = `<ul>${}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  commits.forEach((commit) => {
  $('.details').append(`<p>Username: ${commit.author.login}<br/>Full Name:${commit.commit.author.name}<br/>Message: ${commit.commit.message}<br/></p>`)
})
}

function getCommits(el) {
  let name = $('#username').val();
  let repo = el.dataset.repo;
  let id = el.dataset.repo_id;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/commits`)
  req.send()
}

function displayBranches(event, data) {
  let name = $('#username').val();
  var branches = JSON.parse(this.responseText)
  console.log(branches)
  // const repoList = `<ul>${}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  branches.forEach((branch) => {
  $('.details').append(`<p>Branch Name: ${branch.name}<br/>Branch Url:${branch.commit.url}<br/><a href=https://github.com/${name}>User</a><br/><a href=https://github.com/repos/${name}/${data}>Repo</a><br/></p>`)
})
}

function getBranches(el) {
  let name = $('#username').val();
  let repo = el.dataset.repo;
  let id = el.dataset.repo_id;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/branches`)
  req.send(repo)
}
