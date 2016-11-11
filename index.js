// $(function(){
//   $('form').on('submit',function(event){
//     event.preventDefault();
//     getRepositories();
//   })
// })



function getRepositories() {
  let name = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
//   const repoList = repos.map(r => "<p>"+ r.name + "<br/><a href='#' data-repo=" +r.name+" data-repo_id=" + r.id + ' onclick="getCommits(this)">Get Commits</a><br/><a href="#" data-repo='+r.name+ " data-repo_id=" +r.id+ ' onclick="getBranches(this)">Get Branches</a><br/><p/>').join('');
  document.getElementById("repositories").innerHTML = repoList;
// //   repos.forEach((r) => {
// //   $('.repositories').append(`<p>${r.name}<br/><a href="#" data-repo=${r.name} data-repo_id=${r.id} onclick="getCommits(this)">Get Commits</a><br/><a href="#" data-repo=${r.name} data-repo_id=${r.id} onclick="getBranches(this)">Get Branches</a><br/></p>`)
// // })

}

function getCommits(el) {
  let name = document.getElementById("username").value;
  let repo = el.dataset.repository;
  // let id = el.dataset.repo_id;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/commits`)
  req.send()
}

function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  // const repoList = `<ul>${}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
//   commits.forEach((commit) => {
//   $('.details').append(`<p>Username: ${commit.author.login}<br/>Full Name:${commit.commit.author.name}<br/>Message: ${commit.commit.message}<br/></p>`)
// })
}

function getBranches(el) {
  let name = document.getElementById("username").value;
  let repo = el.dataset.repository;
  // let id = el.dataset.repo_id;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/branches`)
  req.send(repo)
}


function displayBranches(event, data) {
  let name = document.getElementById("username").value;
  var branches = JSON.parse(this.responseText)
  console.log(branches)
  // const repoList = `<ul>${}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
//   branches.forEach((branch) => {
//   $('.details').append(`<p>Branch Name: ${branch.name}<br/>Branch Url:${branch.commit.url}<br/><a href=https://github.com/${name}>User</a><br/><a href=https://github.com/repos/${name}/${data}>Repo</a><br/></p>`)
// })

const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
